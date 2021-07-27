import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItems } from '../cartSlice';
import CartItem from './CartItem';

CartList.propTypes = {
  cartList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '20px',
  },
  list: {
    width: '800px',
  },
  itemNav: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    marginBottom: '10px',
  },

  navName: {
    width: '325px',
    textAlign: 'center',
  },
  navPrice: {
    width: '110px',
    padding: '0 5px',
  },
  navQty: {
    width: '155px',
    textAlign: 'center',
  },
  navTotal: {
    width: '145px',
    paddingLeft: '10px',
  },
  iconDel: {
    width: '50px',
    textAlign: 'center',
  },
  item: {
    marginTop: '10px',
    padding: '2px 0',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  listMobile: {
    marginTop: '5px',
    width: '100%',
  },
  itemMobile: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  itemMobileHeader: {
    fontWeight: '500',
    padding: theme.spacing(1, 0, 0, 1),
  },

  //Dialog
  titleDia: {
    width: '30vw',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
  },
  actionsDia: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 20px 15px',
  },
  buttonNo: {
    minWidth: '12.5vw',
    [theme.breakpoints.down('md')]: {
      minWidth: '35vw',
    },
  },
  buttonYes: {
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

function CartList({ cartList }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Dialog
  const [open, setOpen] = React.useState(false);
  const handleButtonNo = () => {
    setOpen(false);
  };
  const handleButtonYes = () => {
    setOpen(false);
    dispatch(removeCartItems());
  };
  const handleDelAllCartItems = () => {
    setOpen(true);
  };
  return (
    <>
      <Box className={classes.sectionDesktop}>
        <Box className={classes.root}>
          <Grid item className={classes.list}>
            <Paper className={classes.itemNav}>
              <Typography className={classes.navName}>Sản phẩm</Typography>
              <Typography className={classes.navPrice}>Đơn giá</Typography>
              <Typography className={classes.navQty}>Số lượng</Typography>
              <Typography className={classes.navTotal}>Thành tiền</Typography>
              <Box size="small" className={classes.iconDel} onClick={handleDelAllCartItems}>
                <IconButton>
                  <DeleteForever />
                </IconButton>
              </Box>
            </Paper>
            <Paper className={classes.item}>
              {cartList.map((cartItem) => (
                <Box key={cartItem.id}>
                  <CartItem cartItem={cartItem} />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title">
          <DialogTitle id="alert-dialog-title" className={classes.titleDia}>
            <Typography>Bạn muốn xóa tất cả sản phẩm trong giỏ?</Typography>
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

      <Box className={classes.sectionMobile}>
        <Box className={classes.rootMobile}>
          <Grid item className={classes.listMobile}>
            <Box className={classes.itemMobile}>
              <Typography className={classes.itemMobileHeader}>Sản phẩm trong giỏ hàng</Typography>
              {cartList.map((cartItem) => (
                <Box key={cartItem.id}>
                  <CartItem cartItem={cartItem} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default CartList;
