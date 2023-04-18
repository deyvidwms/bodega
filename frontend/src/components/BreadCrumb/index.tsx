import React from 'react';

import { Container } from './styles';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

const BreadCrumb: React.FC<{caminhos: {[key: string]: any}}> = ({caminhos}) => {
  console.log(caminhos)
  return (
    <Container>
      { caminhos.map( (element: {[key: string]: any}, index: number) => (
        <div key={element.name}>
          <Link 
            to={element.link}
          >{element.name}</Link>
          {
            index < caminhos.length-1 &&
            <FaAngleRight />
          }
        </div>
      )) }
    </Container>
  );
}

export default BreadCrumb;