var active_content = "home-content";
var next_content;
var transition_time = 500;
var isRegisterOpen = 0;
var registerContent;

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
	if(this.id!="home"&&this.id!="contact")
	{
		registerContent = "register-content-"+this.id;
		console.log(registerContent);
		document.getElementById(registerContent).style.opacity = 0;
	}
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
		function(){fadeIn(next_content); active_content = next_content; document.getElementById(registerContent).style.display = "none";},
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
	for(i=0;i<document.getElementsByClassName("register-for-head").length;i++)
		document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for " + id;
	setTimeout(
		function(){document.getElementById(id+"-register").style.display = "none"; 
					document.getElementById(registerContent).style.display = "flex";document.getElementById(registerContent).style.opacity = 1;}, 
		transition_time);
}

// Register
document.getElementById("register-close").addEventListener("click", closeRegister);
function closeRegister(e) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	e.preventDefault();
}

document.getElementById("myFormRocktaves").onsubmit = function registerForm(e)
{
	name = document.getElementById("register-name").value;
	genre = document.getElementById("register-genre").value;
	contact = document.getElementById("register-contact").value;
	email = document.getElementById("register-email").value;
	members = document.getElementById("register-members").value;
	elemLocation = document.getElementById("register-location").value;
	entry1 = document.getElementById("register-entry1").value;
	entry2 = document.getElementById("register-entry2").value;
	entries = document.getElementById("register-entries").value;
	if(name!="" && genre!="" && contact!="" && email!="" && members!="" && elemLocation!="" && entry1!="" && entry2!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/";
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data:JSON.stringify({
				name: name,
				genre: genre,
				phone: contact,
				email_address: email,
				number_of_participants: members,
				elimination_preference: elemLocation,
				entry1: entry1,
				entry2: entry2,
				enteries: entries
			}),
			dataType: "json",
			error:function(xhr,textstatus,err){
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.";
			}
		}).done(function(response){
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else
	{
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";		
	}
	e.preventDefault();
}

document.getElementById("myFormRapwars").onsubmit = function registerForm(f)
{
	name = document.getElementById("register-name").value;
	rappername = document.getElementById("register-rapper").value;
	contact = document.getElementById("register-contact").value;
	email = document.getElementById("register-email").value;
	city = document.getElementById("register-city").value;
	citypref = document.getElementById("register-location").value;
	if(name!="" && rappername!="" && contact!="" && email!="" && city!="" && citypref!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/";
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data:JSON.stringify({
				name: name,
				rapper_name: rappername,
				phone: contact,
				email_address: email,
				city: city,
				city_of_participation: citypref
			}),
			dataType: "json",
			error:function(xhr,textstatus,err){
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.";
			}
		}).done(function(response){
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else
	{
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";		
	}
	f.preventDefault();
}

document.getElementById("myFormPurplepros").onsubmit = function registerForm(g)
{
	name = document.getElementById("register-name").value;
	contact = document.getElementById("register-contact").value;
	email = document.getElementById("register-email").value;
	city = document.getElementById("register-location").value;
	if(name!="" && contact!="" && email!="" && city!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/";
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data:JSON.stringify({
				name: name,
				phone: contact,
				email_address: email,
				city: city,
			}),
			dataType: "json",
			error:function(xhr,textstatus,err){
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.";
			}
		}).done(function(response){
			document.getElementById("register-overlay").style.display = "flex";
			document.getElementById("register-message").style.display = "flex";
			document.getElementById("register-message-span").innerHTML = response.message;
		});
	}
	else
	{
		document.getElementById("register-overlay").style.display = "flex";
		document.getElementById("register-message-span").innerHTML = "Please fill all the required fields.";
		document.getElementById("register-message").style.display = "flex";		
	}
	g.preventDefault();
}