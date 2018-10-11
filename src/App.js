import React, { Component } from 'react';
import ReactXgplayer from './xgplayer-react';
import './App.css';

let configMp4 = {
  id: 'vs1',
  url: '/video/dash/xgplayer-demo.mp4'
};
let Mp4Player = null;
let rootStyle = {
  backgroundColor: 'rgba(0,0,0,0.87)'
};

let configXgMp4 = {
  id: 'vs2',
  url: '/video/dash/xgplayer-demo.mp4'
};
let xgMp4Player = null;

let configFlv = {
  id: 'vs3',
  url: '/video/flv/xgplayer-demo.flv'
};
let FlvPlayer = null;

let configXgFlv = {
  id: 'vs4',
  url: '/video/flv/xgplayer-demo.flv'
};
let xgFlvPlayer = null;

let configHls = {
  id: 'vs5',
  url: '/video/hls/xgplayer-demo.m3u8'
};
let HlsPlayer = null;

let configXgHls = {
  id: 'vs6',
  url: '/video/hls/xgplayer-demo.m3u8'
};
let xgHlsPlayer = null;

let configDash = {
  id: 'vs7',
  url: '/video/dash/xgplayer-demo_dash.mpd'
};
let DashPlayer = null;

let configMusic = {
  id: 'vs8',
  url: [
    {
      src: '/video/music/audio.mp3',
      name: '林宥嘉·脆弱一分钟',
      vid: '10000000',
      poster: '/video/music/sintel-poster.png'
    }
  ],
  width: 900,
  height: 50,
  volume: 0.6
};
let MusicPlayer = null;

class App extends Component {

  readyHandle(){
    console.log('Mp4 player ready!')
  }

  completeHandle(){
    console.log('Mp4 player complete!')
  }

  destroyHandle(){
    console.log('Mp4 player destroy!')
  }

  render() {
    return (<div className="App">
      mp4:<ReactXgplayer rootStyle={rootStyle} config={configMp4} format={'mp4'} playerInit={(player)=>{ Mp4Player = player; }}  readyHandle={ ()=>{ this.readyHandle(); } } completeHandle={ ()=>{ this.completeHandle(); } } destroyHandle={ ()=>{ this.destroyHandle(); } }/>
      xg-mp4:<ReactXgplayer config={configXgMp4} format={'xg-mp4'} playerInit={(player)=>{ xgMp4Player = player; }} />
      flv:<ReactXgplayer config={configFlv} format={'flv'} playerInit={(player)=>{ FlvPlayer = player; }} />
      xg-flv:<ReactXgplayer config={configXgFlv} format={'xg-flv'} playerInit={(player)=>{ xgFlvPlayer = player; }} />
      hls:<ReactXgplayer config={configHls} format={'hls'} playerInit={(player)=>{ HlsPlayer = player; }} />
      xg-hls:<ReactXgplayer config={configXgHls} format={'xg-hls'} playerInit={(player)=>{ xgHlsPlayer = player; }} />
      dash:<ReactXgplayer config={configDash} format={'dash'} playerInit={(player)=>{ DashPlayer = player; }} />
      music:<ReactXgplayer config={configMusic} format={'music'} playerInit={(player)=>{ MusicPlayer = player; }} />
    </div>);
  }
}

export default App;
