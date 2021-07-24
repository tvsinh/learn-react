import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  deliveryInfo: {
    padding: '5px 10px 10px 10px',
  },

  delivery: {},
  payment: {},
}));
function DeliveryCardMobile(props) {
  const classes = useStyles();
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(setStep(1));
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
      <Typography className={classes.title}>Thanh toán & giao hàng</Typography>
      <Box className={classes.deliveryInfo}>
        <Typography className={classes.delivery}>
          Phương thức giao hàng: {order.delivery}
        </Typography>
        <Typography className={classes.payment}>Phương thức thanh toán: {order.payment}</Typography>
      </Box>
    </Box>
  );
}

export default DeliveryCardMobile;
