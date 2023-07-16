import styled from 'styled-components';

export const Container = styled.div<{show: boolean}>`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 200px;
  padding: 10px;
  background-color: #FFF;
  border-radius: 12px;
  box-shadow: -10px -10px 20px rgb(0 0 0 / 5%),
              10px 10px 20px rgb(0 0 0 / 15%);
  transition: all ease 0.5s;
  transform: translateX(${(props) => props.show ? '0' : '200%'});
  opacity: ${(props) => props.show ? '1' : '0'};
  z-index: 1;

  @media (max-width: 380px) {
    display: ${(props) => props.show ? 'block' : 'none'};
    position: initial;
    width: 100%;
    border-radius: 0;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MenuItem = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #515151;
  padding: 10px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: #eaeaea;
    border-radius: 6px;
  }
`;

