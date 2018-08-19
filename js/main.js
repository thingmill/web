for (var i = 0; i < document.getElementsByClassName('noscript').length; i = i + 1) {
	document.getElementsByClassName('noscript')[i].className = document.getElementsByClassName('noscript')[i].className.replace(" noscript", "");
}

function changeDiapo(slider) {
	'use strict';
	var photos = slider.getElementsByClassName('photo');
	for (var i = 0; i < photos.length; i = i + 1) {
		photos[i].style.display = "none";
	}
	if (typeof slider.activePhoto === "undefined" || slider.activePhoto + 1 === photos.length) {
		slider.activePhoto = 0;
	} else {
		slider.activePhoto = slider.activePhoto + 1;
	}
	photos[slider.activePhoto].style.display = "block";
}

for (var i = 0; i < document.getElementsByClassName('slider').length; i = i + 1) {
	changeDiapo(document.getElementsByClassName('slider')[i]);
}

var clipboard = new Clipboard(".ip", {
	text: function (trigger) {
		return trigger.innerHTML;
	}
});

$('a[href^="#"]').click(function(){
    var id = $(this).attr("href");
    var offset = $(id).offset().top
    $('html, body').animate({scrollTop: offset}, 'slow');
    return false;
});

clipboard.on('success', function (e) {
	e.trigger.className = e.trigger.className + " copied";
	setTimeout(function () {
		e.trigger.className = e.trigger.className.replace(" copied", "");
	}, 1500)
});
