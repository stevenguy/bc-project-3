import React from "react";

export function Table (props) {

  return (
    
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>

    </Paper>
  );
}

export function Row (props) {

  return ( 

  <TableRow>
    <TableCell></TableCell>
  </TableRow>

  )
}

export function Total (props) {

  return ( 

    <TableRow>
      <TableCell rowSpan={3} />
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
    
  )
}