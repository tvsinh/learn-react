import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import Header from 'components/Header';
import { addToCart, hideMiniCart, showMiniCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(5),
    },
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(0),
      borderRight: '0px',
    },
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(0),
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

  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
    dispatch(hideMiniCart());
    setTimeout(() => {
      dispatch(showMiniCart());
    }, 100);
  };
  const handleHideMiniCart = () => {
    dispatch(hideMiniCart());
  };

  return (
    <Box onClick={handleHideMiniCart}>
      <Header />
      <Box pt={4}>
        <Container>
          <Paper elevation={0}>
            <Grid container className={classes.root}>
              <Grid item className={classes.left}>
                <ProductThumbnail product={product} width="100%" />
              </Grid>

              <Grid item className={classes.right}>
                <ProductInfo product={product} />
                <AddToCartForm onSubmit={handleAddToCartSubmit} />
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
      <script>$(document).ready(function(){window.scrollTo({ top: 0 })});</script>
    </Box>
  );
}

export default DetailPage;
