import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import StorageKeys from 'constants/storage-keys';
import { setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '350px',
  },
  title: {
    marginLeft: '10px',
    fontWeight: '500',
    paddingTop: '5px',
  },
  edit: {
    position: 'absolute',
    top: '5px',
    right: '10px',
  },
  userInfo: {
    padding: '5px 10px 5px 10px',
  },
  user: {
    display: 'flex',
  },
  userName: {
    marginLeft: '5px',
  },
  userEmail: {},
  userAddress: {},
}));
function ShippingCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem(StorageKeys.SHIPPING));

  const dispatch = useDispatch();
  const handleEdit = () => {
    history.push('/checkout');
    dispatch(setStep(0));
  };
  return (
    <Box className={classes.root}>
      <Button
        className={classes.edit}
        variant="outlined"
        color="primary"
        onClick={handleEdit}
        size="small"
      >
        Sửa
      </Button>
      <Typography className={classes.title}>Địa chỉ giao hàng</Typography>
      <Box className={classes.userInfo}>
        <Box className={classes.user}>
          <Typography>Tên:</Typography>
          <Typography className={classes.userName}>{user.fullName}</Typography>
        </Box>
        <Typography className={classes.userEmail}>Email: {user.email}</Typography>
        <Typography className={classes.userAddress}>Địa chỉ: {user.address}</Typography>
      </Box>
    </Box>
  );
}

export default ShippingCard;
