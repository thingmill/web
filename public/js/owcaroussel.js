

$(document).ready( function() {
    'use strict';
    /*-------------------------------------
    owlCarousel
    -------------------------------------*/
    $('.banner-slider').owlCarousel({
      loop:true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplaySpeed: 1000,
      margin:0,
      dots: false,
      nav:true,
      navText: ['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
      responsive:{
        0:{
          items:1
        }
      }
    })

    $('.post-slider').owlCarousel({
      loop:true,
      autoplay: false,
      margin:0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      dots: false,
      nav:true,
      navText: ['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
      responsive:{
        0:{
          items:1
        }
      }
    })

    $('.portfolio-details-slider').owlCarousel({
      loop:true,
      autoplay: true,
      margin:0,
      dots: true,
      nav:false,
      responsive:{
        0:{
          items:1
        }
      }
    })

    $('.post-details-slider').owlCarousel({
      loop:true,
      autoplay: false,
      margin:0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      dots: false,
      nav:true,
      navText: ['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
      responsive:{
        0:{
          items:1
        }
      }
    })
})


  $(window).on('scroll', function () {
    $('.testimonial').owlCarousel({
      loop:true,
      autoplay: false,
      margin:0,
      dots: false,
      nav:true,
      navText: ['<span class="ti-arrow-left"></span>','<span class="ti-arrow-right"></span>'],
      responsive:{
        0:{
          items:1
        }
      }
    })

    $('.case-study-slider').owlCarousel({
      loop:true,
      autoplay: false,
      margin: 10,
      dots: true,
      nav:true,
      navText: ['<span class="ti-arrow-left"></span>','<span class="ti-arrow-right"></span>'],
      responsive:{
        0:{
            items:1
        },
        575:{
            items:2
        },
        768:{
            items:3
        },
        1200:{
            items:4
        }
      }
    })
  });
