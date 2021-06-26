import { Box, IconButton, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { AddCircleOutline, DeleteForever, RemoveCircleOutline } from '@material-ui/icons';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromCart, setQuantity } from '../cartSlice';
import { STATIC_HOST } from './../../../constants/common';
import { formatPrice } from './../../../utils/common';

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
  itemProduct: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  productName: {
    marginLeft: '10px',
    width: '234px',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
    '&:hover': {
      color: 'rgb(0, 127, 240)',
    },
  },
  productPrice: {
    width: '110px',
    padding: '0 5px',
  },
  boxQty: {
    width: '155px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  productTotal: {
    width: '145px',
    paddingLeft: '10px',
    // display: '-webkit-box',
    // '-webkit-box-orient': 'vertical',
    // '-webkit-line-clamp': '1',
    // overflow: 'hidden',
  },
  iconDel: {
    width: '50px',
  },
}));

function CartItem({ data }) {
  const classes = useStyles();
  const history = useHistory();
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

  const handleOnClickProduct = () => {
    const idProduct = data.product.id;
    history.push({
      pathname: `/products/${idProduct}`,
      // search: queryString.stringify(idProduct),
    });
  };
  return (
    <Box className={classes.root}>
      {/* <Container container> */}
      <Paper elevation={0} className={classes.item}>
        <Box className={classes.itemProduct} onClick={handleOnClickProduct}>
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
        </Box>

        <Typography className={classes.productPrice}>
          {formatPrice(data.product.salePrice)}
        </Typography>

        <Box className={classes.boxQty}>
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
