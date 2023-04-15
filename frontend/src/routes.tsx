import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cliente from './pages/Dashboard/Cliente';
import Lote from './pages/Dashboard/Lote';
import Produto from './pages/Dashboard/Produto';
import Venda from './pages/Dashboard/Venda';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="cliente" element={<Cliente />}/>
          <Route path="lote" element={<Lote />}/>
          <Route path="produto" element={<Produto />}/>
          <Route path="venda" element={<Venda />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;