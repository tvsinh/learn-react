import { Box, Container, makeStyles, Paper, Typography, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from './../../../utils/common';
import { useHistory } from 'react-router';

AccountPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function AccountPage(props) {
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const handleCartClick = () => {
    history.push('/products');
  };
  return <Box>AccountPage</Box>;
}

export default AccountPage;
