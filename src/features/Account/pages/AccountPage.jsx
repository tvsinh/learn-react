import {
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
import ordersApi from 'api/orderApi';
import { STATIC_HOST } from 'constants/index';
import ShippingCard from 'features/CheckOut/components/Card/ShippingCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';

AccountPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 12, 8),
    height: '350px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      height: '400px',
      padding: theme.spacing(10, 5, 0),
    },
  },
  buttonBack: {
    textTransform: 'none',
    margin: theme.spacing(1, 0, 0, 15),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  account: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  title: {
    fontSize: '16px',
  },
  userInfo: {
    // padding: theme.spacing(1, 1),
    width: '350px',
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(1, 1),
    },
  },
  userName: {
    textTransform: 'capitalize',
  },
  order: {
    width: '800px',
    marginLeft: '10px',
  },
  orderItem: {
    padding: theme.spacing(0.5, 1, 1, 1),
    minHeight: '150px',
  },
  orderBox: {
    paddingBottom: '10px',
  },
  orderBoxItem: {
    // paddingBottom: '10px',
  },
  orderNumber: {
    fontSize: '18px',
    fontWeight: '500',
  },
  boxProduct: {
    borderTop: '1px solid rgba(0, 0, 0, .5)',
  },
  productBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    borderBottom: '1px solid rgba(0, 0, 0, .5)',
  },
  boxinfoProduct: {
    marginLeft: '5px',
    marginTop: '2px',
    display: 'flex',
    flexDirection: 'column',
  },
  boxTotalOrder: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  totalOrder: {
    marginLeft: '5px',
    fontSize: '18px',
    color: 'rgb(238, 35, 71)',
  },
  userNotLogin: {
    padding: '10px',
  },
}));

function AccountPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [reLoad, setReLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orderMe, setOrderMe] = useState([]);

  const user = useSelector((state) => state.user.current);
  useEffect(() => {
    if (reLoad) {
      (async () => {
        try {
          const order = await ordersApi.get(user.id);
          setOrderMe(order);
        } catch (error) {
          console.log('Failed to fetch todos: ', error);
        }
        setReLoad(false);
        setLoading(false);
      })();
    }
  }, [user.id, reLoad]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
            Trở lại
          </Button>
          <Container className={classes.root}>
            <Box>
              {user.id ? (
                <Box className={classes.account}>
                  <Box className={classes.userInfo}>
                    <Typography className={classes.title}>Thông tin tài khoản</Typography>
                    <Paper>
                      {/* <Typography className={classes.userName}>Tên: {user.fullName}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>
                    Địa chỉ: {user.address ? user.address : 'Bạn chưa thêm địa chỉ'}
                  </Typography> */}
                      <ShippingCard />
                    </Paper>
                  </Box>
                  <Box className={classes.order}>
                    <Typography className={classes.title}>Đơn hàng của bạn</Typography>
                    <Box className={classes.orderBox}>
                      <Paper className={classes.orderItem}>
                        {orderMe.length ? (
                          <>
                            {orderMe.map((orderItem, index) => (
                              <Box className={classes.orderBoxItem}>
                                <Typography className={classes.orderNumber}>
                                  Đơn hàng: {index + 1}
                                </Typography>
                                <Typography>Name: {orderItem.inforShipping.fullName}</Typography>
                                <Typography>Email: {orderItem.inforShipping.email}</Typography>
                                <Typography>Address: {orderItem.inforShipping.address}</Typography>
                                <Typography>
                                  Delivery Price: {formatPrice(orderItem.deliveryPrice)}
                                </Typography>
                                <Typography>Payment: {orderItem.payment}</Typography>
                                <Box className={classes.boxProduct}>
                                  {orderItem.products.map((productItem) => (
                                    <Box className={classes.productBox}>
                                      <img
                                        alt="product_img"
                                        width="80px"
                                        height="80px"
                                        src={`${STATIC_HOST}${productItem.product['thumbnail'][0]?.url}`}
                                      />
                                      <Box className={classes.boxinfoProduct}>
                                        <Typography>{productItem.product['name']}</Typography>
                                        <Typography>
                                          Product Quantity: {productItem.quantity}
                                        </Typography>
                                        <Typography>
                                          Product Price:{' '}
                                          {formatPrice(productItem.product['salePrice'])}
                                        </Typography>
                                        <Typography>
                                          Total:{' '}
                                          {formatPrice(
                                            productItem.product['salePrice'] * productItem.quantity
                                          )}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                                <Box className={classes.boxTotalOrder}>
                                  <Typography>Total Order:</Typography>
                                  <Typography className={classes.totalOrder}>
                                    {formatPrice(orderItem.totalOrder)}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </>
                        ) : (
                          <Box>Không có đơn hàng nào</Box>
                        )}
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Paper className={classes.userNotLogin}>
                    <Typography>Chưa đăng nhập</Typography>
                    <Typography>Vui lòng đăng nhập để mua hàng</Typography>
                  </Paper>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

export default AccountPage;
