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
	$("#search-preference").on("submit", function(event) {
		event.preventDefault();
		$.ajax({
            url: '/search',
            method: 'POST',
            dataType: 'json',
            data: {
                smokinghabit: $('.active .smoking-habit').val(),
                dietaryhabit: $('.active .dietary-habit').val()
            }
        }).done(function(data) {
           
            alert(data.message);
        }).fail(function(error) {
            alert(JSON.stringify(error));
        });
	});

	// initialize price range slider
    $("#slider-range").slider({
      range: true,
      min: 100,
      max: 1000,
      values: [ 150, 350 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );

    $("#nextSubmit").on("submit",function(){
        console.log("In JS");
        var collapseOne = $("#collapseOne");
        var collapseTwo = $("#collapseTwo");
        console.log("First ",collapseOne," Second ",collapseTwo);
    });
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