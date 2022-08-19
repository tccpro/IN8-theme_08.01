$(document).ready(function(){

  if($(window).width() < 750 ) {
    $('.logo-bar').flickity({
      // options
      cellAlign: 'center',
      contain: true,
      freeScroll: true,
      prevNextButtons: false,
      autoPlay: false,
      pageDots: false
    });
  }
  if($('.__header-handle').hasClass('__header-flag')) {
    var offset = -102;
    if( $(window).width() < 750 ) {
      offset = -82
    }
  } else var offset = 0;
  var min_height_scroll_snap = Number($("#scroll_snap_min_height").val());
  console.log(min_height_scroll_snap);
  $(".enable_scroll_snap .shopify-section:not([id='shopify-section-header'])").each(function(index){
    if($(this).height() >= min_height_scroll_snap) 
    $(this).addClass('shopify-scrollify');
    console.log(index, $(this).height());
  });
  $.scrollify({
    section : ".shopify-scrollify",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : offset,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });
  $('.product-buy-btn').click(function(e){
    e.preventDefault();
    $('.__add_to_cart_product').click();
  });
});