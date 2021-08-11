import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import CartQtyField from 'components/form-controls/CartQtyField';
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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useSnackbar } from 'notistack';

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
    cursor: 'pointer',
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
    left: '1vw',
  },
  boxQtyStockMoblie: {
    fontSize: '11px',
    lineHeight: '11px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '2vw',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '3vw',
    },
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

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

function CartItem({ cartItem }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { product, loading } = useProductDetail(cartItem.id);
  // Dialog
  const [open, setOpen] = React.useState(false);
  const handleButtonNo = () => {
    setOpen(false);
  };
  const handleButtonYes = () => {
    setOpen(false);
    dispatch(
      removeFromCart({
        idNeedToRemove: cartItem.product.id,
      })
    );
  };

  const handleRemoveProduct = () => {
    setOpen(true);
  };

  const handleOnClickProduct = () => {
    const idProduct = cartItem.product.id;
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
      quantity: cartItem.quantity,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSubmit = (newQuantity, e) => {
    e.preventDefault();
    // const newQty = e.target.value;
    // const qty = Number(product.quantity);
    // if (newQuantity.quantity >= 1 && newQuantity.quantity <= qty) {
    //   const action = setQuantity({
    //     id: cartItem.product.id,
    //     quantity: newQuantity.quantity,
    //   });
    //   dispatch(action);
    // }
  };
  const handleChangeQty = (e) => {
    const newQuantity = e.target.value;
    const qty = Number(product.quantity);
    if (newQuantity >= 1 && newQuantity <= qty) {
      const action = setQuantity({
        id: cartItem.product.id,
        quantity: newQuantity,
      });
      dispatch(action);
    } else if (newQuantity > qty) {
      enqueueSnackbar(`Sản phẩm "${cartItem.product.name}" có số lượng tối đa là ${qty}.`, {
        variant: 'info',
      });
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
                      cartItem.product.thumbnail[0]
                        ? `${STATIC_HOST}${cartItem.product.thumbnail[0]?.url}`
                        : THUMBNAIL_PLACEHOLDER
                    }
                    alt={cartItem.product.name}
                    width="80px"
                    height="80px"
                  />
                  <Typography className={classes.productName}>{cartItem.product.name}</Typography>
                </Box>

                <Typography className={classes.productPrice}>
                  {formatPrice(cartItem.product.salePrice)}
                </Typography>

                <Box className={classes.boxQty}>
                  <Box className={classes.boxHandleQty}>
                    <Typography className={classes.boxQtyStock}>
                      Còn trong kho: {product.quantity}
                    </Typography>

                    <form onSubmit={form.handleSubmit(handleSubmit)} onChange={handleChangeQty}>
                      <CartQtyField
                        name="quantity"
                        form={form}
                        label={null}
                        productId={product.id}
                        productName={product.name}
                        quantity={product.quantity}
                      />
                    </form>
                  </Box>
                </Box>
                <Typography className={classes.productTotal}>
                  {formatPrice(cartItem.product.salePrice * cartItem.quantity)}
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
                        cartItem.product.thumbnail[0]
                          ? `${STATIC_HOST}${cartItem.product.thumbnail[0]?.url}`
                          : THUMBNAIL_PLACEHOLDER
                      }
                      alt={cartItem.product.name}
                      width="80px"
                      height="80px"
                    />
                  </Box>

                  <Box className={classes.itemProductMobile}>
                    <Typography
                      className={classes.productNameMobile}
                      onClick={handleOnClickProduct}
                    >
                      {cartItem.product.name}
                    </Typography>
                    <Box className={classes.boxQtyMobile}>
                      <Typography className={classes.boxQtyStockMoblie}>
                        Còn trong kho: {product.quantity}
                      </Typography>
                      <form onSubmit={form.handleSubmit(handleSubmit)} onChange={handleChangeQty}>
                        <CartQtyField
                          name="quantity"
                          label={null}
                          form={form}
                          productId={product.id}
                          productName={product.name}
                          quantity={product.quantity}
                        />
                      </form>
                    </Box>
                  </Box>
                </Box>

                <Box className={classes.productPriceAndDel}>
                  <Box>
                    <Typography className={classes.productPriceMobile}>
                      {formatPrice(cartItem.product.salePrice)}
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
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title">
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
    </>
  );
}

export default CartItem;
