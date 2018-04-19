for(var i=0; i<document.getElementsByClassName("event-link").length; i++)
{
	document.getElementsByClassName("event-link")[i].addEventListener("click", openEvent);
}
for(var i=0; i<document.getElementsByClassName("top-menu-items").length; i++)
{
	document.getElementsByClassName("top-menu-items")[i].addEventListener("click", openEvent);
}
var active_content = "home-content";
var next_content;
var transition_time = 500;
function openEvent() {
	fadeOut(active_content);
	next_content = this.id+"-content";
	setTimeout(
		function(){fadeIn(next_content); active_content = next_content;},
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