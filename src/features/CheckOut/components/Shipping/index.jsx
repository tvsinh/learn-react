import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputField from 'components/form-controls/InputField';
import { setShipping, setStep } from 'features/CheckOut/orderSlice';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import OrderCard from '../Card/OrderCard';
import userApi from 'api/userApi';
import { setUser } from 'features/Auth/userSlice';
import StorageKeys from 'constants/storage-keys';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cartInfo: {
    marginLeft: '10px',
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
}));

function Shipping() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user.current);
  const [addressDefault, setAddressDefault] = useState(false);
  const { address, fullName, email, id } = user;

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter title.')
      .min(5, 'Title is too short, at least 5 characters.'),
    email: yup
      .string()
      .required('Please enter title.')
      .min(5, 'Title is too short, at least 5 characters.'),
    address: yup
      .string()
      .required('Please enter title.')
      .min(5, 'Title is too short, at least 5 characters.'),
  });
  const form = useForm({
    defaultValues: {
      fullName: fullName,
      email: email,
      address: address,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
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
  };

  const handleChange = (event) => {
    setAddressDefault(!addressDefault);
  };
  return (
    <Box>
      <Container className={classes.root}>
        <Box className={classes.form}>
          <Paper className={classes.formControl}>
            <Typography style={{ textAlign: 'center', fontWeight: '500' }}>
              Thông tin nhận hàng
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.formItem}>
              <InputField name="fullName" label="Tên người nhận" form={form} fullName={fullName} />
              <InputField name="email" label="Email" form={form} email={email} disabled={true} />
              <InputField name="address" label="Địa chỉ" form={form} address={address} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={addressDefault}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Đặt làm thông tin mặc định"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ width: '225px' }}
              >
                Tiếp theo
              </Button>
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
  );
}

export default Shipping;
