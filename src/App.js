import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import ColorBox from './components/ColorBox';
import NotFound from './components/NotFound';
import TodoFeature from './features/Todo';
import CounterFeature from './features/Counter';
import Header from 'components/Header';
import AlbumFeature from 'features/Album';

function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const params = {
  //       _limit: 10,
  //     };
  //     const productList = await productApi.getAll(params);
  //     console.log(productList);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div className="App">
      <Header />
      <ColorBox />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
