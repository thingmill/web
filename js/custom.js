
jQuery(document).ready(function() {


	/*
		Preloader
	*/

  	$(window).load(function() {

   	// will first fade out the loading animation
    	$("#status").fadeOut("slow");

    	// will fade out the whole DIV that covers the website.
    	$("#preloader").delay(500).fadeOut("slow").remove();

  	})

	/*
		Final Countdown Settings
	*/
	var finalDate = '2018/05/01';

	$('div.counter').countdown(finalDate)
   	.on('update.countdown', function(event) {

   		$(this).html(event.strftime('<div class="days-wrapper"><span class="days">%D</span><br>jours</div>' +
   										 	 '<div class="hours-wrapper"><span class="hours">%H</span><br>heures</div>' +
   										 	 '<div class="minutes-wrapper"><span class="minutes">%M</span><br>minutes</div>' +
   										 	 '<div class="seconds-wrapper"><span class="seconds">%S</span><br>secondes</div>'));

   });

});
