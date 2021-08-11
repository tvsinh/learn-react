import {
  Box,
  Button,
  Container,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import ordersApi from 'api/orderApi';
import userApi from 'api/userApi';
import { STATIC_HOST } from 'constants/index';
import ShippingCard from 'features/CheckOut/components/Card/ShippingCard';
import ShippingCardMobile from 'features/CheckOut/components/Card/ShippingCard/mobile';
import React, { useEffect, useState } from 'react';
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
      padding: theme.spacing(0, 5, 0),
    },
  },
  buttonBack: {
    textTransform: 'none',
    margin: theme.spacing(1, 0, 0, 15),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1, 0, 0, 3.5),
    },
  },
  account: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      // display: 'flex',
      // flexDirection: 'column',
      // width: '100%',
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

  order: {
    width: '800px',
    marginLeft: '10px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: '5px',
    },
  },
  orderItem: {
    padding: theme.spacing(0.5, 1, 1, 1),
    minHeight: '150px',
  },
  orderBox: {
    paddingBottom: '10px',
  },
  orderBoxItem: {
    borderBottom: '1px solid rgba(0, 0, 0, .5)',
    marginBottom: theme.spacing(2),
  },
  orderNumber: {
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
    padding: theme.spacing(4, 0, 0),
  },
  userInfoMobile: {
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
  },
  userOrderMobile: {
    backgroundColor: theme.palette.background.default,
  },
  titleMobile: {
    fontWeight: '500',
    marginLeft: theme.spacing(1),
  },
  orderBoxMobile: {
    margin: theme.spacing(1),
  },
}));

function AccountPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [userCurrent, setUserCurrent] = useState();
  const [loading, setLoading] = useState(true);
  const [orderMe, setOrderMe] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const user = await userApi.getInfor();
        setUserCurrent(user);
        const order = await ordersApi.get(user.id);
        setOrderMe(order);
      } catch (error) {
        console.log('Failed to fetch orders: ', error);
      }
      setLoading(false);
    })();
  }, []);

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
          <Container className={`${classes.root} + ${classes.sectionDesktop}`}>
            <Box>
              {userCurrent ? (
                <Box className={classes.account}>
                  <Box className={classes.userInfo}>
                    <Typography className={classes.title}>Thông tin tài khoản</Typography>
                    <Paper>
                      <ShippingCard backTo={true} />
                    </Paper>
                  </Box>

                  <Box className={classes.order}>
                    <Typography className={classes.title}>Đơn hàng của bạn</Typography>
                    <Box className={classes.orderBox}>
                      <Paper className={classes.orderItem}>
                        {orderMe.length ? (
                          <>
                            {orderMe.map((orderItem, index) => (
                              <Box key={orderItem.id} className={classes.orderBoxItem}>
                                <Typography className={classes.orderNumber}>
                                  Đơn hàng: {index + 1}
                                </Typography>
                                <Typography>
                                  Tên người nhận: {orderItem.inforShipping.fullName}
                                </Typography>
                                <Typography>Email: {orderItem.inforShipping.email}</Typography>
                                <Typography>
                                  Địa chỉ nhận hàng: {orderItem.inforShipping.address}
                                </Typography>
                                <Typography>
                                  Phí giao hàng: {formatPrice(orderItem.deliveryPrice)}
                                </Typography>
                                <Typography>Hình thức thanh toán: {orderItem.payment}</Typography>
                                <Box className={classes.boxProduct}>
                                  {orderItem.products.map((productItem) => (
                                    <Box key={productItem.id} className={classes.productBox}>
                                      <img
                                        alt="product_img"
                                        width="80px"
                                        height="80px"
                                        src={`${STATIC_HOST}${productItem.product['thumbnail'][0]?.url}`}
                                      />
                                      <Box className={classes.boxinfoProduct}>
                                        <Typography>{productItem.product['name']}</Typography>
                                        <Typography>Số lượng: {productItem.quantity}</Typography>
                                        <Typography>
                                          Giá: {formatPrice(productItem.product['salePrice'])}
                                        </Typography>
                                        <Typography>
                                          Tổng:{' '}
                                          {formatPrice(
                                            productItem.product['salePrice'] * productItem.quantity
                                          )}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                                <Box className={classes.boxTotalOrder}>
                                  <Typography>Thành tiền:</Typography>
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

          {/* Moblie view */}
          <Box className={`${classes.rootMobile} + ${classes.sectionMobile}`}>
            {userCurrent ? (
              <>
                <Box className={classes.userInfoMobile}>
                  <ShippingCardMobile backTo={true} />
                </Box>
                <Box className={classes.userOrderMobile}>
                  <Typography className={classes.titleMobile}>Đơn hàng của bạn</Typography>
                  <Box className={classes.orderBoxMobile}>
                    {/* <Paper className={classes.orderItem}> */}
                    {orderMe.length ? (
                      <>
                        {orderMe.map((orderItem, index) => (
                          <Box key={orderItem.id} className={classes.orderBoxItem}>
                            <Typography className={classes.orderNumber}>
                              Đơn hàng: {index + 1}
                            </Typography>
                            <Typography>
                              Tên người nhận: {orderItem.inforShipping.fullName}
                            </Typography>
                            <Typography>Email: {orderItem.inforShipping.email}</Typography>
                            <Typography>
                              Địa chỉ nhận hàng: {orderItem.inforShipping.address}
                            </Typography>
                            <Typography>
                              Phí giao hàng: {formatPrice(orderItem.deliveryPrice)}
                            </Typography>
                            <Typography>Hình thức thanh toán: {orderItem.payment}</Typography>
                            <Box className={classes.boxProduct}>
                              {orderItem.products.map((productItem) => (
                                <Box key={productItem.id} className={classes.productBox}>
                                  <img
                                    alt="product_img"
                                    width="80px"
                                    height="80px"
                                    src={`${STATIC_HOST}${productItem.product['thumbnail'][0]?.url}`}
                                  />
                                  <Box className={classes.boxinfoProduct}>
                                    <Typography>{productItem.product['name']}</Typography>
                                    <Typography>Số lượng: {productItem.quantity}</Typography>
                                    <Typography>
                                      Giá: {formatPrice(productItem.product['salePrice'])}
                                    </Typography>
                                    <Typography>
                                      Tổng:{' '}
                                      {formatPrice(
                                        productItem.product['salePrice'] * productItem.quantity
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                            <Box className={classes.boxTotalOrder}>
                              <Typography>Thành tiền:</Typography>
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
                    {/* </Paper> */}
                  </Box>
                </Box>
              </>
            ) : (
              <Box>
                <Box className={classes.userNotLogin}>
                  <Typography>Chưa đăng nhập</Typography>
                  <Typography>Vui lòng đăng nhập để mua hàng</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default AccountPage;
