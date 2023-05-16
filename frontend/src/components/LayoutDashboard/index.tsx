import React, { useEffect, useState } from 'react';

import Header from '../Header';

import { Container, Content } from './styles';
import SideBar from '../SideBar';

const LayoutDashboard: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  const handleClickSideBar = () => setShowSideBar(!showSideBar);

  return (
    <Container>
      <Header changeMobileMenu={showSideBar} onClick={handleClickSideBar} />
      <Content>
        <SideBar showSideBar={showSideBar} />
        {children}
      </Content>
    </Container>
  );
}

export default LayoutDashboard;