import React from 'react';

import Header from '../Header';

import { Container, Content } from './styles';
import SideBar from '../SideBar';

const LayoutDashboard: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Container>
      <Header />
      <Content>
        <SideBar />
        {children}
      </Content>
    </Container>
  );
}

export default LayoutDashboard;