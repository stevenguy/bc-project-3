import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Financials extends React.Component {

  render() {
     console.log(this.props)
     
    return (
      <form className="container" noValidate autoComplete="off">
      
        <TextField
          id="financials"
          select
          label="Financial Report"
          className="textField"
          value={this.props.financials}
          onChange={this.props.handleFinancials('financials')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Financial Report Selection"
          margin="normal"
          variant="outlined"
        >
          {this.props.financials.map(f => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="accounts"
          select
          label="Account"
          className="textField"
          value={this.props.accounts}
          onChange={this.props.handleAccounts('accounts')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Account Selection"
          margin="normal"
          variant="outlined"
        >
          {this.props.accounts.map(i => (
            <option key={i._id.account} value={i._id.account}>
              {i._id.description}
            </option>
          ))}
        </TextField>
        <TextField
          id="year"
          select
          label="Year"
          className="textField"
          value={this.props.year}
          onChange={this.props.handleYear('year')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Year Selection"
          margin="normal"
          variant="outlined"
        >
          {this.props.year.map(y => (
            <option key={y._id.year} value={y._id.year}>
              {y._id.year}
            </option>
          ))}
        </TextField>
        <TextField
          id="quarter"
          select
          label="Quarter"
          className="textField"
          value={this.props.quarter}
          onChange={this.props.handleQuarter('quarter')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Quarter Selection"
          margin="normal"
          variant="outlined"
        >
          {this.props.quarter.map(q => (
            <option key={q.value} value={q.value}>
              {q.label}
              </option>
          ))}
        </TextField>
        <TextField
          id="month"
          select
          label="Month"
          className="textField"
          value={this.props.month}
          onChange={this.props.handleMonth('month')}
          SelectProps={{
            MenuProps: {
              className: this.props.classes.menu,
            },
          }}
          helperText="Month Selection"
          margin="normal"
          variant="outlined"
        >
          {this.props.month.map(m => (
            <option key={m.valueMonth} value={m.valueMonth}>
              {m.labelMonth}
            </option>
          ))}
        </TextField>
        <Button variant="contained" color="default" className={this.props.classes.button}>
          Run
        </Button>
      </form>
    );
  }
}