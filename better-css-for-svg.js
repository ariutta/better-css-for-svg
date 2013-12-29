"use strict";
var betterCssForSvg = function(){

  // thanks to http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function getPixelValueFromAbbreviation(abbreviation, fontSize) {
    // 1em = 12pt = 16px = 100%
    var fontSizeInPixels;
    if (isNumber(abbreviation)) {
      return parseFloat(abbreviation);
    }
    else {
      if (abbreviation.toLowerCase().slice(-2) === 'px') {
        return parseFloat(abbreviation.slice(0, -2));
      }
      else {
        if (abbreviation.toLowerCase().slice(-2) === 'pt') {
          return parseFloat(abbreviation.slice(0, -2) * (16/12));
        }
        else {
          // TODO can we safely assume fontSize will only be in px or pt?
          fontSizeInPixels = getPixelValueFromAbbreviation(fontSize, null);
          if (abbreviation.toLowerCase().slice(-2) === 'em') {
            return parseFloat(abbreviation.slice(0, -2) * fontSizeInPixels);
          }
          else {
            if (abbreviation.toLowerCase().slice(-1) === '%') {
              return parseFloat((abbreviation.slice(0, -1) / 100) * fontSizeInPixels);
            }
            else {
              throw new Error('Cannot convert ' + abbreviation + ' to a pixel value.');
            }
          }
        }
      }
    }
  }

  function init(svg) {
    // TODO for now, input svg is the d3 selected svg document node, but this should be updated
    // to handle a selector like "#my-svg" for an in-line SVG as well as the selector for
    // an SVG inside an HTML object or embed element. I don't think it will work for an SVG
    // in an img element.
    //
    // var svg;
    // if (target is a selector for an in-line SVG) {
    //   svg = d3.select(targetSelector);
    // }
    // else {
    //   if (target is a selector for an SVG in an object or embed element) {
    //     svg = something;
    //   }
    //   else {
    //     if (this script is inside an SVG) {
    //       svg = something;
    //     }
    //   }
    // }

    svg.selectAll('g.text-area').each(function(textElement) {
      console.log(this);
      var text = d3.select(this).call(betterCssForSvg.text.apply);
    });

    return 'success';

    //svg.selectAll('rect').call(betterCssForSvg.boxModel);
  }

  return {
    init:init,
    getPixelValueFromAbbreviation:getPixelValueFromAbbreviation
  };
}();



