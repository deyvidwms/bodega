import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';

import { Container, ActionIcon } from './styles';

import { FaPencilAlt, FaTrash, FaWhatsapp } from 'react-icons/fa';
import ActionButton from '../ActionButton';

type Props = {
  header: string[];
  rowsField: string[];
  rows: { [key: string]: any }[];
  tableItemName: string;
}

const TableElement: React.FC<Props> = ({ header, rowsField, rows, tableItemName }) => {  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleClickWhatsApp = (number: string) => {
    window.open(`https://api.whatsapp.com/send/?phone=55${number}&text=Olá, bom dia.%0ATemos promoções na nossa Budega.%0AVenha conferir!`)
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
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(
              (row, index) => (
                <TableRow key={index}>
                  { 
                    rowsField.map( 
                      (element: string, index: number) => element.indexOf('link') === -1 ?
                        <TableCell key={index} component="th" scope="row">{row[element]}</TableCell> :
                        <TableCell key={index} component="th" scope="row"></TableCell>
                    )
                  }
                  <TableCell component="th" scope="row" align='right'>
                    {
                      rowsField.indexOf('linkWhatsApp') !== -1 && 
                        <ActionIcon background='#4fce5d' onClick={() => handleClickWhatsApp(row.linkWhatsApp)}>
                          <FaWhatsapp />
                        </ActionIcon>
                    }
                    <ActionIcon background='#ffb703'>
                      <FaPencilAlt />
                    </ActionIcon>
                    <ActionIcon background='#da4d4d'>
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