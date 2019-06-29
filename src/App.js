import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
    state = {
      success : false,
      url : "",
    }

    componentDidMount() {
      axios.get('/api/s3')
      .then(
        (response) => {
          console.log('in get request', response);
        }
      ) 
    }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }
  // Perform the upload
  handleUpload = (ev) => {
    // console.log(this.uploadInput.files);
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload", fileName, fileType);
    axios.post('/api/s3',{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      console.log('in response');
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Received a signed request " + signedRequest);
      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("error with put " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default App;
