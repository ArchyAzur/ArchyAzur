function castParallax() {

	var opThresh = 350;
	var opFactor = 750;

/*
	$(window).scroll(function(){
		var windowScroll = $(window).scrollTop();
		
		$('.keyart_layer.parallax').each(function(){
			var $layer = $(this);
			var yPos = -(windowScroll * $layer.data('speed') / 100);
			$layer.css({
				"transform" : "translate3d(0px, " + yPos + "px, 0px)"
			});

		});


		var backgroundOpacity = (windowScroll > opThresh ? (windowScroll - opThresh) / opFactor : 0);
		$('#keyart-scrim').css('opacity', backgroundOpacity);
	});

*/
	window.addEventListener("scroll", function(event){

		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});


}

function dispelParallax() {
	$("#nonparallax").css('display','block');
	$("#parallax").css('display','none');
}

function castSmoothScroll() {
	$.srSmoothscroll({
		step: 80,
		speed: 300,
		ease: 'linear'
	});
}

function startParallax() {

	var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

	if ( platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1 ) 
	{
		dispelParallax();
	}
	
	else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1)
	{
		castParallax();					
		if ($.browser.webkit)
		{
			//castSmoothScroll();
		}
	}
	
	else
	{
		castParallax();
	}

}

(function() {
			 
	'use strict';

	// define variables
	var timelines= document.querySelectorAll('.timeline2');
	 
	  function debounce(func, wait, immediate) {
		  var timeout;
		  return function() {
			  var context = this, args = arguments;
			  var later = function() {
				  timeout = null;
				  if (!immediate) func.apply(context, args);
			  };
			  var callNow = immediate && !timeout;
			  clearTimeout(timeout);
			  timeout = setTimeout(later, wait);
			  if (callNow) func.apply(context, args);
		  };
	  }
	  function callbackFunc() {
			var h,timeline, li,rect,parent_rect,i,items;
		  for(h=0;h<timelines.length;h++){
				timeline=timelines[h];
				  parent_rect=timeline.getBoundingClientRect();
				 items = timeline.querySelectorAll(".timeline2 li");
			  for (  i = 0; i < items.length; i++) {
				  /*
				if (isElementInViewport(items[i])) {
				  items[i].classList.add("in-view");				   
				}
				*/
				  li=items[i];
				  rect = li.getBoundingClientRect();  
				   
				  if( (rect.bottom<=(parent_rect.top+(rect.height/2) ) ) || (rect.top >=(parent_rect.bottom-(rect.height/2)) ) ){
					  //debugger;
					  //li.style['background']='red';
					  li.classList.remove("in-view");
					  
				  }else{
					  //li.style['background']='white';
					  li.classList.add("in-view");
				  }
				   
			  }
		  }
	  }
	  var updateLayout =debounce(function(e) {

		  // Does all the layout updating here
		  callbackFunc();
		  
	  }, 500); // Maximum run of once per 500 milliseconds

	  // listen for events
	  window.addEventListener("load", callbackFunc);
	  window.addEventListener("resize", updateLayout);
	  window.addEventListener("scroll", callbackFunc);
	  for(var h=0;h<timelines.length;h++){
			  var  timeline=timelines[h];
		  timeline.addEventListener("scroll",callbackFunc );
	  }
	  
   })();
	  