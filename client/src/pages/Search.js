import React, { Component } from "react";
import API from "../utils/API";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"

// import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from '../components/Cards/searchCard'
import { red } from "@material-ui/core/colors";

const drawerWidth = 180;

const styles = theme => ({
  //Style goes here
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },

  // my styles
  root: {
    height: 250,
    flexGrow: 1,
    // marginTop: '300px',
    marginLeft: '200px',
    marginRight: '200px',
    position: 'relative',
    top: '200px',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  carduh: {
    display: 'flex',
    justifyContent: 'center'
  }

});

// let suggestions = [
//   { label: 'Afghanistan' },
//   { label: 'Aland Islands' },
//   { label: 'Albania' },
//   { label: 'Algeria' },
//   { label: 'American Samoa' },
//   { label: 'Andorra' },
//   { label: 'Angola' },
//   { label: 'Anguilla' },
//   { label: 'Antarctica' },
//   { label: 'Antigua and Barbuda' },
//   { label: 'Argentina' },
//   { label: 'Armenia' },
//   { label: 'Aruba' },
//   { label: 'Australia' },
//   { label: 'Austria' },
//   { label: 'Azerbaijan' },
//   { label: 'Bahamas' },
//   { label: 'Bahrain' },
//   { label: 'Bangladesh' },
//   { label: 'Barbados' },
//   { label: 'Belarus' },
//   { label: 'Belgium' },
//   { label: 'Belize' },
//   { label: 'Benin' },
//   { label: 'Bermuda' },
//   { label: 'Bhutan' },
//   { label: 'Bolivia, Plurinational State of' },
//   { label: 'Bonaire, Sint Eustatius and Saba' },
//   { label: 'Bosnia and Herzegovina' },
//   { label: 'Botswana' },
//   { label: 'Bouvet Island' },
//   { label: 'Brazil' },
//   { label: 'British Indian Ocean Territory' },
//   { label: 'Brunei Darussalam' },
//   { label: 'Zimbabwe'},
// ];

let suggestions = ''
// let names = ''


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.preparer, query);
  const parts = parse(suggestion.preparer, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.preparer.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.preparer;
}


class Search extends Component {
    state = {
      //State goes here
    single: '',
    popper: '',
    suggestions: [],
    viewCard: false,
    searchData: {}
    }
    
    componentWillMount = () => {
      console.log('hey its working')
      API.getTransactions()
        .then(r => {
          suggestions = r.data
        })
        .then(r => console.log(suggestions))
      // API.preparer()
      //   .then(r => {
      //     console.log(r.data)
      //   })
    }
    
    
    handleSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value),
      });
    };
  
    handleSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };
  
    handleChange = name => (event, { newValue }) => {
      this.setState({
        [name]: newValue,
      });
      console.log('hello')
    };

    searchItem = () => {
      API.getTransaction(this.state.single)
        // .then (r => console.log(r.data))
        // .then (r => JSON.stringify(r))
        .then (r => {
          this.setState({searchData: r.data})
        })
        
      // Above code recieves request data and sends to state as an object
      this.setState({viewCard: true})
      // console.log(this.state.viewCard)
    }

    render() {
      const { classes } = this.props;

      const autosuggestProps = {
        renderInputComponent,
        suggestions: this.state.suggestions,
        onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
      };

      let isShowing = this.state.viewCard
      let button 
      if (isShowing) {
      button = <SimpleCard info= {this.state.searchData} />;
      } else {
        button = ""
      }

      return (
        <React.Fragment>
        <ResponsiveDrawer />
        {/* <h1>This is the search feature</h1> */}
        <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a country (start with a)',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <button onClick = {this.searchItem} >Submit</button>
        <div className={classes.carduh}>
          {button}
        </div>

      </div>

        <Footer />
        </React.Fragment>
          );
        }
      }
Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);