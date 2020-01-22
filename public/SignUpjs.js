var username= document.getElementById("u_name");
var firstname= document.getElementById("name");
var pswd = document.getElementById("pswd");
var signupbtn= document.getElementById("signup");

signupbtn.addEventListener("click" , function()
{
	if(username.value=="")
        alert("Enter Username");
    else if(firstname.value=="")
		alert("Enter name"); 
	else if(pswd.value=="")
		alert("Enter Password");
	else
	{
		if(ValidateEmail(username.value)){
		var ob = new Object();
		ob.username = username.value;
        ob.password = pswd.value;
        ob.firstname = firstname.value;
		
		var request = new XMLHttpRequest();
		request.open('POST','/signup');
		request.setRequestHeader("Content-Type","application/JSON");
        request.send(JSON.stringify(ob));
	
		 request.onload=function()
          {
			
			if(request.responseText==="User already Exists")
			alert("User already Exists");
			else{
			 console.log("*************************")
             console.log("created in database");
			  console.log("*************************")
		
			
					window.location="/home";
			}
				
				 
		 }
		}
		else{
			alert('Invalid username!');
		}
	}
		
});

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
   // alert("You have entered an invalid email address!")
    return (false)
}