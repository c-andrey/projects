import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main/Main'
import ListProducts from './pages/ProductsList/ProductsList'
import Product from './pages/Product/Product'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/products" component={ListProducts} />
      <Route path="/products/:id" component={Product} />
    </Switch>
  </BrowserRouter>
)

export default Routes
