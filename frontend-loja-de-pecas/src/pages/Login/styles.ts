import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  margin-bottom: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  input {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    width: 100%;
    height: 48px;
    padding: 0 10px;
    border: 1px solid #CCC;
    border-radius: 3px;
    margin-bottom: 16px;
    transition: all ease 0.3s;

    &:focus {
      border-color: #ff8800;
      box-shadow: 0 0 5px #ff8800;
    }
  }

  button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    padding: 14px 25px;
    border: none;
    background-color: #ff8800;
    border-radius: 3px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: all ease 0.3s;

    &:focus,
    &:hover {
      opacity: 0.8;
    }
  }

  a {
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    color: #888;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;

    svg {
      margin-left: 5px;
    }

    &:focus,
    &:hover {
      opacity: 0.5;
    }
  }
`;
