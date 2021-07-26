import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import QuantityField from 'components/form-controls/QuantityField';
import LoadingProgress from 'components/Loading';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import useProductDetail from 'hook/useProductDetail';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { removeFromCart, setQuantity } from '../cartSlice';
import { STATIC_HOST } from './../../../constants/common';
import { formatPrice } from './../../../utils/common';

CartItem.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  loading: {
    height: '80px',
    margin: theme.spacing(1, 0, 1, 3.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '8px',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1, 0, 1, 3),
      paddingTop: '0',
    },
  },
  rootDesktop: {
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxHandleQty: {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: '0',
    paddingTop: '0',
  },
  boxQtyStock: {
    fontSize: '11px',
    lineHeight: '11px',
  },
  productTotal: {
    width: '145px',
    paddingLeft: '10px',
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
  imgMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'column',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  iconButton: {
    width: '30px',
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
  const { product, loading } = useProductDetail(data.product.id);

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
    });
  };

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Vui lòng nhập số lượng')
      .min(1, 'Giá trị nhỏ nhất là 1')
      .max(product.quantity, `Nhập giá trị nhỏ hơn ${product.quantity}`)
      .typeError('Vui lòng nhập số lượng'),
  });
  const form = useForm({
    defaultValues: {
      quantity: data.quantity,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSubmit = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      const action = setQuantity({
        id: data.product.id,
        quantity: newQuantity,
      });
      dispatch(action);
    }
    if (newQuantity === 0) {
      const action = removeFromCart({
        idNeedToRemove: data.product.id,
      });
      dispatch(action);
    }
  };
  const handleChangeQty = (e) => {
    console.log('newQuantity change', e.target.value);
    const newQuantity = e.target.value;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      const action = setQuantity({
        id: data.product.id,
        quantity: newQuantity,
      });
      dispatch(action);
    }
  };

  return (
    <>
      {loading ? (
        <Box className={classes.loading}>
          <LoadingProgress />
        </Box>
      ) : (
        <Box>
          <Box className={classes.sectionDesktop}>
            <Box className={classes.rootDesktop}>
              <Paper elevation={0} className={classes.item}>
                <Box className={classes.itemProduct} onClick={handleOnClickProduct}>
                  <img
                    src={
                      data.product.thumbnail[0]
                        ? `${STATIC_HOST}${data.product.thumbnail[0]?.url}`
                        : THUMBNAIL_PLACEHOLDER
                    }
                    alt={data.product.name}
                    width="80px"
                    height="80px"
                  />
                  <Typography className={classes.productName}>{data.product.name}</Typography>
                </Box>

                <Typography className={classes.productPrice}>
                  {formatPrice(data.product.salePrice)}
                </Typography>

                <Box className={classes.boxQty}>
                  <Box className={classes.boxHandleQty}>
                    <Typography className={classes.boxQtyStock}>
                      Còn trong kho: {product.quantity}
                    </Typography>
                    {/* <IconButton onClick={handleDownQuantity}>
                      <RemoveCircleOutline />
                    </IconButton>
                    <TextField value={Number(data.quantity)} variant="outlined" size="small" />
                    <IconButton onClick={handleUpQuantity}>
                      <AddCircleOutline />
                    </IconButton> */}
                    <form onSubmit={form.handleSubmit(handleSubmit)} onChange={handleChangeQty}>
                      <QuantityField
                        name="quantity"
                        label={null}
                        form={form}
                        cartQty={true}
                        data={data}
                      />
                    </form>
                  </Box>
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
            </Box>
          </Box>

          <Box className={classes.sectionMobile}>
            <Box className={classes.rootMobile}>
              <Box elevation={0} className={classes.itemMobile}>
                <Box className={classes.imgNameMobile}>
                  <Box className={classes.imgMobile}>
                    <img
                      src={
                        data.product.thumbnail[0]
                          ? `${STATIC_HOST}${data.product.thumbnail[0]?.url}`
                          : THUMBNAIL_PLACEHOLDER
                      }
                      alt={data.product.name}
                      width="80px"
                      height="80px"
                    />
                  </Box>

                  <Box className={classes.itemProductMobile}>
                    <Typography
                      className={classes.productNameMobile}
                      onClick={handleOnClickProduct}
                    >
                      {data.product.name}
                    </Typography>
                    <Box className={classes.boxQtyMobile}>
                      {/* <IconButton className={classes.iconButton} onClick={handleDownQuantity}>
                        <RemoveCircleOutline />
                      </IconButton>
                      <TextField value={Number(data.quantity)} variant="outlined" size="small" />
                      <IconButton className={classes.iconButton} onClick={handleUpQuantity}>
                        <AddCircleOutline />
                      </IconButton> */}
                      <Typography className={classes.boxQtyStock}>
                        Còn trong kho: {product.quantity}
                      </Typography>
                      <form onSubmit={form.handleSubmit(handleSubmit)} onChange={handleChangeQty}>
                        <QuantityField
                          name="quantity"
                          label={null}
                          form={form}
                          cartQty={true}
                          data={data}
                        />
                      </form>
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
        </Box>
      )}
    </>
  );
}

export default CartItem;
