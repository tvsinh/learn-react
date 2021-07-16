import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { hideMiniCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

MiniSuccessCart.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '300px',
    height: 'auto',
    top: '55px',
    right: '0',
    backgroundColor: '#FFF',
    borderRadius: '2px',
    padding: theme.spacing(1.5, 1.5),
    justifyContent: 'center',
    '&::after': {},
  },

  close: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    fontSize: 'medium',
  },
}));

function MiniSuccessCart(props) {
  const classes = useStyles();
  const history = useHistory();
  const miniCart = useSelector((state) => state.cart.showMiniCart);
  const dispatch = useDispatch();
  const hanldeCloseMiniCart = () => {
    dispatch(hideMiniCart());
  };
  const hanldeLinkCart = () => {
    history.push('/cart');
    // dispatch(hideMiniCart());
  };

  if (miniCart) {
    return (
      <Paper className={classes.root}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          alignItems="center"
          margin={(0, 1)}
        >
          <Close
            className={classes.close}
            onClick={hanldeCloseMiniCart}
            style={{ cursor: 'pointer' }}
          />
          <svg
            stroke="rgb(76, 175, 80)"
            fill="rgb(76, 175, 80)"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
          </svg>
          <Box ml={0.5}>
            <Typography color="textPrimary">Thêm vào giỏ hàng thành công!</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          // fullWidth
          style={{ textTransform: 'none' }}
          onClick={hanldeLinkCart}
        >
          Xem giỏ hàng và thanh toán
        </Button>
      </Paper>
    );
  } else {
    return null;
  }
}

export default MiniSuccessCart;
