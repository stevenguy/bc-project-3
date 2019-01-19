import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {EntriesForm, SubmitForm} from "../AccountForm";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  space: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing.unit
  },
  chip: {
    margin: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  }
});

function getSteps() {
  return ['New entries', 'Submit for an approval'];
}

class Steppers extends React.Component {
  state = {
    activeStep: 0,
    isError: false,
    index: null,
    errorMsg: ''
  };

    isStepFailed = (step) => {
        return step === this.state.index;
    };


  handleNext = (event) => {
    event.preventDefault()

    if (this.state.activeStep === 1) {
        let total = 0
        this.props.entries.map((entry) => {
          entry.details === "Debit" ? total += parseFloat(entry.amount) : total -= parseFloat(entry.amount)
        })
        if (total === 0) {
          this.props.submitForm()
          this.setState({activeStep: this.state.activeStep + 1, isError: false, index: null})
        } else {
          this.setState({isError: true, index: this.state.activeStep, errorMsg: "Unbalanced Journal, Please review."})
        }
    } else {
        if (this.props.entries.every(entry => entry.account._id !== '')) {
          this.props.entries.length >1 &&
          this.props.entries.every(entry => entry.description !== '' && entry.amount !== ''  && entry.details !== '')
          ? this.setState({activeStep: this.state.activeStep + 1, isError: false, index: null, errorMsg: ""})
          : this.setState({isError: true, index: this.state.activeStep, errorMsg: 'Please fill out all required fields.'})
        } else {
          this.setState({isError: true, index: this.state.activeStep, errorMsg: 'Please click on create button first'})
        }
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1, errorMsg: "", isError: false, index: null
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStepContent = (stepIndex) => {  
  switch (stepIndex) {
    case 0:
      return <EntriesForm 
      entries={this.props.entries} 
      newAccount={this.props.newAccount} 
      accounts= {this.props.accounts} 
      handleChange={this.props.handleChange} 
      handleAdd={this.props.handleAdd} 
      handleRemove={this.props.handleRemove}
      selectedDate={this.props.selectedDate}
      handleDateChange={this.props.handleDateChange}
      createAccount={this.props.createAccount}
      handleAccountChange={this.props.handleAccountChange}
      />
    case 1:
      return <SubmitForm
      entries={this.props.entries} 
      newAccount={this.props.newAccount} 
      isNew={this.props.isNew} 
      account= {this.props.account} 
      accounts= {this.props.accounts} 
      />;
    default:
      return 'Uknown stepIndex';
  }
}

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const labelProps = {};
              if (this.isStepFailed(index)) {
                  labelProps.error = true;
                }
              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>
        <React.Fragment>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Journal has been submitted!</Typography>
              <Button className={classes.root} onClick={this.handleReset}>Input another journal</Button>
            </div>
          ) : (
            <form className={classes.instructions} id='form1' onSubmit={this.handleNext}>
              {this.getStepContent(activeStep)}
              <div className={classes.root}>
              {this.props.entries.length < 2 
              ? <Chip
              icon={<ErrorIcon />}
              label="Minimum of 2 entries"
              className={classes.chip}
              color="secondary"
              variant="outlined"
              /> 
              : null
              }
              {this.state.errorMsg 
                ? <Chip
                icon={<ErrorIcon />}
                label={this.state.errorMsg}
                className={classes.chip}
                color="secondary"
                variant="outlined"
                /> 
                : null
                }
              </div>
              <div className={classes.space}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                
                <Button variant="contained" type='submit' form='form1' color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </form>
          )}
        </React.Fragment>
      </div>
    );
  }
}

Steppers.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Steppers);
