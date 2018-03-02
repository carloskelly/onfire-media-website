/* ----------------------------------------------------------------------------------------------------- */
/* animate.css */
/* ----------------------------------------------------------------------------------------------------- */


$(document).ready(function() {
                jQuery('.post').addClass("hideme").viewportChecker({
                    classToAdd: 'visible animated fadeIn', // Class to add to the elements when they are visible
                    offset: 200    
                   }); 
                $('.animated').attr('style', 'visibility: visible !important;');
            });  



/* ----------------------------------------------------------------------------------------------------- */
/* owl carousel */
/* ----------------------------------------------------------------------------------------------------- */



$(document).ready(function() {

  $("#owl-slideshow").owlCarousel({
    slideSpeed: 4000,
    paginationSpeed: 2000,
    singleItem: true,
    loop: true,
    items : 1,
    autoPlay: true,
    autoPlaySpeed: 5000,
    autoPlayTimeout: 5000,
    autoPlayHoverPause: true,
    transitionStyle : "backSlide"    
  });

});


/* ----------------------------------------------------------------------------------------------------- */
/* nav scroll */
/* ----------------------------------------------------------------------------------------------------- */

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });
});


