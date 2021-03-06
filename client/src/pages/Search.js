import React, { Component } from "react";
import API from "../utils/API";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from '../components/Cards/searchCard'
import Notifications from "../components/Notifications"
import ReactDOM from 'react-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'


const drawerWidth = 180;
const user = JSON.parse(localStorage.getItem('user'))
const styles = theme => ({
  //Style goes here
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '80px',
  },

  // my styles
  root: {
    height: 250,
    flexGrow: 1,
    marginLeft: '100px',
    marginRight: '100px',
    position: 'relative',
    top: '200px',
  },
  container: {
    flex: 1
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    width: '50%'
    // left: 0,
    // right: 0,
    
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
    justifyContent: 'center',
    flexDirection: 'column'
  },

  boot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  toot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    // marginLeft: '100px',
    // marginRight: '100px'
  },
  simpleCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  domCard: {
    marginTop: '20px'
  }

});

let suggestions = ''


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
  const matches = match(suggestion._id.label, query);
  const parts = parse(suggestion._id.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 600 }}>
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
        if (suggestion._id.label !== null) {
          const keep =
            count < 5 && suggestion._id.label.slice(0, inputLength).toLowerCase() === inputValue;
  
          if (keep) {
            count += 1;
          }
          return keep;
        }
      });
}

function getSuggestionValue(suggestion) {
  return suggestion._id.label;
}



class Search extends Component {
    state = {
      //State goes here
    single: '',
    popper: '',
    suggestions: [],
    viewCard: false,
    searchData: [],
    category: 30,
    labelWidth: 0,


    journals: 'Select',
    journalData: [],
    hideApprove: false,
    hideUnapprove: false,
    disableApprove: false,
    disableUnapprove: false,
    }

    componentWillMount() {
      API.journalIdAutofill()
        .then(r => {
            suggestions = r.data
          })
    }
    
    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });
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
  
    handleAutoChange = name => (event, { newValue }) => {
      this.setState({
        [name]: newValue,
      });
    };

    handleApprove = journal => {
      API.approveJournal({ journalId: journal, user: user.name })
        .then(() => {
          this.setState({ disableApprove: true })
          API.notification(user.name + " Approved A Journal!")
        }) 
    }
  
    handleUnapprove = journal => {
      API.unapproveJournal({ journalId: journal, user: user.name })
        .then(() => {
          this.setState({ disableUnapprove: true })
        })
    }
  
    selectChanger = () => {
      if(this.state.category === 20){
        API.preparerAutofill()
          .then(r => {
            suggestions = r.data
          })
      }
      else if(this.state.category === 30) {
        API.journalIdAutofill()
        .then(r => {
            suggestions = r.data
          })
      }
      else if(this.state.category === 10){
        API.approverAutofill()
        .then(r => {
            suggestions = r.data
          })
      }
    }

    handleSelectChange = event => {
      this.setState({ [event.target.name]: event.target.value })
      this.setState({viewCard: false})
      this.setState({single: ""})
    };

    searchItem = () => {
      switch (this.state.category){
        case 10: {
          API.getApproverJournals(this.state.single)
            .then (r => {
              r.data.map((data) => {
                data.transaction.map((data) => {
                  data.date = new Date(data.date)
                  data.prepared_date = new Date(data.prepared_date)
                  data.approved_date = new Date(data.approved_date)
                })
              })
              this.setState({searchData: r.data})
              // console.log(this.state.searchData)
              this.setState({viewCard: true})
              console.log(r.data)
            })
        }
        break
        case 20: {
          API.getPreparerJournals(this.state.single)
            .then (r => {
              r.data.map((data) => {
                data.transaction.map((data) => {
                  data.date = new Date(data.date)
                  data.prepared_date = new Date(data.prepared_date)
                  data.approved_date = new Date(data.approved_date)
                })
              })
              this.setState({searchData: r.data})
              this.setState({viewCard: true})
            })
        }
        break 
        case 30: {
          API.searchTransaction(this.state.single)
            .then (r => {
              r.data.map(data =>{
                data.date = new Date(data.date)
                data.prepared_date = new Date(data.prepared_date)
                data.approved_date = new Date(data.approved_date)
              })
              this.setState({searchData: r.data})
              this.setState({viewCard: true})
            })
        }
        break
        default: console.log('please select a category!')
      }
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

      // Calling selectChanger function here because view re-renders immediately after state.category is changed 
      this.selectChanger()

      return (
        <React.Fragment>
        <Notifications />
        <ResponsiveDrawer />

        <main className = {classes.content}>
          <div className={classes.toolbar} />
            {/* <div className={classes.root}> */}
            
            <Paper className={classes.toot} elevation={1}>
            <Grid container spacing={8} alignItems= 'flex-end'>
{/* SELECT CODE  */}

            <Grid item lg ={3} >
            <form className={classes.boot} autoComplete="off">
              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => {this.InputLabelRef = ref}}
                    htmlFor="outlined-category-simple"
                  >
                  Search By:
                  </InputLabel>
                  <Select
                    value={this.state.category}
                    onChange={this.handleSelectChange}
                    input={
                      <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="category"
                      id="outlined-category-simple"
                      />
                      }
                    >
                    <MenuItem value={10}>Approver</MenuItem>
                    <MenuItem value={20}>Preparer</MenuItem>
                    <MenuItem value={30}>Journal ID</MenuItem>
                  </Select>
                </FormControl>
              </form>
              </Grid>
{/* AUTOSUGGEST CODE  */}

              <Grid item lg ={6}>  
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  placeholder: 'Type your search input here!',
                  value: this.state.single,
                  onChange: this.handleAutoChange('single'),
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square> {options.children} </Paper>
                )}
              />
              </Grid>
              <Grid item lg ={3}>  
              <Button variant= 'contained' color= 'primary' onClick = {this.searchItem} >Submit</Button>
              </Grid>
          </Grid>
          </Paper>
              <div className={classes.carduh}> {
                this.state.category === 30 && this.state.viewCard === true ? 
                <Paper className = {classes.domCard}>                
                {this.state.searchData.map (item => 
                <div className={classes.simpleCard}>
                  {this.state.viewCard ? <SimpleCard info = {item} cat = {this.state.category} />: null}
                </div>
                )}
                {
                this.state.searchData[0].status === 'Pending' && !this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button onClick={() => {
                this.handleApprove(this.state.searchData[0].journal_id)
              }} 
              variant="contained" className={classes.button}>
                Approve
                </Button>
                      : this.state.searchData[0].status === 'Pending' && this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Approved!
                </Button>
              : ''
              }
              {
                this.state.searchData[0].status === 'Pending' && !this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button onClick={() => {
                this.handleUnapprove(this.state.searchData[0].journal_id)
              }} 
              variant="contained" className={classes.button}>
                Unapprove
                </Button>
                      : this.state.searchData[0].status === 'Pending' && this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Unapproved!
                </Button>
              : ''
              }
                </Paper>
                :
                this.state.viewCard === true ? this.state.searchData.map(item => 
                  <Paper className = {classes.domCard}>
                    {item.transaction.map(item => 
                      <div className={classes.simpleCard}>
                        <SimpleCard info = {item} cat = {this.state.category} />
                      </div>
                    )}
                     {
                item.transaction[0].status === 'Pending' && !this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button onClick={() => {
                this.handleApprove(item._id)
              }} 
              variant="contained" className={classes.button}>
                Approve
                </Button>
                      : item.transaction[0].status === 'Pending' && this.state.disableApprove && !this.state.disableUnapprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Approved!
                </Button>
              : ''
              }
              {
                item.transaction[0].status === 'Pending' && !this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button onClick={() => {
                this.handleUnapprove(item._id)
              }} 
              variant="contained" className={classes.button}>
                Unapprove
                </Button>
                      : item.transaction[0].status === 'Pending' && this.state.disableUnapprove && !this.state.disableApprove && user.role.toLowerCase() === 'manager'
              ? <Button disabled variant="contained" className={classes.button}>
                Unapproved!
                </Button>
              : ''
              }
                  </Paper>
                )
                : null
                // this.state.searchData.map (item => 
                //   <div className={classes.simpleCard}>
                //     {this.state.viewCard ? <SimpleCard info = {item} cat = {this.state.category} />: null}
                //   </div>
                //   )
              } 
              </div>
          {/* </div> */}
         
      </main>
      <Footer />
      </React.Fragment>
          );
        }
      }

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);