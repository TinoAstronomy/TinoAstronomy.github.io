$(document).ready(function() {
  var h = $(window).height();
  $(window).scroll(function() {
    var scr = $(window).scrollTop()/h;
    console.log(scr);
    $(".heading-img img").css("filter", "blur(" + (scr*1) + "vw)");
  });
});
