import React, { useEffect, useState } from 'react';

import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";

import { Container, Navbar } from './styles';
import Menu from './Menu';

type Props = {
  changeMobileMenu: boolean;
  onClick: () => void;
}

const Header: React.FC<Props> = ({changeMobileMenu, onClick}) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {

    const changeNavBarMobile = () => {
      const width = window.innerWidth;
      setShowMobileMenu(width <= 800);
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
          <Navbar>
            <p>Deyvid</p>
            <FaUserAlt />
          </Navbar> : (
            !changeMobileMenu ?
            <FaBars onClick={onClick} style={{cursor: 'pointer'}}/> :
            <FaTimes onClick={onClick} style={{cursor: 'pointer'}} />
          )
        }
      {/* <Menu show={showMenu}/> */}
    </Container>
  );
}

export default Header;