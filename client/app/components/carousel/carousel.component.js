;
(function () {
  'use strict';

  window.addEventListener('load', loadHandler);

  function loadHandler() {
    $('[testimonials-carousel]').slick({
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  }
})();