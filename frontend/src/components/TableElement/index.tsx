import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { Container, ActionIcon } from './styles';

import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type Props = {
  header: string[];
}

function createData(
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [
  createData('Frozen yoghurt', 'Descrição do produto'),
  createData('Ice cream sandwich', 'Descrição do produto'),
  createData('Eclair', 'Descrição do produto'),
  createData('Cupcake', 'Descrição do produto'),
  createData('Gingerbread', 'Descrição do produto'),
];

const TableElement: React.FC<Props> = ({header}) => {
  return (
    <Container>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                header.map(element => <TableCell key={element} sx={{textTransform: 'capitalize', fontWeight: 'bold'}}>{element}</TableCell>)
              }
              <TableCell align='right' sx={{textTransform: 'capitalize', fontWeight: 'bold'}}>ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell component="th" scope="row" align='right'>
                  <ActionIcon background='#ffb703'>
                    <FaPencilAlt />
                  </ActionIcon>
                  <ActionIcon background='#da4d4d'>
                    <FaTrash />
                  </ActionIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TableElement;