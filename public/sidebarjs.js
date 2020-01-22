 let pname=document.getElementById('pname');
 var btn = document.getElementById('remove');
var aud = document.getElementById("audi");
let songidToBeAdded;
 function homepage()
  {
	  window.location= '/home'
  }

   function browse()
  {
	  window.location= '/browse'
  }

   function playlist()
  {
	  window.location= '/showList'
  }

   function create()
    {
	  window.location= '/createList'
    }

  function gotologinpage()
  {
      window.location = '/out'
  }

  function addSong(id)
  {
    songidToBeAdded = id;
    let request = new XMLHttpRequest();
    request.open('GET','/getPlist');
    request.setRequestHeader('Content-Type','application/json')
    // request.send(JSON.stringify(obj)); 
    request.send();
    request.onload = function()
    {
       var data = JSON.parse(request.responseText);

        console.log(data);
        data = data.plist;
        $("#app").html("");
        if(data.length>0)
        {
          var div="";
        for(var i in data)
        {
           // addtoModal(data[i]);
           
           div=div+'<div class="col-md-3">'
           +'<button type="button" data-dismiss="modal" onclick=addToPlayList("'+data[i]._id+'") >'+ data[i].name +'</button>'
           +'</div>'
        }
        $("#app").append(div);
        }
        else{
            var div='<div><h2>'
            +'You have not created any Playlist yet. Go to "Create Playlist" to create one!'
            +'</h2></div>'
            $("#app").append(div);
        }
    }
  }

  function addtoModal(obj)
  {
      var div='<div class="col-md-3">'
      +'<button type="button" data-dismiss="modal" onclick=addToPlayList("'+obj._id+'") >'+ obj.name +'</button>'
      +'</div>'
      $("#app").append(div);
  }

  function addToPlayList(id)
  {
    let obj = {
      playlistid : id,
      songid : songidToBeAdded
    }
    console.log(id,songidToBeAdded);
    let request = new XMLHttpRequest();
    request.open('POST','/addSongToPlayList');
    request.setRequestHeader('Content-Type','application/json')
    request.send(JSON.stringify(obj));
    request.onload = function()
    {
      var res=request.responseText;
      console.log(res);
      if(res=="Already")
      alert("Song already exists in that playlist");
      else
      {
      alert("Song added");
      
      }
    } 
    // request.send();
  }

  function removeFromPlayList(pid,sid)
  {
    let obj = {
      playlistid : pid,
      songid : sid
    }
    console.log(pid,sid);
    let request = new XMLHttpRequest();
    request.open('POST','/removeSongFromPlayList');
    request.setRequestHeader('Content-Type','application/json')
    request.send(JSON.stringify(obj));
    request.onload = function()
    {
      var res=request.responseText;
      console.log(res);
      btn.setAttribute("class","btn btn-danger disabled");
     // aud.setAttribute("controls","");
      alert("Song removed");
    } 
  }