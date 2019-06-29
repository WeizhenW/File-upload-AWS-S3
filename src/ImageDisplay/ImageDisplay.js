import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageDisplay extends Component {


    render() {
        return(
            <div>
                <h3>Image Uploaded</h3>
                
                <div className='images'>
                    <ul>                    
                        {this.props.reduxState.s3UrlReducer.map(url => <li><a href={url}>Click to view photo</a></li>)}
                    </ul>
                </div>
            </div>



        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
  })
  export default connect(mapReduxStateToProps)(ImageDisplay);
  