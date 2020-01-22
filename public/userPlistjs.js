$(document).ready(function()
{
    getlists();
})

function getlists()
{
    let request = new XMLHttpRequest();
    request.open('GET','/getPlist');
    request.setRequestHeader('Content-Type','application/json')
    // request.send(JSON.stringify(obj)); 
    request.send();
    request.onload = function()
    {
        if(request.responseText=="null")
        {
            var div='<div><h2>'
            +'You have not created any Playlist yet. Go to "Create Playlist" to create one!'
            +'</h2></div>'
            $("#list").append(div);
        }
        else
        {
       var data = JSON.parse(request.responseText);

        console.log(data);
        data = data.plist;
        if(data.length>0)
        {
        for(var i in data)
        {
            addtoDOM(data[i]);
        }
        }
        else{
            var div='<div><h2>'
            +'You have not created any Playlist yet. Go to "Create Playlist" to create one!'
            +'</h2></div>'
            $("#list").append(div);
        }
    }
    }
}

// function addtoDOM(obj)
// {
//     var div='<div class="row"><div class="col-md-3">'
//     +'<a href="/userPlaylistSonngs/"'+obj._id+'" id="disp">&diams;'+obj.name+'</a>'
//     +'</div></div>'
//     $("#list").append(div);
// }
function addtoDOM(obj)
{
    var div='<div class="row"><div class="col-md-3">'
    +'<a href="/userPlaylistSonngs/'+obj._id+'" id="disp">&diams;'+obj.name+'</a>'
    +'</div></div>'
    $("#list").append(div);
}