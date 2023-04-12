import React, { useState } from 'react';

import { FaUserAlt } from "react-icons/fa";

import { Container, Navbar } from './styles';
import Menu from './Menu';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <Container>
      <div>
        <h1>Budega's Store</h1>
      </div>
      <Navbar onClick={handleShowMenu}>
        <p>Deyvid</p>
        <FaUserAlt />
      </Navbar>
      <Menu show={showMenu}/>
    </Container>
  );
}

export default Header;