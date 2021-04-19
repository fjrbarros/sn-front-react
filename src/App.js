import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Servico from './pages/Servico';
import Pedido from './pages/Pedido';

export default function App() {
  return (
    <BrowserRouter >
      <Switch >
        < Route exact path='/' component={Dashboard} />
        < Route exact path='/servico' component={Servico} />
        < Route exact path='/pedido' component={Pedido} />
        < Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}