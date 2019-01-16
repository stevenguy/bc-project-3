import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from "../components/ResponsiveDrawer"
import Footer from "../components/Footer"
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import grey from '@material-ui/core/colors/grey'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import API from '../utils/API'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Journals from '../components/Journals'

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
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.white,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '20px',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const journals = [
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Unapproved',
    label: 'Unapproved'
  },
  {
    value: 'Pending',
    label: 'Pending'
  }
]

class Status extends Component {
  state = {
    journals: 'Select',
    journalData: [],
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
                value={this.state.journals}
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