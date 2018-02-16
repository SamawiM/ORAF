$(function(){
	// display number of selected tags
	$('.badge').text($('.active').length);

	// toggle selected tags in a group
	$(".tag").on("click", function() {
		var element = $(this);
		$(this).toggleClass('active');
		if($(this).siblings('.tag').hasClass('active') && $(this).hasClass('active')) 
			$(this).siblings('.tag').removeClass('active');

		$('.badge').text($('.active').length);
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
    $( "#slider-range" ).slider({
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

});