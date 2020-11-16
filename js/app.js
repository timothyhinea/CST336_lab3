var usernameAvailable=false;

//Displaying City from API after typing a zipcode
$("#zip").on("change", async function(){
	
	let zipCode = ($("#zip").val());
	let url =  `https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip?zip=${zipCode}`;
	let response = await fetch(url);
	let data = await response.json();
	//console.log(data);
	if(!data){
		$("#zipCodeNotFound").html("Zip Code Not Found");
		$("#zipCodeNotFound").css("color", "red");
		$("#city").html("");
		$("#latitude").html("");
		$("#longitude").html("");
	}else{
		$("#zipCodeNotFound").html("");
		$("#city").html(data.city);
		$("#latitude").html(data.latitude);
		$("#longitude").html(data.longitude);
	}
});//ZIP

$("#state").on("change", async function(){
	let state = ($("#state").val());
	let url = `https://itcdland.csumb.edu/~milara/ajax/countyList.php?state=${state}`;
	let response = await fetch(url);
	let data = await response.json();
	//console.log(data);
	$("#county").html("<option> Select one </option>")
	for(let i = 0; i < data.length; i++){
		$("#county").append(`<option> ${data[i].county} </option>`)
	}
	
});//STATE

$("#username").on("change", async function(){
	
	let username = ($("#username").val());
	let url = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${username}`;
	let response = await fetch(url);
	let data = await response.json();
	
	if(data.available){
		$("#usernameError").html("Username available!");
		$("#usernameError").css("color","green");
		usernameAvailable = true;
	}else{
		$("#usernameError").html("Username not available!");
		$("#usernameError").css("color","red");
		usernameAvailable = false;
	}
	
});// user Name

$("#signupForm").on("submit", function(e)
	{
		if(!isFormValid()){
			e.preventDefault();
		}
	})
	
	function isFormValid(){
		isValid = true;
		if(!usernameAvailable){
			isValid = false;
		}
		if($("#username").val().length == 0){
			isValid = false;
			$("#usernameError").html("Username is required");
			$("#usernameError").css("color","red");
		}
		if($("#password").val()!= $("#passwordAgain").val()){
			$("#passwordAgainError").html("Password Missmatch!");
			$("#passwordAgainError").css("color", "red");
			isValid = false;
		}
		if($("#password").val().length < 6){
			$("#passwordAgainError").html("Password must be at least 6 characters");
			$("#passwordAgainError").css("color", "red");
			isValid = false;
		}
		
		return isValid;
	}