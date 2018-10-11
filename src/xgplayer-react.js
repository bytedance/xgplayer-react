import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Player from 'xgplayer';
import 'xgplayer-mp4';
import HlsJsPlayer from 'xgplayer-hls.js';
import 'xgplayer-hls';
import FlvJsPlayer from 'xgplayer-flv.js';
import FlvPlayer from 'xgplayer-flv';
import ShakaJsPlayer from 'xgplayer-shaka';
import Music from 'xgplayer-music';

let player = null;

export default class ReactXgplayer extends PureComponent {
  constructor(props) {
    super(props);
  }
  init(props) {
    let self = this;
    if (props.config.url && props.config.url !== '') {
      props.config.ignores = props.config.ignores ? props.config.ignores.concat(['mp4player','hlsplayer','theme-default','cover','backward','forward','meta','next','prev', 'template']) : ['mp4player','hlsplayer','theme-default','cover','backward','forward','meta','next','prev', 'template'];
      if (props.format === 'hls') {
        player = new HlsJsPlayer(props.config);
      } else if (props.format === 'xg-hls') {
        props.config.ignores.splice(props.config.ignores.indexOf('hlsplayer'), 1);
        player = new Player(props.config);
      } else if (props.format === 'flv') {
        player = new FlvJsPlayer(props.config);
      } else if (props.format === 'xg-flv') {
        player = new FlvPlayer(props.config);
      } else if (props.format === 'dash') {
        player = new ShakaJsPlayer(props.config);
      } else if (props.format === 'xg-mp4') {
        props.config.ignores.splice(props.config.ignores.indexOf('mp4player'), 1);
        player = new Player(props.config);
      } else if (props.format === 'music') {
        ['theme-default','cover','backward','forward','meta','next','prev', 'template'].forEach(item => {
          props.config.ignores.splice(props.config.ignores.indexOf(item), 1);
        })
        player = new Music(props.config);
      } else {
        player = new Player(props.config);
      }
      player.once('ready',()=>{ self.props.readyHandle(); });
      player.once('complete',()=>{ self.props.completeHandle(); });
      player.once('destroy',()=>{ self.props.destroyHandle(); });
      props.playerInit(player);
    }
  }
  componentDidMount() {
    this.init(this.props);
  }
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config) ||
        JSON.stringify(nextProps.format) !== JSON.stringify(this.props.format) ||
        JSON.stringify(nextProps.rootStyle) !== JSON.stringify(this.props.rootStyle)) {
      return true;
    }
    return false;
  }
  UNSAFE_componentWillUpdate(nextProps) {
    if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
      this.init(nextProps);
    }
  }
  // componentWillUnmount() {
    // if (player) {
    //   this.destroy(player);
    // }
    // setTimeout(function () {
    //   player = null;
    // }, 0);
  // }
  render() {
    return (<div id={this.props.config.id} style={this.props.rootStyle}>
    </div>);
  }
}

ReactXgplayer.propTypes = {
  config: PropTypes.object,
  format: PropTypes.string,
  playerInit: PropTypes.func,
  rootStyle: PropTypes.object,
  readyHandle: PropTypes.func,
  completeHandle: PropTypes.func,
  destroyHandle: PropTypes.func
};
ReactXgplayer.defaultProps = {
  config: { id: 'mse', url: '' },
  format: 'mp4',
  playerInit: () => {},
  rootStyle: {},
  readyHandle: () => {},
  completeHandle: () => {},
  destroyHandle: () => {}
};
