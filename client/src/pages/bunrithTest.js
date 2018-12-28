import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';

import API from '../utils/API'




class BunrithTest extends Component {

    constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
    }

    state = {
        csv: null
    }
    
    updateData(result) {
        const data = result.data;
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        console.log(data)
        let data2 = JSON.stringify(result.data)
        // let data3 = (data2.toString()).replace('[' , '')
        // data3 = (data3.toString()).replace(']', '')
        this.setState({csv: JSON.stringify(data)}); // or shorter ES syntax: this.setState({ data });
        API.buntest(data2.toString())
    }

    handleFiles = files => {
        console.log(files.fileList[0])
        console.log(files.base64)
        console.log(files.fileList[0].name)

        Papa.parse(files.fileList[0], {
            header: true,
            download: true,
            skipEmptyLines: true,
            // Here this is also available. So we can call our custom class method
            complete: this.updateData
        });
      }      

    render() {
        return (
            <React.Fragment>
                <ReactFileReader fileTypes={[".csv"]} base64={true} multipleFiles={false} handleFiles={this.handleFiles}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                <p className="test">
                    {this.state.csv}
                </p>
            </React.Fragment>
        )
    }
}



export default BunrithTest;
