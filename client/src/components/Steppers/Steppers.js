import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {AccountForm, EntriesForm} from "../AccountForm";


const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select the account', 'New entries', 'Submit for an approval'];
}

class Steppers extends React.Component {
  state = {
    activeStep: 0,
    isError: false,
    index: null,
  };

    isStepFailed = (step) => {
        return step === this.state.index;
    };


  handleNext = () => {
    if(this.props.isNew) {
        if (this.props.newAccount.name && this.props.newAccount.number && this.props.newAccount.type) {
            this.setState({activeStep: this.state.activeStep + 1, isError: false, index: null})
        }
        else {
            this.setState({isError: true, index: this.state.activeStep})
        } 
    } else {
        if (this.props.account.name) {
            this.setState({activeStep: this.state.activeStep + 1, isError: false, index: null})
        }
        else {
            this.setState({isError: true, index: this.state.activeStep})
        } 
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
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
      return <AccountForm newAccount={this.props.newAccount} checkNew={this.props.checkNew} isNew={this.props.isNew} account= {this.props.account} accounts= {this.props.accounts} storeAccount= {this.props.storeAccount} />
    case 1:
      return <EntriesForm />
    case 2:
      return 'Verify and submit for an approval';
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
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Submitted!</Typography>
              <Button onClick={this.handleReset}>Input another entry</Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Steppers.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Steppers);
