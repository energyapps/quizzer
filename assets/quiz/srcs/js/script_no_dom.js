
$(document).ready(function(){    //moved to /server/fetcher-archiver.js 
	makeitwork();
});



function makeitwork (){
	// some variables
	// var NumOfQuestions = data.length;
	
	var NumOfQuestions = 11;
	var QuestionIndex = []; // array of 0's and iteratate through based on order of questions in the dom.....
	var TotalAnswered = 0; //begin with 0 answered questions
	var TotalCorrect = 0;

	for (var k = 0; k < NumOfQuestions; k++) {
		QuestionIndex.push(0);
	};

	(function ($) { 
	//clicking the first time per question causes a question to be answered. after that it does nothing. (see if statement inside)
	$('.a-bg').click(function (e) {
		e.preventDefault();
		var current_q = $(this).attr("data-id")

		var qn = (parseInt(current_q)  + 1);

		if (QuestionIndex[current_q] === 0) {
			//should be first click
			$(this).addClass('active');
			QuestionIndex[current_q]+=1;

			if ($(this).hasClass('correct')) {
				TotalCorrect+=1;
			} else {
				$(".correct.q" + qn).addClass('inactive');
			};
			
			// Results go up one number
			$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")

			var cntx = '#c' + current_q;

			$(cntx).addClass('active');

			//Do something when it gets to N questions
			TotalAnswered +=1;
			if (TotalAnswered === NumOfQuestions) {
				var facelink = "";
				var twitterlink = "http://twitter.com/home?status=";
				var message = "I got " + TotalCorrect + "/" + NumOfQuestions +" questions right on @energy's power plant quiz. Test your knowledge and see how you stack up http://bit.ly/PowerPlantsQuiz"
				var uri = encodeURI(message);

				// add in social buttons and scores text
				$('#social-buttons').addClass('active')
				$("#facebook-quiz a").attr("href", facelink)
				$("#twitter-quiz a").attr("href", twitterlink + uri)

// Loop through each correct answer bucket and create the if statemet to attach correct classes 
				
				$( "#footer-container" ).children('div').each(function(){
				// $(".result-text").get().each(function(){
					var endpoint = parseInt($(this).attr("endpoint"))
					var endclass = this.id

					if (TotalCorrect < endpoint) {

					// $('#a1').addClass('active');		
						$('#' + endclass).addClass('active');	
						
						// if satisfied break out of each loop.
						return false
					} 
				})
			};
		};
	});
	}(jQuery));  


	// on each click of button, change total correct/incorrect number....use that as a trigger

	(function ($) { 
		$(document).ready(function() { 

			// on load, display 0 out of N
			$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")
		});
	}(jQuery));  

}
