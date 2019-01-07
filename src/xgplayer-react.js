import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from 'xgplayer';

let player = null;

export default class ReactXgplayer extends Component {
  constructor(props) {
    super(props);
  }
  init(props) {
    let self = this;
    if (props.config.url && props.config.url !== '') {
      player = new Player(props.config);
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
  componentWillUnmount() {
    if(player) {
      player.destroy ()
    }
  }
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
