var username= document.getElementById("u_name");
var pswd = document.getElementById("pswd");
var loginbtn= document.getElementById("login");

loginbtn.addEventListener("click" , function()
{
	if(username.value=="")
		alert("Enter Username");
	else if(pswd.value=="")
		alert("Enter Password");
	else
	{
		var ob = new Object();
		ob.username = username.value;
		ob.password = pswd.value;
		
		var request = new XMLHttpRequest();
		request.open('POST','/login');
		request.setRequestHeader("Content-Type","application/JSON");
        request.send(JSON.stringify(ob));
	
		 request.onload=function()
          {
			
			 console.log("*************************")
              console.log(request.responseText);
			  console.log("*************************")
		
				if(request.responseText=="Invalid User")
				{
					alert("wrong user");
				}
				else
				{
					window.location="/home";
				}
				 
              
          }
	}
		
});