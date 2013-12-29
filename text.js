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

  function apply(d) {
    console.log('repositioning text');
    console.log(this);
    var textArea = this;
    self.mythis = this;
    var dx, dy;
    var computedStyle = window.getComputedStyle(textArea[0][0]);
    var textAlign = computedStyle.textAlign;
    var verticalAlign = computedStyle.verticalAlign;

    var fontSize = computedStyle.fontSize;
    var fontSizeInPixels = betterCssForSvg.getPixelValueFromAbbreviation(computedStyle.fontSize);

    var bBox = textArea[0][0].getBBox()

    var parentElement = textArea[0][0].parentElement;
    var parentElementBBox = parentElement.getBBox();
    var parentElementComputedStyle = window.getComputedStyle(parentElement);
    var parentElementPadding = parentElementComputedStyle.padding;
    var parentElementPaddingInPixels = betterCssForSvg.getPixelValueFromAbbreviation(parentElementComputedStyle.padding, fontSizeInPixels);

    // tweak left, center, right horizontal alignment
    // using padding of parentElement.

    if (textAlign === 'left') {
      dx = parentElementPaddingInPixels;
    }
    else {
      if (textAlign === 'right') {
        dx = parentElementBBox.width - (parentElementPaddingInPixels + bBox.width);
      }
      else {
        dx = parentElementBBox.width / 2;
      }
    }

    //var textAnchor = getTextAnchor(textArea.tspan[0], textAlign);
    //textArea.style.textAnchor = textAnchor;

    // set top, middle, bottom vertical alignment

    // see http://www.w3.org/TR/2011/REC-CSS2-20110607/visudet.html#propdef-vertical-align
    // baseline | sub | super | top | text-top | middle | bottom | text-bottom | <percentage> | <length> | inherit
    //
    // TODO Baseline refers to where text "sits." A vertical-align value of "baseline" is approximately equal to 
    // a value of "bottom," but not exactly. This and the other vertical align values can be tweaked to be more
    // correct.
    //
    // http://css-tricks.com/what-is-vertical-align/
    if (verticalAlign === 'middle') {
      dy = ((parentElementBBox.height / 2) + bBox.height/2);
    }
    else {
      if (verticalAlign === 'top' || verticalAlign === 'super' || verticalAlign === 'text-top') {
        dy = parentElementPaddingInPixels;
      }
      else {
        if (verticalAlign === 'bottom' || verticalAlign === 'baseline' || verticalAlign === 'sub' || verticalAlign === 'text-bottom') {
          dy = parentElementBBox.height - (parentElementPaddingInPixels + bBox.height);
        }
        else {
          dy = 0;
          console.warn('verticalAlign property name not recognized.');
        }
      }
    }

    textArea.attr('transform', 'translate(' + dx + ' ' + dy + ')');

    var textLineComputedStyle, textLineBBox;
    var textLines = textArea.selectAll('text').map(function(textLine) {
      textLineComputedStyle = window.getComputedStyle(textLine[0]);
      textLineBBox = textLine[0].getBBox();
      d3.select(this).attr("y", function (d, i) { return i * textLineBBox.height;})
    });
  }

  return {
    apply:apply
  };
}();


