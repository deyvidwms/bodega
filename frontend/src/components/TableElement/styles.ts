import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 20px 0;
  border-radius: 3px;
`;  

export const ActionIcon = styled.button<{background: string}>`
  margin: 0 5px;
  padding: 5px 6px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid #CCC;
  transition: all ease 0.3s;
  cursor: pointer;

  svg {
    margin-top: 2px;
  }

  &:hover {
    background-color: ${(props) => props.background};
    border-color: ${(props) => props.background};
   
    svg {
      fill: #fff;
    }
  }
`;