var active_content = "home-content";
var next_content;
var transition_time = 500;
var isRegisterOpen = 0;

for(var i=0; i<document.getElementsByClassName("event-link").length; i++)
{
	document.getElementsByClassName("event-link")[i].addEventListener("click", openEvent);
}
for(var i=0; i<document.getElementsByClassName("top-menu-items").length; i++)
{
	document.getElementsByClassName("top-menu-items")[i].addEventListener("click", openEvent);
}

function openEvent() {
	fadeOut(active_content);
	document.getElementById("register-bottom").style.height = "10%";
	document.getElementById("register-content").style.opacity = 0;

	next_content = this.id+"-content";
	if(next_content == "home-content" || next_content == "contact-content")
	{
		if(!isRegisterOpen)
			fadeOutRegister();
		else
		{
			isRegisterOpen=!isRegisterOpen;
			setTimeout(function(){fadeOutRegister();}, 500);
		}
		setTimeout(function(){fadeIn("nav-bottom");}, transition_time);
	}
	else
	{
		fadeOut("nav-bottom");
		setTimeout(function(){fadeInRegister(id);}, transition_time);
	}
	id = this.id;
	setTimeout(
		function(){fadeIn(next_content); active_content = next_content; document.getElementById("register-content").style.display = "none";},
		transition_time);
}
function fadeOut(id) {
	document.getElementById(id).style.opacity = 0;
	setTimeout(
		function(){document.getElementById(id).style.display = "none";}, 
		transition_time);
}
function fadeIn(id) {
	document.getElementById(id).style.display = "flex";
	setTimeout(
		function(){document.getElementById(id).style.opacity = 1;}, 
		100);
}
function fadeInRegister(id) {
	document.getElementById("register-bottom").innerHTML = '<span id="'+id+'-register" class="register-for">Register for '+id+'</span>';
	document.getElementById("register-bottom").style.display = "flex";
	setTimeout(
		function(){document.getElementById("register-bottom").style.opacity = 1; document.getElementById(id+"-register").addEventListener("click", function() {register(id);})}, 
		100);
}
function fadeOutRegister() {
	document.getElementById("register-bottom").style.opacity = 0;
	setTimeout(
		function(){document.getElementById("register-bottom").style.display = "none";}, 
		transition_time);
}	
function register(id) {
	isRegisterOpen = !isRegisterOpen;
	document.getElementById("register-bottom").style.height = "100%";
	document.getElementById(id+"-content").style.opacity = 0;
	setTimeout(
		function(){document.getElementById(id+"-content").style.display = "none";}, 
		transition_time);
	document.getElementById(id+"-register").style.opacity = 0;
	document.getElementById("register-for-head").innerHTML = "Register for " + id;
	setTimeout(
		function(){document.getElementById(id+"-register").style.display = "none"; 
					document.getElementById("register-content").style.display = "flex";document.getElementById("register-content").style.opacity = 1;}, 
		transition_time);
}