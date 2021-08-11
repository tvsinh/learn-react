import { Box, Button, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { addToCart } from 'features/Cart/cartSlice';
import useProductDetail from 'hook/useProductDetail';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(5, 1, 0, 1),
    },
  },
  buttonBack: {
    marginBottom: '3px',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      padding: theme.spacing(1, 0),
      borderRight: '0px',
    },
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '5px 5px 10px',
    },
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showMiniCart, setShowMiniCart] = useState(false);

  const {
    params: { productId },
    url,
  } = useRouteMatch();
  // const matchs = useRouteMatch();
  const { product, loading } = useProductDetail(productId);
  const cartItems = useSelector((state) => state.cart.cartItems) || {};
  const index = cartItems.findIndex((x) => x.id === product.id);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    if (index === -1 || quantity <= Number.parseInt(product.quantity - cartItems[index].quantity)) {
      dispatch(
        addToCart({
          id: product.id,
          product,
          quantity,
        })
      );
      setShowMiniCart(false);
      setTimeout(() => {
        setShowMiniCart(true);
      }, 100);
    } else if (quantity > Number.parseInt(product.quantity - cartItems[index].quantity)) {
      enqueueSnackbar(
        `Số lượng tối đa là ${product.quantity}. Trong giỏ ${cartItems[index].quantity}.`,
        {
          variant: 'info',
        }
      );
    }
  };
  const handleHideMiniCart = () => {
    setShowMiniCart(false);
  };
  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <Box onClick={handleHideMiniCart}>
        <Header showMiniCart={showMiniCart} />
        <Box pt={3}>
          <Container className={classes.root}>
            <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
              Trở lại
            </Button>
            <Paper elevation={0}>
              <Grid container>
                <Grid item className={classes.left}>
                  <ProductThumbnail product={product} />
                </Grid>

                <Grid item className={classes.right}>
                  <ProductInfo product={product} />
                  <AddToCartForm onSubmit={handleAddToCartSubmit} product={product} />
                </Grid>
              </Grid>
            </Paper>

            <ProductMenu />

            <Switch>
              <Route exact path={url}>
                <ProductDescription product={product} />
              </Route>

              <Route path={`${url}/additional`} component={ProductAdditional} />
              <Route path={`${url}/reviews`} component={ProductReviews} />
            </Switch>
          </Container>
        </Box>
      </Box>
      <Footer />
      <script>$(document).ready(function(){window.scrollTo({ top: 0 })});</script>
    </>
  );
}

export default DetailPage;
