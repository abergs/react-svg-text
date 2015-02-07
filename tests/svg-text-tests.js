'use strict';

var expect = require('chai').expect;

describe('ScatterChart', function() {
  it('renders scatterchart', function() {
    var React = require('react/addons');
    var SVGText = require('../src');
    var TestUtils = React.addons.TestUtils;

    var scatterchart = TestUtils.renderIntoDocument(
      <SVGText />
    );

    var divs = TestUtils.scryRenderedDOMComponentsWithTag(
      scatterchart, 'div');
    expect(divs).to.exist();
    expect(true).to.equal(true);

  });
});
