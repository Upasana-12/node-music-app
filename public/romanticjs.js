var audio = document.createElement("AUDIO");
$(document).ready(function()
{
    getSongs();
})

function getSongs()
{
    let request = new XMLHttpRequest();
    request.open('POST','/songlist');
    request.setRequestHeader('Content-Type','application/json')
    // request.send(JSON.stringify(obj)); 
    request.send();
    request.onload = function()
    {
       var data = JSON.parse(request.responseText);
        console.log(data);
        for(var i in data)
        {
            if(data[i].category == "Romantic")
            addtoDOM1(data[i]);

            if(data[i].category == "PoP")
            addtoDOM2(data[i]);

            if(data[i].category == "Relaxing")
            addtoDOM3(data[i]);
        }
    }
}


function addtoDOM1(obj)
{
    // var div='<div class="col-md-6">'
    // +'<img src="'+obj.image+'" style="width:150px; height:100px;"></img>'
    // +'<button class="btn" onclick=playSong("'+obj.songname+'")>Play</button>'
    // +'<button class="btn" onclick=pauseSong("'+obj.songname+'")>Stop</button>'
    // +'<button class="btn" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    // +'</div>'
    var div='<div class="row">'
    +'<div class="col-md-8">'
    +'<img src="'+obj.image+'" style="width:107px; height:98px;  border-radius: 50%"></img>'
    +'<audio controls id="audi" style="margin-top:10px;"><source src="'+obj.songname+'" type="audio/mp3"></audio>'
    +'<button class="btn btn-primary" style="margin-top:10px;" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    +'</div>'
    +'</div><br/>'

  $('#put1').append(div);
}
function addtoDOM2(obj)
{
    // var div='<div class="col-md-6">'
    // +'<img src="'+obj.image+'" style="width:150px; height:100px;"></img>'
    // +'<button class="btn" onclick=playSong("'+obj.songname+'")>Play</button>'
    // +'<button class="btn" onclick=pauseSong("'+obj.songname+'")>Stop</button>'
    // +'<button class="btn" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    // +'</div>'
    var div='<div class="row">'
    +'<div class="col-md-8">'
    +'<img src="'+obj.image+'" style="width:107px; height:98px;  border-radius: 50%"></img>'
    +'<audio controls id="audi" style="margin-top:10px;"><source src="'+obj.songname+'" type="audio/mp3"></audio>'
    +'<button class="btn btn-primary" style="margin-top:10px;" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    +'</div>'
    +'</div><br/>'

  $('#put2').append(div);
}
function addtoDOM3(obj)
{
    // var div='<div class="col-md-6">'
    // +'<img src="'+obj.image+'" style="width:150px; height:100px;"></img>'
    // +'<button class="btn" onclick=playSong("'+obj.songname+'")>Play</button>'
    // +'<button class="btn" onclick=pauseSong("'+obj.songname+'")>Stop</button>'
    // +'<button class="btn" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    // +'</div>'
    var div='<div class="row">'
    +'<div class="col-md-8">'
    +'<img src="'+obj.image+'" style="width:107px; height:98px;  border-radius: 50%"></img>'
    +'<audio controls id="audi" style="margin-top:10px;"><source src="'+obj.songname+'" type="audio/mp3"></audio>'
    +'<button class="btn btn-primary" style="margin-top:10px;" onclick=addSong("'+obj._id+'") data-toggle="modal" data-target="#myModal">Add to Playlist</button>'
    +'</div>'
    +'</div><br/>'

  $('#put3').append(div);
}
function playSong(name)
{
    // var audi=new Audio(name);
    // audi.play();
     audio.setAttribute("src", name);
     audio.play();
}
function pauseSong(name)
{
   
     audio.setAttribute("src", name);
     audio.pause();
}