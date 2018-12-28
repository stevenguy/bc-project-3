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

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class Upload extends Component {

    constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);

    this.handleClick = this.handleClick.bind(this)
    }

    state = {
        csv: [ null, null, null, null ],
        nameOption: [ null, null, null, null ],
        length: 0,
        current: -1,
        uploaded: 0
    }
    
    updateData(result) {
        var _csv = this.state.csv

        if(this.state.current === -1 && this.state.length !== 3){
            var i;
            for(i = 0 ; i < _csv.length; i++){
                if(_csv[i] === null){
                    _csv[i] = JSON.stringify(result.data)
                    break
                }
            }
        }else{
            _csv[this.state.current] = JSON.stringify(result.data)
        }

        var _length = this.state.length + 1
        this.setState({csv: _csv, length: _length});;
        console.log(this.state)
    }

    handleFiles = (files, isDropped) => {
        // console.log(files.fileList[0])
        // console.log(files.base64)
        // console.log(files.fileList[0].name)
        var file;
        console.log('this.state.current = ' + this.state.current)
        isDropped === 1 ? file = files : file = files.fileList[0]

        Papa.parse(file, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });

        var _nameOption = this.state.nameOption
        if(isDropped === 1 && this.state.length !== 3){
            var i;
            for(i = 0 ; i < _nameOption.length; i++){
                if(_nameOption[i] === null){
                    _nameOption[i] = file.name
                    break
                }
            }
        }else{
            _nameOption[this.state.current] = file.name
        }

        this.setState({nameOption: _nameOption})
      }      

      handleClick = (e, i) => {
          console.log('fgrvajekkebkrehkaejhrakhjarekhjarek')
          console.log(i)
          this.setState({current: i})
      }

      onDrop = (acceptedFiles, rejectedFiles) => {
        this.handleClick(null, -1)
        console.log(acceptedFiles)
        if(this.state.length === 3){
            alert('You already reached maximum (4) uploads.')
        }else{
            var i
            for(i = 0 ; i < acceptedFiles.length; i++){
                console.log(acceptedFiles[i])
                this.handleFiles(acceptedFiles[i], 1)
            };
        }
      }

      UploadButton = _ => {
        if(this.state.length === 0){
            alert('You have not selected any CSV files to Upload.')
        }else{
            console.log('here')
            var i;
            for(i = 0 ; i < this.state.csv.length ; i++){
                if(this.state.csv[i] !== null){
                    console.log(`this.state[${i}] ` + this.state.csv[i])
                    API.buntest({data: this.state.csv[i], name: 'Bunrith Buth'})
                }
            }
        }
      }

    render() {
        
        return (
            <React.Fragment>
            <ResponsiveDrawer />
            <div style={{ flexGrow: 1 }}>
                <a style={{margin: '80px', display: 'block'}}/>
                <Grid   container 
                        direction="column"
                        justify="center"
                        style={{padding: '10px'}}>
                        <Paper>
                        <Grid item xs={12} sm={12}> <h2 style={{textAlign: 'center',paddingTop: '10px'}}>Drag & Drop</h2></Grid>
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
                                            <p>Drop files here...</p> :
                                            <p>Drag in files or Click to Upload. (4 CSV file limit)</p>
                                        }
                                        </div> )
                                    }}
                                </Dropzone>
                                            
                            </Grid>
                        </Paper>
                </Grid>
                {
                    [1,2,3,4].map((item, i) => {
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
                                                <h5 style={{padding: '10px', fontWeight: 400}}>Select</h5>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <ReactFileReader fileTypes={[".csv"]} base64={true} multipleFiles={false} data={i} ref={this.setCurrent} handleFiles={this.handleFiles.bind(this)}>
                                                    <TextField
                                                        id="outlined-full-width"
                                                        label={varFile}
                                                        placeholder="your_csv_file.csv"
                                                        //helperText="Full width!"
                                                        fullWidth
                                                        margin="normal"
                                                        variant="outlined"
                                                        data={i}
                                                        onClick={(e) => this.handleClick(e, i) }
                                                        InputLabelProps={{ shrink: true }}
                                                        value={(this.state.nameOption === null || this.state.nameOption === '' ) ? '' : this.state.nameOption[i]}
                                                        style={{padding: '10px' }}
                                                    />
                                                </ReactFileReader>
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
                                <h5 style={{padding: '10px', fontWeight: 400}}>Upload</h5>
                            </Grid>
                            <Grid item xs={6} sm={9}  style={{padding: '10px'}}>
                                {this.state.uploaded === 0 ? (
                                <Button variant="contained" color="primary" onClick={ this.UploadButton } style={{width:'100%'}}>
                                    Upload
                                    <CloudUploadIcon/>
                                </Button>) : <h2 color="success">CSV Uploaded!</h2>}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
            <Footer /> d
        </React.Fragment>
        )
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Upload);