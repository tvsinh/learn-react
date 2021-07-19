import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { STATIC_HOST } from 'constants/common';
import { THUMBNAIL_PLACEHOLDER } from 'constants/common';
import { makeStyles, Box, Typography, Button } from '@material-ui/core';
import { formatPrice } from 'utils';
import { cartTotalSelector } from 'features/Cart/selectors';
import { useHistory } from 'react-router';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '0 10px',
    width: '350px',
  },
  edit: {
    position: 'absolute',
    top: '5px',
    right: '10px',
  },
  title: {
    fontWeight: '500',
    paddingTop: '5px',
  },
  boxCard: {
    display: 'flex',
  },
  quantityCart: {
    display: 'flex',
  },
  hideInfo: {
    display: 'flex',
    marginLeft: '5px',
    color: 'rgb(13, 92, 182)',
    cursor: 'pointer',
  },

  cartItems: {
    display: 'block',
    margin: '5px 5px',
    width: '100%',
  },
  item: {
    display: 'flex',
    width: '100%',
  },
  imgName: {
    display: 'block',
  },
  img: {
    display: 'block',
    width: '80px',
    height: '80px',
  },
  itemProduct: {
    display: 'flex',
    marginLeft: '5px',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '70%',
  },
  productName: {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden !important',
  },

  boxQty: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  productPrice: {
    display: 'block',
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    color: 'rgb(238, 35, 71)',
    fontSize: '22px',
  },
}));
function OrderCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const cartTotal = useSelector(cartTotalSelector);
  const [hide, setHide] = useState(false);

  const cartList = useSelector((state) => state.cart.cartItems);
  const handleEdit = () => {
    history.push('/cart');
  };
  const handleShow = () => {
    setHide(!hide);
  };
  return (
    <Box className={classes.root}>
      <Button
        className={classes.edit}
        variant="outlined"
        color="primary"
        onClick={handleEdit}
        size="small"
      >
        Sửa
      </Button>
      <Typography className={classes.title}>Thông tin đơn hàng</Typography>
      <Box className={classes.boxCard}>
        <Typography className={classes.quantityCart}>{cartList.length} sản phẩm.</Typography>
        {hide ? (
          <Typography className={classes.hideInfo} onClick={handleShow}>
            Thu gọn <ArrowDropUp />
          </Typography>
        ) : (
          <Typography className={classes.hideInfo} onClick={handleShow}>
            Xem thông tin <ArrowDropDown />
          </Typography>
        )}
      </Box>
      {hide && (
        <Box>
          {cartList.map((cartItem) => (
            <Box className={classes.cartItems} key={cartItem.id}>
              <Box elevation={0} className={classes.item}>
                <Box className={classes.img}>
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

                <Box className={classes.itemProduct}>
                  <Typography className={classes.productName}>{cartItem.product.name}</Typography>
                  <Box className={classes.boxQty}>
                    <Typography>Số lượng: {Number(cartItem.quantity)}</Typography>
                    <Typography className={classes.productPrice}>
                      {formatPrice(cartItem.product.salePrice * cartItem.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Box className={classes.cartTotal}>
        Thành tiền:<Typography className={classes.total}>{formatPrice(cartTotal)}</Typography>
      </Box>
    </Box>
  );
}

export default OrderCard;