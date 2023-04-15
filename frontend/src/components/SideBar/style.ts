import styled from 'styled-components';

export const Container = styled.div`
  max-width: 250px;
  height: calc(100vh - 70px);
  border-right: 1px solid #CCC;
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
`;

export const Option = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #515151;
  padding: 10px;
  transition: all ease 0.3s;
  cursor: pointer;
`;

export const OptionList = styled.div<{show?: boolean}>`
  padding: 5px 15px;
  cursor: pointer;

  

  ${OptionTitle} {
    background-color: ${(props) => props.show ? '#eaeaea' : '#fff'};
  }

  ${Option} {
    display: ${(props) => props.show ? 'block' : 'none'};
  }
`;
