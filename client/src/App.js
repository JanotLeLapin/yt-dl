import React from 'react';
import axios from 'axios';

import './App.css';

import Video from './Video';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            videos: [],
            query: '',
        };
        this.load = this.load.bind(this);
    }

    load () {
        axios.post('api/search/', {
            query: this.state.query,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => this.setState({
                videos: res.data.videos,
            }))
            .catch(err => console.error(err.response));
    }

    render () {
        return (
            <div className="App">
                <div className="Search">
                    <h1>YTDL</h1>
                    <div className="Bar">
                        <input type="text" onChange={evt => this.setState({ query: evt.target.value })}></input>
                        <button onClick={() => this.load()} className="Load">Search</button>
                    </div>
                </div>
                <div className="Videos">
                    {this.state.videos.map(video => <Video title={video.title} author={video.author.name} url={video.url} image={video.image} id={video.videoId} key={video.videoId} />)}
                </div>
            </div>
        )
    }
}

export default App;
