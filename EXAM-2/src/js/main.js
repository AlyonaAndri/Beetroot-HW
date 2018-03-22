$(document).ready(function() {

  // add active class to clicked nav item
  $(".header__nav a").click(function(event) {
      event.preventDefault();
      $(".header__nav a").removeClass('active');
      $(this).addClass('active');
    });

  //sticky-header
  $(window).scroll(function() {
    const HEADERMENU = $(".header__menu");
    const MENU = $(".header__menu");
    let headerHeight = MENU.height();
    let scrollTop = $(window).scrollTop();
    if (scrollTop > headerHeight) {
      HEADERMENU.addClass("header__menu--sticky");
    } else {
      HEADERMENU.removeClass("header__menu--sticky");
    }
  });

  //hover to masonry-item
  $(".item-masonry__item").hover(
    function() {
      $(this).find(".item-masonry__item--cover").fadeIn();
    },
    function() {
      $(this).find(".item-masonry__item--cover").fadeOut();
    }
  );

  // Slow scroll from nav item to current section
  $(".header__nav a, .header__btn, .lets-talk__btn, .footer__title").click(function(event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    let headerHeightMenu = $(".header__menu").height();

    let scrollTop = top - headerHeightMenu;
    $("body, html").animate({ scrollTop }, 700 );
  });

  // logo__page-up
  $(".header__logo a").click(function(e) {
    e.preventDefault();
    $("html,body").animate({ scrollTop: 0 }, 700);
  });

  // change navigation active class onscroll
  function onScroll(event) {
    let scrollPos = $(document).scrollTop();
    let headerHeightMenu = $(".header__menu").height();

    $('.header__nav a').each(function () {
      let currLink = $(this);
      let refElement = $(currLink.attr("href"));
      if (refElement.position().top - headerHeightMenu <= scrollPos && refElement.position().top - headerHeightMenu + refElement.height() - headerHeightMenu > scrollPos) {
        $('.header__nav a').removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }
  $(document).on("scroll", onScroll);

  //slider1
  $('#team__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000
  });

  //slider2
  $('#testimonials__slider').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    centerMode: true,
    nextArrow: '<button type="button" class="slick-next2"> <i class= "fas fa-chevron-right" ></i> </button>',
    prevArrow: '<button type="button" class="slick-prev2"> <i class= "fas fa-chevron-left" ></i> </button>',
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000
  });

  //slider3-modal
  $('#modal__slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    centerMode: true,
    nextArrow: '<button type="button" class="slick-next2"> <i class= "fas fa-chevron-right" ></i> </button>',
    prevArrow: '<button type="button" class="slick-prev2"> <i class= "fas fa-chevron-left" ></i> </button>',
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000
  });

  //Masonry
  $('#item-masonry').masonry({
    itemSelector: ".item-masonry__item",
    columnWidth: ".sizer4"
  });

  //Isotope
  let $grid = $('#item-masonry').isotope({

  });
  $('.filter-btn-group').on( 'click', 'button', function() {

    let filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  //active tab Isotope
  $(".portfolio__btn-item").click(function(event) {
    event.preventDefault();
    $(".portfolio__btn-item").removeClass('active');
    $(this).addClass('active');
  });

  // open modal
  $(".btn--show-modal").click(function() {
    $('#modal').addClass('modal--show');
    $('body').addClass('hidden');
  });

  // close modal
  $('.modal__btn--close, .modal__btn--cancel').click(function() {
    $('#modal').removeClass('modal--show');
    $('body').removeClass('hidden');
  });

  // close modal by clicking outside of modal content
  $(document).click(function (event) {
    if (!$(event.target).closest(".modal__wrapper, .btn--show-modal").length) {
      $("#modal").removeClass("modal--show");
      $('body').removeClass('hidden');
    }
  });
});

function initMap() {
  let beetroot = {lat: 49.568690, lng: 34.584994};
  let map = new google.maps.Map(document.getElementById('contact__google-api'), {
    zoom: 16,
    center: beetroot,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });
  let marker = new google.maps.Marker({
    position: beetroot,
    map: map,
    title: "Beetroot",
    icon: "./img/map.png"
  });
  let contentString = '<div id="content">'+'<div id="siteNotice">'+ '</div>'
  +'<h1 id="firstHeading" class="firstHeading">BEETROOT</h1>'+
  '<div id="bodyContent">'+'<p><b>Street Beetroot-Cool</b> sity Poltava</p>'
  +'</div>'+'</div>';

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
