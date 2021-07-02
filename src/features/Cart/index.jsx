import { Box } from '@material-ui/core';
import Header from 'components/Header';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
        </Switch>
      </Box>
    </>
  );
}

export default CartFeature;
