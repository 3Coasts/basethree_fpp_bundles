(function ($) {


Drupal.behaviors.basethree_fpp_bundles_slideshow = {
  attach: function (context, settings) {

    $('.pane-bundle-slideshow').gallerify();

  }
}

jQuery.fn.gallerify = function() {
	this.each(function(){

      var id = Math.floor(Math.random()*100000);
      var items = $('.field-item ',this);
      var obj = this;
			var largest_image = 0;

      if (items.length > 1) {
        $('.pane-content',obj).before('<div class="gallery_changer"><ul id="g'+id+'"></ul></div>');
        var changer = $('#g'+id);
        items.each(function(){
        	if(largest_image < $("img",this).height())
        		largest_image = $("img",this).height();
          var numberLink = (items.index(this)+1).toString();
          if (numberLink.length == 1) numberLink = '0' + numberLink;
          $('<li><a href="#">'+numberLink+'</a></li>').click(showImage).appendTo(changer);
        });
        $('li:first',changer).addClass('first current');
        $('li:last',changer).addClass('last');

      }

      $(this).height(largest_image);

      var auto;
      var current = 0;
      var max = $(items).length -1;

      autotoggle('on');
      $(obj).hover(function(){ 
        autotoggle('off'); 
      }, function(){ 
        autotoggle('on'); 
      });

      function autotoggle(state){
        if(state == 'on'){
          clearInterval(auto);
          auto = setInterval(function(){
            if(current < max){ current++; }else{ current=0; }
            $(obj).parent().find('.gallery_changer li')[current].click();
          },5000);
        }else{
          clearInterval(auto);
        }
      }

      function showImage() {

        var $clicked = $(items[$(this).index()]);
        var $current = $(items[$(this).parent().children('li.current').index()]);

        if($clicked.index() != $current.index()){
          $current.fadeOut();
          $clicked.fadeIn();
          $(this).addClass('current').siblings().removeClass('current');
        }
        return false;
      }

  });
	return true;
}


}(jQuery));

