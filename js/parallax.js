//initialization of elements
var parallaxElements = [];

$('.parallax').each(function(index) {
    //make a new object to hold each element
    var p = {};

    //save pertinent info into array
    p.element = $(this);
    p.height = p.element.height();
    p.section = p.element.closest("section");

    //store initial transformations
    var matrix = p.css("transform");
    var matrixArray = matrix.match(/-?[\d\.]+/g);
    p.translateX = parseInt(matrix[4]);
    p.translateY = parseInt(matrix[5]);

    //data-speed -> speed of element -> divide by 12 when storing initially
    //data-start -> take input as a percent of body height?
    //data-end -> take input as a percent of body height?
    p.speed = p.data("speed");
    p.start = p.data("start");
    p.end = p.data("end");


    //push the object to array of parallax elements
    parallaxElements.push(p);
});

var keyframes = [
  {
    'duration' : '150%',
    'animations' : [
      {
        'selector' : '.parallaxing-element',
        'translateY' : -120,
        'opacity' : 0
      } , {
        'selector' : '.another-element',
        'translateY' : -100,
        'opacity' : 0
      }
    ]
  }
]


//time interval for scroll
scrollIntervalID = setInterval(updatePage, 10);




animateElements = function() {
    var animation, translateY, translateX, scale, rotate, opacity;
    for (var i = 0; i < keyframes[currentKeyframe].animations.length; i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = calcPropValue(animation, 'translateY');
        translateX  = calcPropValue(animation, 'translateX');
        scale       = calcPropValue(animation, 'scale');
        rotate      = calcPropValue(animation, 'rotate');
        opacity     = calcPropValue(animation, 'opacity');

        $(animation.selector).css({
        'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
        'opacity' : opacity
        })
    }
}

updatePage = function() {
      window.requestAnimationFrame(function() {
        setScrollTops();
        if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
          animateElements();
          setKeyframe();
        }
      });
    }

    setScrollTops = function() {
      scrollTop = $window.scrollTop();
      relativeScrollTop = scrollTop - prevKeyframesDurations;


    // 6. Inside the event handler we loop each cached image object from the array
    $.each(parallaxElements, function(index, element) {
        // Logic to see which image should currently be shown...
        // Code to update `transform: translate3d` value...
    });
}

easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};

setKeyframe = function() {
  if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
      prevKeyframesDurations += keyframes[currentKeyframe].duration;
      currentKeyframe++;
      showCurrentWrappers();
  } else if(scrollTop < prevKeyframesDurations) {
      currentKeyframe--;
      prevKeyframesDurations -= keyframes[currentKeyframe].duration;
      showCurrentWrappers();
  }
}

showCurrentWrappers = function() {
  var i;
  if(keyframes[currentKeyframe].wrapper != currentWrapper) {
    $(currentWrapper).hide();
    $(keyframes[currentKeyframe].wrapper).show();
    currentWrapper = keyframes[currentKeyframe].wrapper;
  }
}










// $(window).on('resize', function() {
//     // Code to update element values...
// });
