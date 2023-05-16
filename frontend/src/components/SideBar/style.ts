import styled from 'styled-components';

type Props = {
  show: boolean;
}

export const Container = styled.div<Props>`
  max-width: 250px;
  background-color: #FFF;
  height: calc(100vh - 70px);
  border-right: 1px solid #CCC;
  transition: all ease 0.3s;

  @media (max-width: 800px) {
    position: absolute;
    transform: translateX(${(props) => props.show ? '0' : '-100%'});
  }
`;

export const Menu = styled.div`
  width: 250px;
  padding: 50px 0;
`;

export const OptionTitle = styled.div`
  display: flex;
  align-items: center;
  
  border-radius: 3px;

  padding: 10px;

  font-family: 'Roboto', sans-serif;
  font-size: 1rem;

  color: #515151;

  transition: all ease 0.3s;

  &:hover {
    background-color: #eaeaea !important;
  }

  svg {
    margin-right: 15px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const OptionList = styled.div<{show?: boolean}>`
  padding: 5px 15px;
  cursor: pointer;

  ${OptionTitle} {
    background-color: ${(props) => props.show ? '#eaeaea' : '#fff'};
  }
`;
