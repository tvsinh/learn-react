import { Box, Container, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import React from 'react';
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
}));

function AccountPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
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
            <Paper className={classes.userInfo}>
              <Typography>Tên: {user.fullName}</Typography>
              <Typography>Email: {user.email}</Typography>
            </Paper>
          ) : (
            <Paper className={classes.userInfo}>
              <Typography>Chưa đăng nhập</Typography>
              <Typography>Vui lòng đăng nhập để mua hàng</Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default AccountPage;
