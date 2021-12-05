import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  // This is an error function that takes in an event
  onFileChange = event => {
    // set the state to select the first file 
    this.setState({ selectedFile: event.target.files[0] });
  }

  // This is also an error function that doesnt take an event
  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile, // File content
      this.state.selectedFile.name // Name of the File
    )
    /** Call API to upload file
     * Set selected file back to null b/c we already uploaded it
     * Then set fileUploadedSuccessfully equal to true
    */
    axios.post("https://jwxdz7o9ia.execute-api.us-east-1.amazonaws.com/prod/file-upload", formData).then(() => {
      this.setState({ selectedFile: null })
      this.setState({ fileUploadedSuccessfully: true })
    })
  }

  fileData = () => {
    // Check if we already have a file selected, if so show details of file
    if (this.state.selectedFile) {
      // Show details of file that is selected to upload
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Name: {this.state.selectedFile.type}</p>
          <p>Last Modified: {" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      // If file is uploaded successfully, return a message to user
      return (
        <div>
          <br />
          <h4>Your File has been successfully uploaded</h4>
        </div>
      );
    } else {
      // if user has not selected anything or uploaded anything
      return (
        <div>
          <br />
          <h4>Please choose a file and select the Upload button</h4>
        </div>
      );
    }

  }

  render() {
    return (
      // ClassName to apply css to div
      < div className="main-container" >
        <h2>Salt N' Peppa File Upload System</h2>
        <h3>File Upload with React and develop a Serverless API on AWS</h3>
        <div>
          {/** Where we handle the file upload, and button for uploading to S3 Bucket */}
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload} >
            Upload
          </button>

        </div>
        {/** This will display the file details */}
        {this.fileData()}
      </div >
    );
  }
}


export default App;
