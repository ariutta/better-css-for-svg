"use strict";
betterCssForSvg.text = function(){

  // for more details, see 
  // http://www.w3.org/TR/SVG11/text.html#TextAnchorProperty
  // start | middle | end | inherit
  // and
  // http://www.w3.org/TR/CSS2/text.html#alignment-prop
  // left | right | center | justify | inherit

    /*
    'left': 'start',
    'right': 'end',
    'center': 'middle',
    'inherit': 'inherit',
    'justify': null
    //*/

  function getTextAnchor(tspan0, cssTextAlignValue) {
    var direction, textAnchor;
    if (cssTextAlignValue === 'center') {
      textAnchor = 'middle';
    }
    else {
      if (cssTextAlignValue === 'left' || cssTextAlignValue === 'right') {
        direction = pathvisiojs.utilities.getTextDirection('tspan0');
        if (direction === 'ltr') {
          if (cssTextAlignValue === 'left') {
            textAnchor = 'start';
          }
          else {
            textAnchor = 'end';
          }
        }
        else {
          if (cssTextAlignValue === 'left') {
            textAnchor = 'end';
          }
          else {
            textAnchor = 'start';
          }
        }
      }
    }
    return textAnchor;
  };

  function applyTextAlign(d) {
    console.log('repositioning text');
    var element = this;
    var dx, dy;
    var computedStyle = window.getComputedStyle(element);
    var textAlign = computedStyle.textAlign;
    var verticalAlign = computedStyle.verticalAlign;
    var fontSize = computedStyle.fontSize;
    var bBox = element.getBBox()
    var parent = element.parentElement;
    parent.bBox = parent.getBBox();

    // tweak left, center, right horizontal alignment
    // giving padding of 5. maybe this should go into the CSS.

    if (textAlign === 'left') {
      dx = 5 + (-1)*bBox.x;
    }
    else {
      if (textAlign === 'right') {
        dx = parent.bBox.width - (5 + bBox.width) + (-1)*bBox.x;
      }
      else {
        dx = parent.bBox.width / 2 + (-1)*bBox.x;
      }
    }

    //var textAnchor = getTextAnchor(element.tspan[0], textAlign);
    //element.style.textAnchor = textAnchor;

    // set top, middle, bottom vertical alignment

    if (!!verticalAlign) {
      if (verticalAlign === 'top') {
        dy = 5 + bBox.height + (-1)*bBox.y;
      }
      else {
        if (verticalAlign === 'bottom') {
          dy = parent.bBox.height - (5 + bBox.height) + (-1)*bBox.y;
        }
        else {
          dy = ((parent.bBox.height / 2) + bBox.height/2) + (-1)*bBox.y;
        }
      }
    }
    else {
      dy = ((parent.bBox.height / 2) + bBox.height/2) + (-1)*bBox.y;
    }

    var nodeText = d3.select(element) 
    .attr('transform', function(d) {
      return 'translate(' + dx + ' ' + dy + ')';
    });

    var tSpanComputedStyle, tSpanBBox;
    var tSpans = nodeText.selectAll('tspan').map(function(tSpan) {
      tSpanComputedStyle = window.getComputedStyle(tSpan[0]);
      tSpanBBox = tSpan[0].getBBox();
      d3.select(this).attr("y", function (d, i) { return i * tSpanBBox.height;})
    });
  }

  return {
    applyTextAlign:applyTextAlign
  };
}();


