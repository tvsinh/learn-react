import { Box } from '@material-ui/core';
import Header from 'components/Header';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './../Todo/pages/DetailPage/index';
import CartPage from './pages/CartPage';

CartFeature.propTypes = {};

function CartFeature() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Box>
        <Switch>
          <Route path={match.url} exact component={CartPage} />
          <Route path={`${match.url}/:productId`} component={DetailPage} />
        </Switch>
      </Box>
    </>
  );
}

export default CartFeature;
