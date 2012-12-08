!function ($) {
  $(function(){
    // carousel demo
    $('#myCarousel').carousel();
    $('button.collapse-btn').on('click', function (e) {
		  $(this).toggleClass("shown");
		});
  });
}(window.jQuery)
