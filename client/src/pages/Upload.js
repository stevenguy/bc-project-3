import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';
import Dropzone from 'react-dropzone';
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import API from '../utils/API'
import Footer from "../components/Footer"
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'; 
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Notifications from "../components/Notifications"

const drawerWidth = 180;

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: '80px',
  }
  });

const expectedColumns = ['date','account','description','type','transaction','memo','details','amount']

class Upload extends Component {

    constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);

    // this.handleClick = this.handleClick.bind(this)
    }

    state = {
        csv: null,
        nameOption: null,
        uploaded: 0,
        map: [],
        mapped: [null, null, null, null, null, null, null, null]
    }
    
    updateData(result) {
        console.log(result.data)
        var _map = []
        _map = Object.keys(result.data[0])
        

        if(_map.length === 8){
            this.setState({csv: JSON.stringify(result.data), map: _map})
            console.log(this.state)
        }else{
            alert(`Your CSV file does not contain the right amount of columns. Please revise and try again. \n\n Your Columns: ${_map} \n\n Expected Columns: ${expectedColumns}`)
        }

    }

    handleFiles = (file, isDropped) => {
        //console.log(file[0])
        // console.log(files.base64)
        // console.log(files.fileList[0].name)
        this.setState({
            map: [],
            mapped: [null, null, null, null, null, null, null, null]
        })

        Papa.parse(file[0], {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });

        this.setState({nameOption: file[0].name})
      }      

      onDrop = (acceptedFiles, rejectedFiles) => {
        this.handleFiles(acceptedFiles)
      }

      UploadButton = _ => {
        if(this.state.csv === 0){
            alert('You have not selected any CSV files to Upload.')
        }else if(this.state.map.indexOf(null) > -1){
            alert('Your Columns Do Not match our criteria. please download our template.')
        }else if(this.state.mapped.indexOf(null) > -1){
            alert('You have not finished Mapping')
        }else{
            //start mapping
            let tempCSV = this.state.csv
            this.state.map.forEach((element, i) => {
                console.log(element)
                tempCSV = tempCSV.split(element).join(this.state.mapped[i])
                console.log(tempCSV)
            });
            console.log('here')
            console.log(tempCSV)

            var i;
            for(i = 0 ; i < this.state.csv.length ; i++){
                if(this.state.csv[i] !== null){
                    API.buntest({data: tempCSV, name: JSON.parse(localStorage.getItem('user'))._id})
                }
            }
            this.setState({uploaded: 1})
        }
      }

      handleChange = event => {
          console.log(event.target.value)
          var _mapped = this.state.mapped
          _mapped[event.target.name] = event.target.value
          this.setState({mapped: _mapped})
          console.log(this.state)
      }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
            <Notifications />
            <ResponsiveDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />

                    <Grid   container 
                            direction="column"
                            justify="center"
                            style={{padding: '10px'}}>
                            <Paper>

                            <Grid item xs={12} sm={12}>
                                <Typography style={{paddingLeft: '10px', paddingTop: '5px'}}>
                                    <a>Need a sample CSV to upload your Journal Entries? &nbsp;</a>
                                    <a href={'../../public/'} download="Journal_Entry_Example.csv" style={{textDecoration: 'none'}}>Download CSV Template</a>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}> <Typography style={{fontSize: 24, textAlign: 'center',paddingTop: '10px'}}>Drag & Drop</Typography></Grid>
                                <Grid item xs={12} sm={12} >
                                    
                                    <Dropzone onDrop={this.onDrop}>
                                        {({getRootProps, getInputProps, isDragActive}) => {
                                        return (
                                            <div style={{  margin: '20px', background: 'white', borderRadius: '5px', border: '2px dashed rgb(0, 135, 247)', height: '200px'}}
                                            {...getRootProps()}
                                            >
                                            <input {...getInputProps()} />
                                            {
                                                isDragActive ?
                                                <Typography paragraph>Drop files here...</Typography> :
                                                <Typography paragraph>Drag in CSV file or Click to Upload.</Typography>
                                            }
                                            </div> )
                                        }}
                                    </Dropzone>
                                                
                                </Grid>
                            </Paper>
                    </Grid>
                    {
                        (this.state.map).map((item, i) => {
                            var varFile = 'File ' + item
                            return (
                                <Grid   container 
                                direction="column"
                                justify="center"
                                style={{padding: '10px'}}>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Grid   container
                                                    direction="row"
                                                    alignItems="center"
                                                    justify="center">
                                                <Grid item xs={12} sm={3}>
                                                    <Typography h5 style={{padding: '10px', fontWeight: 400}}>{item}</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={9}>
                                                    <Select
                                                            value={this.state.mapped[i] ? this.state.mapped[i] : 'None'}
                                                            onChange={this.handleChange}
                                                            input={
                                                            <OutlinedInput
                                                                labelWidth={0}
                                                                name={i}
                                                                id="outlined-age-simple"
                                                            />
                                                            }
                                                        >
                                                        <MenuItem value="">
                                                        <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={'date'}>Date</MenuItem>
                                                        <MenuItem value={'account'}>Account</MenuItem>
                                                        <MenuItem value={'description'}>Description</MenuItem>
                                                        <MenuItem value={'type'}>Type</MenuItem>
                                                        <MenuItem value={'transaction'}>Transaction</MenuItem>
                                                        <MenuItem value={'memo'}>Memo</MenuItem>
                                                        <MenuItem value={'details'}>Details</MenuItem>
                                                        <MenuItem value={'amount'}>Amount</MenuItem>
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                    <Grid item xs={12} style={{padding: '10px'}} justify="center">
                        <Paper>
                            <Grid   container
                                    direction="row"
                                    alignItems="center"
                                    justify="center">
                                <Grid item xs={6} sm={3}>
                                    <Typography h5 style={{padding: '10px', fontWeight: 400}}>Upload</Typography>
                                </Grid>
                                <Grid item xs={6} sm={9}  style={{padding: '10px'}}>
                                    {this.state.uploaded === 0 ? (
                                    <Button variant="contained" color="primary" onClick={ this.UploadButton } style={{width:'100%'}}>
                                        Upload 	&nbsp;
                                        <CloudUploadIcon/>
                                    </Button>) : <Typography h5 color="success" style={{alignItems: 'center'}}>CSV Uploaded!</Typography>}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
        </main>
        <Footer /> 
        </React.Fragment>
        )
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Upload);