import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import userApi from 'api/userApi';
import InputField from 'components/form-controls/InputField';
import StorageKeys from 'constants/storage-keys';
import { setUser } from 'features/Auth/userSlice';
import { setBackTo, setShipping, setStep } from 'features/CheckOut/orderSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import OrderCard from '../Card/OrderCard';
import OrderCardMobile from '../Card/OrderCard/mobile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '0 5vw 0',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  cartInfo: {
    marginLeft: '10px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      marginTop: '10px',
    },
  },

  form: {
    flex: '1 1 0',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px 10px 10px',
    height: 'auto',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBox: {
    width: '18vw',
    [theme.breakpoints.down('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
  buttonBox: {
    width: '225px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(0, 1, 0),
    },
  },
  button: {
    width: '225px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  sectionDesktop: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
    },
  },
}));

function Shipping() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userMe = await userApi.getInfor();
        localStorage.setItem(StorageKeys.USER, JSON.stringify(userMe));
        dispatch(setUser());
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { backTo, edit } = useSelector((state) => state.order);
  const [addressDefault, setAddressDefault] = useState(false);

  const user = useSelector((state) => state.user.current);
  const userShipping = JSON.parse(localStorage.getItem(StorageKeys.SHIPPING)) || {};
  const { fullName: fullNameUser, email: emailUser, address: addressUser, id } = user;
  const { fullName, address } = userShipping;

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập tên đầy đủ của bạn.')
      .test('should has at least two words', 'Vui lòng nhập ít nhất 2 từ.', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Vui lòng nhập email của bạn.')
      .email('Vui lòng nhập một địa chỉ email hợp lệ.'),
    address: yup
      .string()
      .required('Vui lòng nhập địa chỉ giao hàng.')
      .min(4, 'Địa chỉ phải trên 4 kí tự.'),
  });
  const form = useForm({
    defaultValues: {
      fullName: backTo ? fullNameUser : edit ? (fullName ? fullName : fullNameUser) : fullNameUser,
      email: emailUser,
      address: backTo ? addressUser : edit ? (address ? address : addressUser) : addressUser,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (backTo === false && cartItems.length > 0) {
      dispatch(setStep(1));
      dispatch(setShipping(values));
      const data = {
        id: id,
        fullName: values.fullName,
        address: values.address,
      };
      if (addressDefault) {
        await userApi.updateUser(data);
        const userNew = await userApi.getInfor();
        localStorage.setItem(StorageKeys.USER, JSON.stringify(userNew));
        dispatch(setUser());
      }
    }
    if (backTo || cartItems.length < 1) {
      const data = {
        id: id,
        // email: values.email,
        fullName: values.fullName,
        address: values.address,
      };
      await userApi.updateUser(data);
      const userNew = await userApi.getInfor();
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userNew));
      dispatch(setUser());
      dispatch(setBackTo(false));
      history.goBack();
    }
  };

  const handleChange = (event) => {
    setAddressDefault(!addressDefault);
  };
  return (
    <>
      {loading ? (
        <LinearProgress style={{ top: '-6px' }} />
      ) : (
        <Box>
          <Container className={classes.root}>
            <Box className={classes.form}>
              <Paper className={classes.formControl}>
                <Typography style={{ textAlign: 'center', fontWeight: '500' }}>
                  Thông tin nhận hàng
                </Typography>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.formItem}>
                  <InputField
                    name="fullName"
                    label="Tên người nhận"
                    form={form}
                    // fullName={
                    //   backTo
                    //     ? fullNameUser
                    //     : edit
                    //     ? fullName
                    //       ? fullName
                    //       : fullNameUser
                    //     : fullNameUser
                    // }
                  />
                  <InputField
                    name="email"
                    label="Email"
                    form={form}
                    // email={emailUser}
                    disabled={true}
                  />
                  <InputField
                    name="address"
                    label="Địa chỉ"
                    form={form}
                    // address={
                    //   backTo ? addressUser : edit ? (address ? address : addressUser) : addressUser
                    // }
                  />
                  <FormControlLabel
                    className={classes.checkBox}
                    control={
                      <Checkbox
                        checked={backTo || cartItems.length < 1 ? true : addressDefault}
                        onChange={handleChange}
                        name="addressDefault"
                        color="primary"
                        disabled={backTo || cartItems.length < 1}
                      />
                    }
                    label="Đặt làm thông tin mặc định"
                  />
                  {(backTo && !edit) || cartItems.length < 1 ? (
                    <Box className={classes.buttonBox}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                      >
                        Lưu thông tin
                      </Button>
                    </Box>
                  ) : (
                    <Box className={classes.buttonBox}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                      >
                        Tiếp tục
                      </Button>
                    </Box>
                  )}
                </form>
              </Paper>
            </Box>
            <Box className={`${classes.cartInfo} + ${classes.sectionDesktop} `}>
              <Paper>
                <OrderCard />
              </Paper>
            </Box>
            <Box className={`${classes.cartInfo} + ${classes.sectionMobile} `}>
              <Paper>
                <OrderCardMobile />
              </Paper>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Shipping;
