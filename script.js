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
	if (id == "standup") {
    document.getElementById("register-bottom").innerHTML = '<span id="'+id+'-register" class="register-for">Register for '+ 'Standup Soapbox' +'</span>';
	}else if (id == "purpleprose") {
		document.getElementById("register-bottom").innerHTML = '<span id="'+id+'-register" class="register-for">Register for '+ 'purple prose' +'</span>';
	}
	 else {
		document.getElementById("register-bottom").innerHTML = '<span id="'+id+'-register" class="register-for">Register for '+id+'</span>';
	}
	document.getElementById("register-bottom").style.display = "flex";
	setTimeout(
		function(){
      document.getElementById("register-bottom").style.opacity = 1;
      if (!document.getElementById(id+"-register").classList.contains("reg-closed")) {
        document.getElementById(id+"-register").addEventListener("click", function() {register(id);});
      }
  }, 
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
	{
		if(id == "standup"){
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for " + "Standup Soapbox";
		}else if(id == "purpleprose"){
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for " + "purple prose";
		}
		else{
			document.getElementsByClassName("register-for-head")[i].innerHTML = "Register for " + id;
		}	
	}
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

function closeRegister(f) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	f.preventDefault();
}

function closeRegister(g) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	g.preventDefault();
}

function closeRegister(h) {
	document.getElementById("register-overlay").style.display = "none";
	document.getElementById("register-message").style.display = "none";
	h.preventDefault();
}

document.getElementById("myFormRocktaves").onsubmit = function registerForm(e)
{
	name = document.getElementById("register-name-ro").value;
	genre = document.getElementById("register-genre-ro").value;
	contact = document.getElementById("register-contact-ro").value;
	email = document.getElementById("register-email-ro").value;
	members = document.getElementById("register-members-ro").value;
	elemLocation = document.getElementById("register-location-ro").value;
	entry1 = document.getElementById("register-entry1-ro").value;
	entry2 = document.getElementById("register-entry2-ro").value;
	entries = document.getElementById("register-entries-ro").value;
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
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
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
	name = document.getElementById("register-name-rw").value;
	rappername = document.getElementById("register-rapper-rw").value;
	contact = document.getElementById("register-contact-rw").value;
	email = document.getElementById("register-email-rw").value;
	city = document.getElementById("register-city-rw").value;
	citypref = document.getElementById("register-location-rw").value;
	if(name!="" && rappername!="" && contact!="" && email!="" && city!="" && citypref!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/rapwars/";
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
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
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

document.getElementById("myFormPurpleprose").onsubmit = function registerForm(g)
{
	name = document.getElementById("register-name-pp").value;
	college = document.getElementById("register-college-pp").value;
	year = document.getElementById("register-year-pp").value;
	contact = document.getElementById("register-contact-pp").value;
	email = document.getElementById("register-email-pp").value;
	poetry = document.getElementById("register-poetry-pp").value;
	city = document.getElementById("register-location-pp").value;
	if(name!="" && college!="" && year!="" && contact!="" && email!="" && city!="" && poetry!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/purpleprose/";
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data:JSON.stringify({
				name: name,
				college: college,
				year_and_stream_of_study: year,
				phone: contact,
				email_address: email,
				entry: poetry,
				city_of_participation: city,
			}),
			dataType: "json",
			error:function(xhr,textstatus,err){
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
				document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
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
document.getElementById("myFormStandup").onsubmit = function registerForm(h)
{
	name = document.getElementById("register-name-ss").value;
	contact = document.getElementById("register-contact-ss").value;
	email = document.getElementById("register-email-ss").value;
	months = document.getElementById("register-months-ss").value;
	previous_competition = document.getElementById("register-pre-comp-ss").value;
	city = document.getElementById("register-location-ss").value;
	if(name!="" && contact!="" && email!="" && months!="" && previous_competition!="" && city!="")
	{
		URL = "https://bits-oasis.org/2018/preregistration/soapbox/";
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			// headers: { 'x-my-custom-header': 'some value' },
			url: URL,
			data:JSON.stringify({
				name: name,
				phone: contact,
				email_address: email,
				time_doing_standup: months,
				previous_competition: previous_competition,
				city_of_participation: city, 
			}),
			dataType: "json",
			error:function(xhr,textstatus,err){
				document.getElementById("register-overlay").style.display = "flex";
				document.getElementById("register-message").style.display = "flex";
        document.getElementById("register-message-span").innerHTML = "ERROR! Please try again.<br>Try registering in <i>incognito mode</i>.<br>If the problem persists, please try registering through a different browser or device.";
        console.log(err);
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
	h.preventDefault();
}
