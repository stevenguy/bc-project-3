import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ResponsiveDrawer from "../components/ResponsiveDrawer"
import Footer from "../components/Footer"
import grey from '@material-ui/core/colors/grey'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import API from '../utils/API'
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Journals from '../components/Journals'
import Notifications from "../components/Notifications"

const drawerWidth = 180

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '80px',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  card: {
    minWidth: 275,
  },
})

const journals = [
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Unapproved',
    label: 'Unapproved'
  }
]

class Status extends Component {
  state = {
    journals: 'Select',
    journalData: [],
  }

  componentDidMount() {
    API.getJournals('Pending')
      .then(res => {
        res.data.map((data) => {
          data.transaction.map((data) => {
            data.date = new Date(data.date)
            data.prepared_date = new Date(data.prepared_date)
<<<<<<< HEAD
            data.approved_date = new Date(data.approved_date)
=======
>>>>>>> 06bdfd54ee678dde169e6011424d144b2a5814fd
          })
        })
        this.setState({ journalData: res.data })
      })
      .catch(e => console.log(e))
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  handleJournals = fin => event => {
    this.setState({
      [fin]: event.target.value,
    })
    API.getJournals(event.target.value)
      .then(res => {
        res.data.map((data) => {
          data.transaction.map((data) => {
            data.date = new Date(data.date)
          })
        })
        this.setState({ journalData: res.data })
      })
      .catch(e => console.log(e))
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Notifications />
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Paper className="row">
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="journals"
                select
                label="Journal Status"
                className={classes.textField}
                value={this.state.journals === 'Select' ? 'Pending' : this.state.journals}
                onChange={this.handleJournals('journals')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Journal Status"
                margin="normal"
                variant="outlined"
              >
                {journals.map(j => (
                  <option key={j.value} value={j.value}>
                    {j.label}
                  </option>
                ))}
              </TextField>
            </form>
          </Paper>
          <div style={{ height: 10 }}></div>
          <Paper>
            {this.state.journalData.map((output, j) => (
              <React.Fragment key={j}>
                    <Card>
                    <Journals
                      output={output}
                      />
                  </Card>
                  <Divider light />
              </React.Fragment>
            ))}
          </Paper>
        </main>
        <Footer />
      </React.Fragment>
          )
        }
      }

Status.propTypes = {
            classes: PropTypes.object.isRequired,
      }
      
export default withStyles(styles)(Status)