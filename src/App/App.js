import React, { Component } from 'react';
import SimpleUploader from '../SimpleUploader/SimpleUploader';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import './App.css';

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <div className='header'>
          <h1>Weekend Spike - React File Upload</h1>
        </div>
        <div className='uploaderDiv'>
          <SimpleUploader />
          <ImageDisplay />
        </div>
      </div>
    );
  }
}
export default App;
