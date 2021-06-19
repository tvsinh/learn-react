import { Box, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { AddCircleOutline, DeleteForever, RemoveCircleOutline } from '@material-ui/icons';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST } from './../../../constants/common';
import { formatPrice } from './../../../utils/common';
import { useDispatch } from 'react-redux';
import { removeFromCart, setQuantity } from '../cartSlice';

CartItem.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },

  item: {
    display: 'flex',
    alignItems: 'center',
  },

  boxQuantity: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '150px',
  },
  productName: {
    marginLeft: '10px',
    width: '234px',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
  },
  productPrice: {
    width: '110px',
    padding: '0 5px',
  },
  productTotal: {
    width: '130px',
    paddingLeft: '20px',
  },
  iconDel: {
    width: '50px',
  },
}));

function CartItem({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleUpQuantity = () => {
    const newQuantity = Number.parseInt(data.quantity) + 1;
    if (newQuantity >= 1) {
      const action = setQuantity({
        id: data.product.id,
        quantity: newQuantity,
      });
      dispatch(action);
    }
  };
  const handleDownQuantity = () => {
    const newQuantity = Number.parseInt(data.quantity) - 1;
    if (newQuantity >= 1) {
      const action = setQuantity({
        id: data.product.id,
        quantity: newQuantity,
      });
      dispatch(action);
    }
  };
  const handleRemoveProduct = () => {
    const action = removeFromCart({
      idNeedToRemove: data.product.id,
    });
    dispatch(action);
  };
  return (
    <Box className={classes.root}>
      {/* <Container container> */}
      <Paper elevation={0} className={classes.item}>
        <img
          src={
            data.product.thumbnail
              ? `${STATIC_HOST}${data.product.thumbnail?.url}`
              : THUMBNAIL_PLACEHOLDER
          }
          alt={data.product.name}
          width="80px"
        />
        <Typography className={classes.productName}>{data.product.name}</Typography>

        <Typography className={classes.productPrice}>
          {formatPrice(data.product.salePrice)}
        </Typography>

        <Box className={classes.boxQuantity}>
          <IconButton onClick={handleDownQuantity}>
            <RemoveCircleOutline />
          </IconButton>
          <TextField value={Number(data.quantity)} variant="outlined" size="small" />
          <IconButton onClick={handleUpQuantity}>
            <AddCircleOutline />
          </IconButton>
        </Box>
        <Typography className={classes.productTotal}>
          {formatPrice(data.product.salePrice * data.quantity)}
        </Typography>
        <Box size="small" className={classes.iconDel}>
          <IconButton onClick={handleRemoveProduct}>
            <DeleteForever />
          </IconButton>
        </Box>
      </Paper>
      {/* </Container> */}
    </Box>
  );
}

export default CartItem;
