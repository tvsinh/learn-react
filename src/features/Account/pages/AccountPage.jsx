import { Box, Container, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import ordersApi from 'api/orderApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    margin: theme.spacing(3, 0, 0.5, 15),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  account: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  userInfo: {
    padding: theme.spacing(1, 1),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 1),
    },
  },
  userName: {
    textTransform: 'capitalize',
  },
  order: {
    marginTop: '5px',
  },
  orderItem: {
    marginTop: '5px',
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
    <Box>
      <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
        Trở lại
      </Button>
      <Container className={classes.root}>
        <Typography>Thông tin tài khoản</Typography>
        <Box className={classes.account}>
          {user.id ? (
            <Box>
              <Box>
                <Paper className={classes.userInfo}>
                  <Typography className={classes.userName}>Tên: {user.fullName}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>
                    Địa chỉ: {user.address ? user.address : 'Bạn chưa thêm địa chỉ'}
                  </Typography>
                </Paper>
              </Box>
              <Box className={classes.order}>
                <Typography>Đơn hàng của bạn</Typography>
                {orderMe.map((orderItem) => (
                  <Box>
                    <Paper className={classes.orderItem}>
                      <Typography>{orderItem.inforShipping.fullName}</Typography>
                      <Typography>{orderItem.inforShipping.email}</Typography>
                      <Typography>address: {orderItem.inforShipping.address}</Typography>
                      <Typography>{orderItem.delivery}</Typography>
                      <Typography>{orderItem.payment}</Typography>
                      {orderItem.products.map((productItem) => (
                        <Box>
                          <Typography>product id: {productItem.id}</Typography>
                          <Typography>{productItem.quantity}</Typography>
                        </Box>
                      ))}
                      <Typography>{orderItem.totalCart}</Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box>
              <Paper className={classes.userInfo}>
                <Typography>Chưa đăng nhập</Typography>
                <Typography>Vui lòng đăng nhập để mua hàng</Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default AccountPage;
