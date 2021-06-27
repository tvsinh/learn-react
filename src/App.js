import Footer from 'components/Footer';
import ProductFeature from 'features/Product';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import CartFeature from './features/Cart';
import TodoFeature from './features/Todo';
import AccountFeature from './features/Account';

function App() {
  return (
    <>
      <div className="app">
        <Switch>
          <Redirect from="/" to="/products" exact />
          <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

          <Route path="/products" component={ProductFeature} />
          <Route path="/todos" component={TodoFeature} />
          <Route path="/cart" component={CartFeature} />
          <Route path="/account" component={AccountFeature} />

          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
      {/* <script>window.onbeforeunload(function(){window.scrollTo({ top: 0 })});</script> */}
      <script>$(document).ready(function(){window.scrollTo({ top: 0 })});</script>
    </>
  );
}

export default App;
