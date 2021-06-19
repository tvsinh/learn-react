import { Box, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import CartItem from './CartItem';

CartList.propTypes = {
  cartList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {},
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
    width: '327px',
    textAlign: 'center',
  },
  navPrice: {
    width: '100px',
    // textAlign: 'center',
  },
  navQty: {
    width: '180px',
    textAlign: 'center',
  },
  navTotal: {
    width: '130px',
    // textAlign: 'center',
  },
  iconDel: {
    width: '50px',
    textAlign: 'center',
  },
  item: {
    marginTop: '10px',
    padding: '2px 0',
  },
}));

function CartList({ cartList }) {
  const classes = useStyles();

  return (
    <Box>
      <Grid item className={classes.list}>
        <Paper className={classes.itemNav}>
          <Typography className={classes.navName}>Sản phẩm</Typography>
          <Typography className={classes.navPrice}>Đơn giá</Typography>
          <Typography className={classes.navQty}>Số lượng</Typography>
          <Typography className={classes.navTotal}>Thành tiền</Typography>
          <Box size="small" className={classes.iconDel}>
            <IconButton>
              <DeleteForever />
            </IconButton>
          </Box>
        </Paper>
        <Paper className={classes.item}>
          {cartList.map((cartItem) => (
            <Box key={cartItem.id}>
              <CartItem data={cartItem} />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Box>
  );
}

export default CartList;
