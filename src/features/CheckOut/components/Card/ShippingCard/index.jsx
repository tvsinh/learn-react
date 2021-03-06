import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StorageKeys from 'constants/storage-keys';
import { setBackTo, setEdit, setStep } from 'features/CheckOut/orderSlice';
import useUserCurrent from 'hook/useUserCurrent';
import { PropTypes } from 'prop-types';
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
ShippingCard.propTypes = {
  backTo: PropTypes.bool,
  edit: PropTypes.bool,
};
function ShippingCard({ backTo = false, edit = false }) {
  const classes = useStyles();
  const history = useHistory();
  const userShipping = JSON.parse(localStorage.getItem(StorageKeys.SHIPPING)) || {};
  const { userCurrent, loading } = useUserCurrent();
  const user = backTo
    ? userCurrent
    : edit
    ? userShipping
      ? userShipping
      : userCurrent
    : userCurrent;

  const dispatch = useDispatch();
  const handleEdit = () => {
    if (backTo && !edit) {
      history.push('/checkout');
      dispatch(setStep(0));
      dispatch(setBackTo(true));
    } else if (edit && !backTo) {
      dispatch(setStep(0));
      dispatch(setBackTo(false));
      dispatch(setEdit(true));
    } else if (!edit && !backTo) {
      history.push('/checkout');
      dispatch(setStep(0));
      dispatch(setEdit(false));
      dispatch(setBackTo(false));
    }
  };
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box className={classes.root}>
          <Button
            className={classes.edit}
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            size="small"
          >
            S???a
          </Button>
          <Typography className={classes.title}>?????a ch??? giao h??ng</Typography>
          <Box className={classes.userInfo}>
            <Box className={classes.user}>
              <Typography>T??n:</Typography>
              <Typography className={classes.userName}>{user.fullName}</Typography>
            </Box>
            <Typography className={classes.userEmail}>Email: {user.email}</Typography>
            <Typography className={classes.userAddress}>
              ?????a ch???: {user.address ? user.address : 'B???n ch??a th??m ?????a ch??? m???c ?????nh.'}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ShippingCard;
