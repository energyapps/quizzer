
(function ($) {

  $(document).foundation();

	/*
	 * Script to run it!
	*/

	$(document).ready(function(){    //moved to /server/fetcher-archiver.js 
		makeitwork();
	});

	function makeitwork (){
		// some variables
		var NumOfQuestions = $('.question-individual').length
		
		var QuestionIndex = []; // array of 0's and iteratate through based on order of questions in the dom.....
		var TotalAnswered = 0; //begin with 0 answered questions
		var TotalCorrect = 0;

		// Create progress Bar
		(function ($) { 
			$(document).ready(function() { 
				for (var i = 0; i < NumOfQuestions; i++) {
					// If there's a way to push directly to the style, that would be better				
						var bar ="<div style='width:" + (100/NumOfQuestions) + "%' class='prog' id='prog"+ (i) +"' data-id='" + i +"'></div>"									
					$( "#progress" ).append( $(bar) );				
				};
			});
		}(jQuery)); 

		for (var k = 0; k < NumOfQuestions; k++) {
			QuestionIndex.push(0);
		};

		//clicking the first time per question causes a question to be answered. after that it does nothing. (see if statement inside)
		$('.a-bg').click(function (e) {
			e.preventDefault();
			var current_q = $(this).attr("data-id")
			var barClass;

			var qn = (parseInt(current_q)  + 1);

			if (QuestionIndex[current_q] === 0) {
				//should be first click
				$(this).addClass('active');
				QuestionIndex[current_q]+=1;

				if ($(this).hasClass('correct')) {
					TotalCorrect+=1;
					barClass = "correct"
				} else {
					$(".correct.q" + qn).addClass('inactive');
					barClass = "wrong"
				};
				
				// Results go up one number
				$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")

				var cntx = '#c' + current_q;
				var bar = '#prog' + current_q;

				$(cntx).addClass('active');
				$(bar).addClass(barClass);


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
						var endpoint = parseInt($(this).attr("endpoint"))
						var endclass = this.id

						if (TotalCorrect <= endpoint) {

						// $('#a1').addClass('active');		
							$('#' + endclass).addClass('active');	
							
							// if satisfied break out of each loop.
							return false
						} 
					})
				};
			};
		});



		// on each click of button, change total correct/incorrect number....use that as a trigger

		$(document).ready(function() { 
		//Click the progress bar to scroll to the question
		(function ($) { 
			$('.prog').click(function (e) {			
				var currentBar = $(this).attr("data-id")		
				var ques = '#question' + (currentBar);
				// $('#results').scrollView();
				$(ques).scrollView();

			});
		}(jQuery));  
			// on load, display 0 out of N
			$('#results').html("<h1>" + TotalCorrect + "/" + NumOfQuestions + "</h1>")
		});
	
		(function ($) { 
		  $(document).ready(function() { 
		    $.fn.scrollView = function () {
		      return this.each(function () {	      	
		      	var whereto = $(this).offset().top - 20;
		        $('html, body').animate({	        	
		            scrollTop: whereto
		        }, 1000);
		      });
		    }

		    $(function() {	    	
			  var a = function() {		  	
			    var b = $(window).scrollTop();
			    var d = $("#progress-anchor")[0].offsetTop;		    
			    var c=$("#progress");		    
			    if (b>d) {		    	
			      c.css({position:"fixed",top:"0px"})
			    } else {
			      if (b<=d) {
			        c.css({position:"relative",top:""})
			      }
			    }
			  };
			  $(window).scroll(a);a()
			});
		  });  
		}(jQuery));  
	}
}(jQuery)); 
