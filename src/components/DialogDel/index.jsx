import { Typography, makeStyles, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeFromCart, setDialog } from 'features/Cart/cartSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

DialogDel.propTypes = {
  idRemove: PropTypes.string,
  label: PropTypes.string,
};
const useStyles = makeStyles((theme) => ({
  root: {},

  dialog: {
    opacity: '0.4',
  },
  titleDia: {
    opacity: 'none',
    width: '30vw',
    [theme.breakpoints.down('md')]: {
      width: '85vw',
    },
  },
  actionsDia: {
    opacity: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 20px 20px',
  },
  buttonNo: {
    backgroundColor: '#fafafa',
    opacity: 'none',
    minWidth: '12.5vw',
    [theme.breakpoints.down('md')]: {
      minWidth: '35vw',
    },
  },
  buttonYes: {
    opacity: 'none',
    minWidth: '12.5vw',
    backgroundColor: 'rgb(255, 66, 78)',
    color: '#FFF',
    [theme.breakpoints.down('md')]: {
      minWidth: '35vw',
    },
    '&:hover': {
      backgroundColor: 'rgb(255, 101, 110)',
    },
  },
}));
function DialogDel({ idRemove = null, label }) {
  const classes = useStyles();

  const open = useSelector((state) => state.cart.dialog);
  const dispatch = useDispatch();
  const handleButtonNo = () => {
    dispatch(setDialog(false));
  };
  const handleButtonYes = () => {
    dispatch(setDialog(false));
    dispatch(
      removeFromCart({
        idNeedToRemove: idRemove,
      })
    );
  };
  return (
    <Box className={classes.root}>
      <Dialog
        open={open}
        onClose={() => dispatch(setDialog(false))}
        aria-labelledby="alert-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title" className={classes.titleDia}>
          <Typography>Bạn muốn xóa sản phẩm này?</Typography>
        </DialogTitle>

        <DialogActions className={classes.actionsDia}>
          <Button
            onClick={handleButtonNo}
            color="primary"
            variant="outlined"
            className={classes.buttonNo}
          >
            Không
          </Button>
          <Button
            onClick={handleButtonYes}
            variant="contained"
            className={classes.buttonYes}
            autoFocus
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DialogDel;
