import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';

import { Container, ActionIcon } from './styles';

import { FaPencilAlt, FaTrash, FaWhatsapp } from 'react-icons/fa';
import { ContatoCliente } from '../../interfaces/ContatoCliente';
import ContatoClienteBodega from '../ContatoCliente/ContatoClienteBodega';

type Props = {
  header: string[];
  rowsField: string[];
  rows: { [key: string]: any }[];
  tableItemName: string;
  handleEdit: null | ((id: number) => void);
  handleDelete: (id: number) => void;
}

const TableElement: React.FC<Props> = ({ header, rowsField, rows, tableItemName, handleEdit, handleDelete }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const contatoCliente: ContatoCliente = new ContatoClienteBodega(); 

  const renderBotaoContato: (row: {[key: string]: any}) => JSX.Element = (row) => { 
    return contatoCliente.render(row);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                header.map(element => element.indexOf('link') === -1 ?
                  <TableCell key={element} sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{element}</TableCell> :
                  <TableCell key={element}></TableCell>
                )
              }
              <TableCell align='right' sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length === 0 &&
              <TableRow key={1}>
                <TableCell key={1} component="th" colSpan={4} scope="row">
                  <p>Nenhuma informação encontrada</p>
                </TableCell>
              </TableRow>
            }
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(
              (row, index) => (
                <TableRow key={index}>
                  {
                    rowsField.map((element: string, index: number) =>
                      <TableCell key={index} component="th" scope="row">{element.indexOf('saldo') > -1 ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(row[element])) : row[element]}</TableCell>
                    )
                  }
                  <TableCell component="th" scope="row" align='right'>
                    {
                      tableItemName === 'Clientes' &&
                      renderBotaoContato(row)
                    }
                    {
                      (handleEdit !== null)
                      && <ActionIcon background='#ffb703' onClick={() => handleEdit(row.id)}>
                        <FaPencilAlt />
                      </ActionIcon>
                    }

                    <ActionIcon background='#da4d4d' onClick={() => handleDelete(row.id)} >
                      <FaTrash />
                    </ActionIcon>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={`${tableItemName} por página`}
                SelectProps={{
                  inputProps: {
                    'aria-label': `${tableItemName} por página`,
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TableElement;