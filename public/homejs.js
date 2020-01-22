var audio = document.createElement("AUDIO");
$(document).ready(function()
{
    getSongs();
})

function getSongs()
{
    // let obj = {
    //     start = 0,
    //     end = 5
    // }
    // console.log(obj);
    let request = new XMLHttpRequest();
    request.open('POST','/songlist');
    request.setRequestHeader('Content-Type','application/json')
    // request.send(JSON.stringify(obj)); 
    request.send();
    request.onload = function()
    {
       var data = JSON.parse(request.responseText);
        console.log(data);
        for(var i=0;i<6;i++)
        {
            addtoDOM(data[i]);
        }
    }
}

// function setSong(name)
// {
//   name = decodeURIComponent(name);
//   audio.setAttribute("src",name);
//   songname.html(name);
//   audio.paused = true;
//   playsong();
// }

function addtoDOM(obj)
{
//     var div= '<div class="row">'
//     +'<div class="col-sm-9" style="cursor:pointer;" onclick=setSong("'+encodeURIComponent(obj.songname)+'")>'
//       +'<p>'+obj.songname+'</p>'
//     +'</div>'
//     +'<div class="col-sm-3">'
//       +'<button class="btn btn-default" onclick=addToPlaylist("'+encodeURIComponent(obj)+'") >Add To Playlist</button>'
//     +'</div>'
//   +'</div>'

    // var div='<div class="col-md-6">'
    // +'<img src="'+obj.image+'" style="width:150px; height:100px;"></img>'
    // +'<button class="btn" onclick=playSong("'+obj.songname+'")>Play</button>'
    // +'<button class="btn" onclick=pauseSong("'+obj.songname+'")>Stop</button>'
    // +'</div>'
    var div='<div class="col-md-6">'
    +'<img src="'+obj.image+'" style="width:107px; height:98px;  border-radius: 50%"></img>'
    +'<audio controls id="audi"><source src="'+obj.songname+'" type="audio/mp3"></audio>'
    +'</div>'

  $('#div1').append(div);
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
// var aAudio = new Audio('achilaghti.mp3');
// var bAudio = new Audio('b.mp3');
// function myAudioFunction(letter) {
//     if(letter == '1') {
//         aAudio.play();
//     } else if(letter == 'b') {
//         bAudio.play();
//     }
// }