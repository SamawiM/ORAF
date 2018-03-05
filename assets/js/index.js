$(function(){
	// display number of selected tags
	$('.badge').text($('.active').length);
    $('.datepicker').datepicker({
        minDate: 0,
        onSelect: function(selected) {
             $("#datepicker2").datepicker("option",{ minDate: new Date(selected)});
        }
    });
    
	// toggle selected tags in a group
	$(".tag").on("click", function() {
        var value = $(this).text().split(" ")[1];
		$(this).toggleClass('active');
		if($(this).siblings('.tag').hasClass('active') && $(this).hasClass('active')) {
			$(this).siblings('.tag').removeClass('active');
        }

		$('.badge').text($('.active').length);
        $(this).parent('div').find('input:hidden').val(value);
	});

	// search with selected tags
	// $("#search-preference").on("submit", function(event) {
	// 	event.preventDefault();
 //        var data = $(this).serialize();
 //        console.log(data);
	// 	$.ajax({
 //            url: '/search',
 //            method: 'POST',
 //            dataType: 'json',
 //            data: data,
 //            success: function(html) {
 //                alert(html);
 //            }
 //        }).done(function(data) {
           
 //            alert(data.message);
 //        }).fail(function(error) {
 //            alert(JSON.stringify(error));
 //        });
	// });

	// initialize price range slider
    $("#slider-range").slider({
      range: true,
      min: 100,
      max: 1000,
      step: 10,
      values: [ 150, 350 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});

function validatePhone(phoneNumber) {
    var numbers = "[0-9]";
    var phoneNo = phoneNumber.value;
    if(phoneNo.length < 10){
        phoneNumber.setCustomValidity('Phone Number must be of 10 digits.');
    }else{
        if(!phoneNumber.value.match(numbers)){
            phoneNumber.setCustomValidity('Only numbers are allowed in this field.');
        }else{
            phoneNumber.setCustomValidity('');
        }
    }
}

function validatePassword(passwordField) {
    var password = document.getElementById("password");
    if (passwordField.value != password.value) {
        passwordField.setCustomValidity('Both passwords must match.');
    } else {
        // input is valid -- reset the error message
        passwordField.setCustomValidity('');
    }
}

function navigate(){
    var cardOne = document.getElementById("collapseOne");
    var cardTwo = document.getElementById("collapseTwo");
    console.log("In JS");
    if(cardOne.classList.contains("show"))
        $('#collapseOne').collapse('hide');
    else
        $('#collapseOne').collapse('show');

    if(cardTwo.classList.contains("show"))
        $('#collapseTwo').collapse('hide');
    else
        $('#collapseTwo').collapse('show');
    
    return false;
}

function validatePrefs(){

    var isValid = true;

    var diet = document.getElementById("diet");
    var dietErrors = document.getElementById("dietErrors");
    if(diet.getElementsByClassName("active").length == 0){
        dietErrors.innerHTML="Please select one option.";
        isValid = false
    }else{
        dietErrors.innerHTML="";
    }

    var smoking = document.getElementById("smoking");
    var smokingErrors = document.getElementById("smokingErrors");
    if(smoking.getElementsByClassName("active").length == 0){
        smokingErrors.innerHTML="Please select one option.";
        isValid = false
    }else{
        smokingErrors.innerHTML="";
    }

    var alcohol = document.getElementById("alcohol");
    var alcoholErrors = document.getElementById("alcoholErrors");
    if(alcohol.getElementsByClassName("active").length == 0){
        alcoholErrors.innerHTML="Please select one option.";
        isValid = false
    }else{
        alcoholErrors.innerHTML="";
    }

    var sharing = document.getElementById("sharing");
    var sharingErrors = document.getElementById("sharingErrors");
    if(sharing.getElementsByClassName("active").length == 0){
        sharingErrors.innerHTML="Please select one option.";
        isValid = false
    }else{
        sharingErrors.innerHTML="";
    }

    var earlyDate = $("#datepicker1").datepicker("getDate");
    var earlyDateErrors = document.getElementById("earlyDateErrors");
    if(earlyDate == null){
        earlyDateErrors.innerHTML="Please select move-in date.";
        isValid = false;
    }else{
        earlyDateErrors.innerHTML="";
    }

    var lateDate = $("#datepicker2").datepicker("getDate");
    var lateDateErrors = document.getElementById("lateDateErrors");
    if(lateDate == null){
        lateDateErrors.innerHTML="Please select move-in date.";
        isValid = false;
    }else{
        lateDateErrors.innerHTML="";
    }

    return false;
}