"use strict";
betterCssForSvg = function(){

  function apply(svg) {
    // TODO for now, input svg is the d3 selected svg document node, but this should be updated
    // to handle a selector like "#my-svg" for an in-line SVG as well as the selector for
    // an SVG inside an object.
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

    svg.selectAll('text').each(function(textElement) {
      var text = d3.select(this).call(betterCssForSvg.text);
    });

    //svg.selectAll('rect').call(betterCssForSvg.boxModel);
  }

  return {
    apply:apply
  };
}();



