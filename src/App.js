import React, { Component } from 'react';
import ReactXgplayer from './xgplayer-react';
import './App.css';

let configMp4 = {
  id: 'vs1',
  url: '/xgplayer-demo.mp4'
};
let Mp4Player = null;
let rootStyle = {
  backgroundColor: 'rgba(0,0,0,0.87)'
};

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
      <ReactXgplayer rootStyle={rootStyle} config={configMp4} playerInit={(player)=>{ Mp4Player = player; }}  readyHandle={ ()=>{ this.readyHandle(); } } completeHandle={ ()=>{ this.completeHandle(); } } destroyHandle={ ()=>{ this.destroyHandle(); } }/>
    </div>);
  }
}

export default App;
