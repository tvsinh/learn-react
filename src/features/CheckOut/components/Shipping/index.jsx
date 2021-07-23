import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/form-controls/InputField';
import { setBackTo, setShipping, setStep } from 'features/CheckOut/orderSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import OrderCard from '../Card/OrderCard';
import userApi from 'api/userApi';
import { setUser } from 'features/Auth/userSlice';
import StorageKeys from 'constants/storage-keys';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
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
      .required('Please enter full name.')
      .test('should has at least two words', 'Please enter at least two words.', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    address: yup
      .string()
      .required('Please enter title.')
      .min(4, 'Address is too short, at least 4 characters.'),
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
        // const userNew = await userApi.getInfor();
        // localStorage.setItem(StorageKeys.USER, JSON.stringify(userNew));
        // dispatch(setUser());
      }
    }
    if (backTo || cartItems.length < 1) {
      dispatch(setShipping(values));
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
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: '225px' }}
                    >
                      Lưu thông tin
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: '225px' }}
                    >
                      Tiếp tục
                    </Button>
                  )}
                </form>
              </Paper>
            </Box>
            <Box className={classes.cartInfo}>
              <Paper>
                <OrderCard />
              </Paper>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Shipping;
