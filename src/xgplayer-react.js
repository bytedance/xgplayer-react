import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from 'xgplayer';

let player = null;

export default class ReactXgplayer extends Component {
  constructor(props) {
    super(props);
  }
  init(props) {
    const { playerInit } = props;
    if (props.config.url && props.config.url !== '') {
      props.config.ignores = props.config.ignores ? props.config.ignores.concat(['mp4player', 'hlsplayer']) : ['mp4player', 'hlsplayer'];

      props.config.ignores = props.config.ignores.concat(['backward', 'cover', 'forward', 'meta', 'next', 'prev']);
      player = new Player(props.config) || {};
      player.once('ready', () => { this.props.readyHandle(); });
      player.once('complete', () => { this.props.completeHandle(); });
      player.once('destroy', () => { this.props.destroyHandle(); });
      playerInit && props.playerInit(player);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config) ||
        JSON.stringify(nextProps.format) !== JSON.stringify(this.props.format) ||
        JSON.stringify(nextProps.rootStyle) !== JSON.stringify(this.props.rootStyle)) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps) {
    if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
      this.init(nextProps);
    }
  }

  getPlayer(ref) {
    if (ref) {
      const config = {
        el: ref
      };
      const props = Object.assign({}, this.props);
      props.config = Object.assign({}, props.config, config);
      this.init(props);
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
    return (
      <div
        ref={this.getPlayer.bind(this)}
        style={this.props.rootStyle}
      />
    );
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
