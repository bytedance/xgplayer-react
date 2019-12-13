import React, { Component } from 'react';
import ReactXgplayer from './xgplayer-react';
import './App.css';

let configMp4 = {
  id: 'vs1',
  url: '/xgplayer-demo.mp4'
};
let Mp4Player = null;

let configFlv = {
  id: 'vs2',
  url: '//s3.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.1/byte-player.flv'
};
let FlvPlayer = null;

let configHls = {
  id: 'vs3',
  url: '//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.1/stream.m3u8'
};
let HlsPlayer = null;

let rootStyle = {
  backgroundColor: 'rgba(0,0,0,0.87)'
};

class App extends Component {

  readyHandle(){
    console.log('Player ready!')
  }

  completeHandle(){
    console.log('Player complete!')
  }

  destroyHandle(){
    console.log('Player destroy!')
  }

  render() {
    return (<div className="App">
      <ReactXgplayer rootStyle={rootStyle} config={configMp4} format={'mp4'} playerInit={(player)=>{ Mp4Player = player; }}  readyHandle={ ()=>{ this.readyHandle(); } } completeHandle={ ()=>{ this.completeHandle(); } } destroyHandle={ ()=>{ this.destroyHandle(); } }/>
      <ReactXgplayer rootStyle={rootStyle} config={configHls} format={'hls'} playerInit={(player)=>{ HlsPlayer = player; }}  readyHandle={ ()=>{ this.readyHandle(); } } completeHandle={ ()=>{ this.completeHandle(); } } destroyHandle={ ()=>{ this.destroyHandle(); } }/>
      <ReactXgplayer rootStyle={rootStyle} config={configFlv} format={'flv'} playerInit={(player)=>{ FlvPlayer = player; }}  readyHandle={ ()=>{ this.readyHandle(); } } completeHandle={ ()=>{ this.completeHandle(); } } destroyHandle={ ()=>{ this.destroyHandle(); } }/>
    </div>);
  }
}

export default App;
