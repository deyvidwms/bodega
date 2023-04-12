import React from 'react';

import { FaUserAlt } from "react-icons/fa";

import { Container, Navbar } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Budega's Store</h1>
      </div>
      <Navbar>
        <p>Deyvid</p>
        <FaUserAlt />
      </Navbar>
    </Container>
  );
}

export default Header;