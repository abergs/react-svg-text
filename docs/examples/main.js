'use strict';

var React = require('react');
var SVGText = require('../../src');

var Demos = React.createClass({

  render() {
    return (
      <svg height={800} width={800} ref="svgMain">
        <SVGText width={400} >Testing 123. Now is the time for all good men to come to the aid of their countries.</SVGText>
      </svg>
    );
  }

});

React.render(
  <Demos />,
  document.body
);
