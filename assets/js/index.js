$(document).ready(function() {

	// toggle selected tags in a group
	$(".tag").on("click", function() {
		var element = $(this);
		$(this).toggleClass('active');
		if($(this).siblings('.tag').hasClass('active') && $(this).hasClass('active'))
			$(this).siblings('.tag').removeClass('active');
	});

	// search with selected tags
	$("#search-preference").on("click", function(event) {
		event.preventDefault();
		$.ajax({
	      url: "/my-url",
	      dataType: 'json',
	      data: {
	      	
	      },
		  method: "POST",
	      success: function(responseData) {

	      },
	      error: console.error
	    });
	});
});