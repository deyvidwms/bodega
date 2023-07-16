import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cliente from './pages/Dashboard/Cliente';
import Lote from './pages/Dashboard/Lote';
import Produto from './pages/Dashboard/Produto';
import Venda from './pages/Dashboard/Venda';
import VendaProduto from './pages/Dashboard/Venda/Produto';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Encarte from './pages/Encarte';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/encarte" element={<Encarte />}/>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="cliente" element={<Cliente />}/>
          <Route path="lote" element={<Lote />}/>
          <Route path="produto" element={<Produto />}/>
          <Route path="venda">
            <Route index element={<Venda />} />
            <Route path="produto" element={<VendaProduto />}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;