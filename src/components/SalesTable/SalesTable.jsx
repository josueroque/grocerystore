import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SalesTable = ({ rows = [], total, savings }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: 600, align: "center", marginLeft: "25%" }}
      className='SalesTableContainer'
    >
      <Table aria-label='simple table' className='SalesTable'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Item</TableCell>
            <TableCell align='left'>Quantity</TableCell>
            <TableCell align='left'>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0
            ? rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align='left'>{row.productName}</TableCell>
                  <TableCell align='left'>{row.quantity}</TableCell>
                  <TableCell align='left'>{row.price}</TableCell>
                </TableRow>
              ))
            : ""}
          <TableRow>
            <TableCell colSpan={2}> Total price: </TableCell>
            <TableCell align='left'>{total.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}> You saved: </TableCell>
            <TableCell align='left'>{savings ? savings : 0}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
