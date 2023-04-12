import React from 'react';

import Header from '../Header';

import { Container } from './styles';
import SideBar from '../SideBar';

const LayoutDashboard: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Container>
      <Header />
      <SideBar />
      {children}
    </Container>
  );
}

export default LayoutDashboard;