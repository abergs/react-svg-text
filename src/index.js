'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return {
      lineHeight: 0,
      segments: []
    };
  },

  componentDidMount: function componentDidMount() {
    var height;
    var tspan = React.DOM.tspan;
    var words = this.props.children.split(' ');
    var tempString = new String();
    var lastString = new String();
    var len = words.length;
    var idx = 0;
    var hiddenTextNode = this.refs.hiddenTextNode.getDOMNode();
    var segments = [];
    while (true) {
      if (idx > len) break;
      var newWord = words[idx];
      var lastString = tempString;
      if (tempString.length === 0) {
        tempString = newWord;
      } else {
        tempString = '' + tempString + ' ' + newWord;
      }
      var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      var t = document.createTextNode(tempString);
      tspan.appendChild(t);
      hiddenTextNode.appendChild(tspan);
      var tspanBBox = hiddenTextNode.getBBox();
      if (tspanBBox.width > this.props.width) {
        segments.push(lastString);
        tempString = newWord;
      };
      height = tspanBBox.height;
      hiddenTextNode.removeChild(tspan);
      idx++;
    }
    if (lastString.length > 0) {
      segments.push(lastString);
    }
    // Remove temp text node we used for sizing
    var x = this.refs.hiddenGroupNode.getDOMNode();
    x.parentNode.removeChild(x);
    // If component is mounted, set state for tspans
    // _renderTSpan then renders them based on that state
    if (this.isMounted()) {
      this.setState({
        segments: segments,
        lineHeight: height
      });
    }
  },

  _renderTSpan: function _renderTSpan() {
    var state = this.state;
    var props = this.props;
    if (this.state.segments.length === 0) {
      return React.createElement('tspan', null);
    }
    var newSegments = this.state.segments.map(function (segment, idx) {
      return React.createElement(
        'tspan',
        {
          x: '10',
          dy: state.lineHeight,
          key: idx
        },
        segment
      );
    });
    return React.createElement(
      'text',
      _extends({ y: '10', ref: 'textNode' }, props),
      newSegments
    );
  },

  render: function render() {
    return React.createElement(
      'g',
      null,
      React.createElement(
        'g',
        { ref: 'hiddenGroupNode', style: { display: 'none' } },
        React.createElement('text', { ref: 'hiddenTextNode' })
      ),
      React.createElement(
        'g',
        { style: { display: 'inline' } },
        this._renderTSpan()
      )
    );
  }

});
