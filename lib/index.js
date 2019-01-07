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
        player = new _xgplayer2.default(props.config);
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
      if (player && player.root) {
        player.destroy();
      }
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
