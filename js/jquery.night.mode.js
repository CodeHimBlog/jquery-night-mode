/*  Plugin: jquery.night.mode.js
 *   Frameworks: jQuery and Font Awesome
 *   Author: Asif Mughal
 *   URL: https://www.codehim.com
 *   License: MIT License
 *   Copyright (c) 2018 - Asif Mughal
 */
(function($){
     $.fn.nightMode = function(options){
    var setting = $.extend({
    		        keepNormal: "button",
                 brightnessControler: true,
                 autoEnable: false, 
                 successText: "Night Mode Successfully Enabled !",
                 adjustText: "Would you like to adjust brightness?",

  		   }, options);
  
        return this.each(function() {
  var nightObject, 
      allChild, 
      keepNormal, 
      nightArea, 
      nightTrigger,
      successMessage, 
      brControler, 
      brStatus, 
      confirmAction, 
      loader, 
      modericon;

     nightObject = $(this);
     allChild = $(this).find("*"); 
     keepNormal = setting.keepNormal;

/* Create some DOM to create UI for adjusting brightness of the page */
  nightArea = document.createElement("section");
  successMessage = document.createElement("div");
  brControler = document.createElement("input");
  confirmAction = document.createElement("button");
  brStatus = document.createElement("span");
  nightTrigger = document.createElement("button");
  loader = document.createElement("div");
  modericon = [
  "<i class='fa fa-check-circle large'></i>",
  "<i class='fa fa-adjust'></i>",
  "<i class='fa fa-spinner fa-spin'></i>",
  "<i class='fa fa-moon-o'></i>",
  "<i class='fa fa-sun-o'></i>"];


$(nightTrigger).html(modericon[3]).addClass("night-trigger").insertAfter(this);

$(nightArea).addClass("custom").insertAfter(nightObject);

$(successMessage).addClass("success-mesg")
.append(modericon[0]+
     setting.successText+'<br><br>'+
     setting.adjustText+'<br><br>'+
     modericon[1]
).insertAfter(nightObject);


$(brControler).prop({
      'type': 'range',  
       'min': 20,
       'max' :100,
}).appendTo(successMessage);
$(brStatus).appendTo(successMessage);

$(confirmAction).html("OK").addClass("confirm").appendTo(successMessage);

$(loader).addClass("loading").html(modericon[2]).insertAfter(successMessage);


$(nightTrigger).bind('click', function(){
$(nightArea).toggleClass("mode");
    if (setting.brightnessControler == true){

$(".loading").fadeIn(1500, function(){
       $(".loading").fadeOut("slow");

if ($(nightArea).hasClass("mode")){
    $(".success-mesg").fadeIn();
      nightModeEnable();
  } 
else {
    nightModeOff();
  }

}); 

} 
    else { if ($(nightArea).hasClass("mode")){
    nightModeEnable(); } else{
            nightModeOff();
        }
     }

$(brControler).on('input', function(){
   $(allChild).not(keepNormal).css({
      'color' : 'rgba(255, 255, 255,' +$(this).val()/101+')',
    });
$(brStatus).html($(this).val()+'\%');
 });

}); // End Trigger click function
$(confirmAction).click(function(){
   $(this).parent().hide();
 $(".night-trigger").prop('disabled', false);
});

   if(setting.autoEnable == true){
/* Auto enable night mode at 8 pm to 4 am */
var time = new Date().getHours();
if (time >=0 && time <5 ||  time > 19){
      nightModeEnable();
     $(nightArea).addClass("mode");
     $(".night-trigger").prop('disabled', false);
    }
 }
function nightModeEnable(){
   $(nightObject).not(keepNormal).css({
     'background' : '#414841',
     'color' : 'rgba(240, 255, 240, 0.495049505)',
     'borderColor' : '#000',
    });

  $(allChild).not(keepNormal).css({
     'color' : 'rgba(255, 255, 255, 0.495049505)', 
     'background' : 'rgba(0, 0, 0, 0.3)',
   });
$(nightTrigger).prop('disabled', true).html(modericon[4]).css({
      'background' : '#fff',
      'color' : '#FDD017'
}); 
}

function nightModeOff(){
$(nightTrigger).prop('disabled', false).html(modericon[3]).css({
      'background' : '#212121',
      'color' : '#f2f2f2'
});
    $(nightObject).css({
    'background' : '',//default
    'color' : '',//default
    'borderColor' : '' //default
   });
       $(allChild).css({
      'color' : '',//default
      'background' : '', //default
  });
}
        });
      };

})(jQuery);