'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

require('xgplayer-mp4');

var _xgplayerHls = require('xgplayer-hls.js');

var _xgplayerHls2 = _interopRequireDefault(_xgplayerHls);

require('xgplayer-hls');

var _xgplayerFlv = require('xgplayer-flv.js');

var _xgplayerFlv2 = _interopRequireDefault(_xgplayerFlv);

var _xgplayerFlv3 = require('xgplayer-flv');

var _xgplayerFlv4 = _interopRequireDefault(_xgplayerFlv3);

var _xgplayerShaka = require('xgplayer-shaka');

var _xgplayerShaka2 = _interopRequireDefault(_xgplayerShaka);

var _xgplayerMusic = require('xgplayer-music');

var _xgplayerMusic2 = _interopRequireDefault(_xgplayerMusic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var player = null;

var ReactXgplayer = function (_Component) {
  _inherits(ReactXgplayer, _Component);

  function ReactXgplayer(props) {
    _classCallCheck(this, ReactXgplayer);

    return _possibleConstructorReturn(this, (ReactXgplayer.__proto__ || Object.getPrototypeOf(ReactXgplayer)).call(this, props));
  }

  _createClass(ReactXgplayer, [{
    key: 'init',
    value: function init(props) {
      var self = this;
      if (props.config.url && props.config.url !== '') {
        props.config.ignores = props.config.ignores ? props.config.ignores.concat(['mp4player', 'hlsplayer', 'theme-default', 'cover', 'backward', 'forward', 'meta', 'next', 'prev', 'template']) : ['mp4player', 'hlsplayer', 'theme-default', 'cover', 'backward', 'forward', 'meta', 'next', 'prev', 'template'];
        if (props.format === 'hls') {
          player = new _xgplayerHls2.default(props.config);
        } else if (props.format === 'xg-hls') {
          props.config.ignores.splice(props.config.ignores.indexOf('hlsplayer'), 1);
          player = new _xgplayer2.default(props.config);
        } else if (props.format === 'flv') {
          player = new _xgplayerFlv2.default(props.config);
        } else if (props.format === 'xg-flv') {
          player = new _xgplayerFlv4.default(props.config);
        } else if (props.format === 'dash') {
          player = new _xgplayerShaka2.default(props.config);
        } else if (props.format === 'xg-mp4') {
          props.config.ignores.splice(props.config.ignores.indexOf('mp4player'), 1);
          player = new _xgplayer2.default(props.config);
        } else if (props.format === 'music') {
          ['theme-default', 'cover', 'backward', 'forward', 'meta', 'next', 'prev', 'template'].forEach(function (item) {
            props.config.ignores.splice(props.config.ignores.indexOf(item), 1);
          });
          player = new _xgplayerMusic2.default(props.config);
        } else {
          player = new _xgplayer2.default(props.config);
        }
        player.once('ready', function () {
          self.props.readyHandle();
        });
        player.once('complete', function () {
          self.props.completeHandle();
        });
        player.once('destroy', function () {
          self.props.destroyHandle();
        });
        props.playerInit(player);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy(player) {
      var _this2 = this;

      if (!player) {
        return;
      }
      var parentNode = void 0;
      if (player.root) {
        parentNode = player.root.parentNode;
      }
      for (var k in player._interval) {
        clearInterval(player._interval[k]);
        player._interval[k] = null;
      }
      if (player.ev) {
        player.ev.forEach(function (item) {
          var evName = Object.keys(item)[0];
          var evFunc = _this2[item[evName]];
          if (evFunc) {
            player.off(evName, evFunc);
          }
        });
      }
      ['focus', 'blur'].forEach(function (item) {
        player.off(item, player['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });
      if (!player.paused) {
        player.pause();
        player.once('pause', function () {
          player.emit('destroy');
          if (player.root) {
            player.root.id = player.root.id + '_del';
            parentNode.insertBefore(player.rootBackup, player.root);
            parentNode.removeChild(player.root);
          }
          for (var _k in player) {
            if (_k !== 'config') {
              delete player[_k];
            }
          }
        });
      } else {
        player.emit('destroy');
        if (player.root) {
          player.root.id = player.root.id + '_del';
          if (player.rootBackup) {
            parentNode.insertBefore(player.rootBackup, player.root);
          }
          parentNode.removeChild(player.root);
        }
        for (var _k2 in player) {
          if (_k2 !== 'config') {
            delete player[_k2];
          }
        }
      }
      setTimeout(function () {
        player = null;
      }, 200);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config) || JSON.stringify(nextProps.format) !== JSON.stringify(this.props.format) || JSON.stringify(nextProps.rootStyle) !== JSON.stringify(this.props.rootStyle)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'UNSAFE_componentWillUpdate',
    value: function UNSAFE_componentWillUpdate(nextProps) {
      if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
        this.init(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroy(player);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: this.props.config.id, style: this.props.rootStyle });
    }
  }]);

  return ReactXgplayer;
}(_react.Component);

exports.default = ReactXgplayer;


ReactXgplayer.propTypes = {
  config: _propTypes2.default.object,
  format: _propTypes2.default.string,
  playerInit: _propTypes2.default.func,
  rootStyle: _propTypes2.default.object,
  readyHandle: _propTypes2.default.func,
  completeHandle: _propTypes2.default.func,
  destroyHandle: _propTypes2.default.func
};
ReactXgplayer.defaultProps = {
  config: { id: 'mse', url: '' },
  format: 'mp4',
  playerInit: function playerInit() {},
  rootStyle: {},
  readyHandle: function readyHandle() {},
  completeHandle: function completeHandle() {},
  destroyHandle: function destroyHandle() {}
};
