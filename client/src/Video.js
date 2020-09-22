import React from 'react';

import './Video.css';

class Video extends React.Component {
    download () {
        window.location.replace('http://ytdl-download/api/download/' + this.props.id);
    }

    render () {
        return(
            <div className="Video">
                <img src={this.props.image} alt={this.props.title} className="Image"></img>
                <h3 className="Title">{this.props.title}</h3>
                <h4 className="Author">{this.props.author}</h4>
                <button onClick={() => this.download()} className="Download">Download</button>
            </div>
        )
    }
}

export default Video;