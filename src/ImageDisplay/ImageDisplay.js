import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageDisplay extends Component {
    componentDidMount() {
        console.log('in component did mount');
        this.props.dispatch({type: 'FETCH_URL'});
    }

    render() {
        return(
            <div>
                <h3>Files Uploaded</h3>
                <pre>
                    {JSON.stringify(this.props.reduxState.s3UrlReducer, null, 2)}
                </pre>
                <div className='images'>
                    <ul>                    
                        {this.props.reduxState.s3UrlReducer.map(image => <li key={image.id}><a href={image.url}>Click to view photo</a></li>)}
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
  