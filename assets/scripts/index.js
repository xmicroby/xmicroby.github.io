$(document).ready(function() {
	var pageState = 0;
	var pages = [".home, #main-pic", ".about, #main-pic", ".work"];

	function copyEmail() {
		var email = document.getElementById("hiddenemail");
		email.select();
		document.execCommand("copy");
		alert("Copied the email: " + email.value);
	}

	function homeToAbout() {
		$("#basic-info").fadeOut();
		$("#detailed-info").fadeIn();
		$("#main-pic").animate({
			width: "33%"
		});
		// $(animate the image into a circle)
		$("#circle").animate({
			width: "300px",
			height: "300px",
			borderRadius: "50%"
		});

		$("#home-img").animate({
			top: "85%"
		});

	}

	function aboutToHome() {
		$("#detailed-info").fadeOut();
		$("#basic-info").fadeIn();
		$("#main-pic").animate({
			width: "66%"
		});
		$("#circle").animate({
			width: "100%",
			height: "100%",
			borderRadius: "0%"
		});

		$("#home-img").animate({
			top: "50%"
		});
	}

	function leftToRight(newPage) {
		//shift out content to right
		$("#content").animate({left: "100%"}, 200, function() {
			//replace content CAN WRITE BETTER CODE LIKE A FOR LOOP 






			$("#main-pic").hide();
			$(".home").hide();
			$(".about").hide();
			$(".work").hide();
			$(pages[newPage]).show();
			if(newPage == 0) {
				$("#main-pic").css("width", "66%");
				$("#circle").css({
					width: "100%",
					height: "100%",
					borderRadius: "0%"
				});
				$("#home-img").css({
					top: "50%"
				});
			}
			else if(newPage == 1) {
				$("#main-pic").css("width", "33%");
				$("#circle").css({
					width: "300px",
					height: "300px",
					borderRadius: "50%"
				});

				$("#home-img").css({
					top: "85%"
				});
			}

			$("#content").css("left", "-100%");
			//shift out content to right
			$("#content").animate({left: "0%"}, 200);

		});
		
	}

	function rightToLeft(newPage) {
		//shift out content to left
		$("#content").animate({left: "-100%"}, 200, function() {
			//replace content
			$("#main-pic").hide();
			$(".home").hide();
			$(".about").hide();
			$(".work").hide();
			$(pages[newPage]).show();
			if(newPage == 0)
				$("#main-pic").css("width", "66%");
			else if(newPage == 1)
				$("#main-pic").css("width", "33%");
			$("#content").css("left", "100%");
			//shift out content to right
			$("#content").animate({left: "0%"}, 200);
		});
	}

	$("#home, #about, #work").click(function() {
		//find the pageState for the desired next page
		console.log("prev page is: " + pageState + " nextpage is: " + this.id);
		var nextPage = 0;
		if(this.id == "about") 
			nextPage = 1;
		else if(this.id == "work")
			nextPage = 2;

		//checks if the current tab is home and if the next tab is about
		if(pageState == 0 && nextPage == 1)
			homeToAbout();
		else if(pageState == 1 && nextPage == 0){
			aboutToHome();
		}
		else if(pageState < nextPage){
			rightToLeft(nextPage);
		}
		else if(pageState > nextPage) {
			leftToRight(nextPage);
		}
		pageState = nextPage;
		//dont do anything if pageState == nextPage
	});

	// function typewriterDescription() {
	// 	var desc = $("#description").children();
	// 	var i = 0;
	// 	while (true) {
	// 		console.log("asdf");
	// 		var old = (i - 1) % desc.length;
	// 		$(desc[old]).delay(5000).removeClass("desc-type");
	// 		$(desc[old]).hide();			
	// 		$(desc[i]).show();
	// 		$(desc[i]).addClass("desc-type");
	// 		i = (i + 1) % desc.length;
	// 	}

	// }

	// typewriterDescription();

});

