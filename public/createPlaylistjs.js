var create_btn=document.getElementById("createbtn");
var listname;
create_btn.addEventListener('click',function()
{
    listname = document.getElementById("playname").value;
    if(listname == "")
    alert("Enter playlist name!");
    else
    {
        var ob=new Object();
        console.log(listname);
        ob.name = listname;
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/createName');
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(ob));
        xhttp.onload = function()
        {
            alert(xhttp.responseText+"!");
            listname="";
            console.log("created in database");
        }
    }
})