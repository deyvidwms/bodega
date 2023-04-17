import React, { useEffect, useState } from 'react';

import { FaBars, FaUserAlt } from "react-icons/fa";

import { Container, Navbar } from './styles';
import Menu from './Menu';

const Header: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  useEffect(() => {

    const changeNavBarMobile = () => {
      const width = window.innerWidth;
      setShowMobileMenu(width <= 680);
    }

    window.addEventListener('resize', changeNavBarMobile);

    changeNavBarMobile();

  }, []);

  return (
    <Container>
      <div>
        <h1>Budega's Store</h1>
      </div>
        {
          !showMobileMenu ?
          <Navbar onClick={handleShowMenu}>
            <p>Deyvid</p>
            <FaUserAlt />
          </Navbar> :
          <FaBars onClick={handleShowMenu} style={{cursor: 'pointer'}}/>
        }
      <Menu show={showMenu}/>
    </Container>
  );
}

export default Header;