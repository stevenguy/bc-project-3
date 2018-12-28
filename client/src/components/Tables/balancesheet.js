<Paper>
          <Table>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {this.state.transactions.map((output, i) => {
                // let sumyearTransactions = {}
                // if(i.year === 2018 && i.quarter === 3 && i.month === 9){
                //   sumyearTransactions[i.description] = 0;
                // }
                // sumyearTransactions[i.description] += i.amount;
                // console.log(sumyearTransactions)
                
                return (
                  <TableRow key={i}>
                    <TableCell>{output._id.description}</TableCell>
                    {/* <TableCell>{output._id.type}</TableCell>
                    <TableCell>{output._id.year}</TableCell>
                    <TableCell>{output._id.quarter}</TableCell>
                    <TableCell>{output._id.month}</TableCell> */}
                    <TableCell align="right">{ccyFormat(output.amount)}</TableCell>
                  </TableRow>
                  // <TableRow>
                  // <TableCell rowSpan={3} />
                  // <TableCell colSpan={2}>Total</TableCell>
                  // <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  // </TableRow>
                );  
              })}
              {/* <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>

        </Paper>