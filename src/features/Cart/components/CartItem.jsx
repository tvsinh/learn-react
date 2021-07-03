import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  rootMobile: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    display: 'flex',
  },
  itemMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100vw',
    position: 'relative',
  },
  imgNameMobile: {
    display: 'flex',
  },
  itemProductMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  productNameMobile: {
    marginLeft: '10px',
    width: 'auto',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
    '&:hover': {
      color: 'rgb(0, 127, 240)',
    },
  },
  boxQtyMobile: {
    width: 'auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  productPriceAndDel: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    height: '100%',
  },
  productPriceMobile: {
    // position: 'absolute',
    // right: '2px',
    // bottom: '0px',
  },
  delMobile: {
    position: 'absolute',
    right: '0',
    bottom: '2px',
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
    <>
      <Box className={classes.sectionDesktop}>
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
      </Box>

      <Box className={classes.sectionMobile}>
        <Box className={classes.rootMobile}>
          <Box elevation={0} className={classes.itemMobile}>
            <Box className={classes.imgNameMobile}>
              <img
                src={
                  data.product.thumbnail
                    ? `${STATIC_HOST}${data.product.thumbnail?.url}`
                    : THUMBNAIL_PLACEHOLDER
                }
                alt={data.product.name}
                width="80px"
              />
              <Box className={classes.itemProductMobile}>
                <Typography className={classes.productNameMobile} onClick={handleOnClickProduct}>
                  {data.product.name}
                </Typography>
                <Box className={classes.boxQtyMobile}>
                  <IconButton onClick={handleDownQuantity}>
                    <RemoveCircleOutline />
                  </IconButton>
                  <TextField value={Number(data.quantity)} variant="outlined" size="small" />
                  <IconButton onClick={handleUpQuantity}>
                    <AddCircleOutline />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box className={classes.productPriceAndDel}>
              <Box>
                <Typography className={classes.productPriceMobile}>
                  {formatPrice(data.product.salePrice)}
                </Typography>
              </Box>

              <Box size="small" className={classes.delMobile}>
                <Button onClick={handleRemoveProduct}>Xóa</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CartItem;
