import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import StorageKeys from 'constants/storage-keys';
import { setBackTo, setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PropTypes } from 'prop-types';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
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
ShippingCardMobile.propTypes = {
  backTo: PropTypes.bool,
};
function ShippingCardMobile({ backTo = false }) {
  const classes = useStyles();
  const history = useHistory();
  const userShipping = JSON.parse(localStorage.getItem(StorageKeys.SHIPPING));
  const userCurrent = useSelector((state) => state.user.current);
  const user = userShipping ? userShipping : userCurrent;

  const dispatch = useDispatch();
  const handleEdit = () => {
    if (backTo) {
      history.push('/checkout');
      dispatch(setStep(0));
      dispatch(setBackTo(true));
    }
    if (!backTo) {
      history.push('/checkout');
      dispatch(setStep(0));
    }
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

export default ShippingCardMobile;
