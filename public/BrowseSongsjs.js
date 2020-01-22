$(document).ready(function()
{
    getCategories();
})

function getCategories()
{
    let request = new XMLHttpRequest();
    request.open('POST','/categorylist');
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
    var div='<div class="row">'
    +'<div class="col-md-4">'
    +'<a href="/Romantic">'
    +'<img src="'+obj.photoname+'" style="width:150px; height:100px; cursor:pointer;">'
    +'</a>'
    +'</div>'
    +'</div>'

    $("#romantic").append(div);
}

function addtoDOM2(obj)
{
    var div='<div class="row">'
    +'<div class="col-md-4">'
    +'<a href="/PoP"><img src="'+obj.photoname+'" style="width:150px; height:100px; cursor:pointer;"/></a>'
    +'</div>'
    +'</div>'

    $("#pop").append(div);
}

function addtoDOM3(obj)
{
    var div='<div class="row">'
    +'<div class="col-md-4">'
    +'<a href="/Relaxing"><img src="'+obj.photoname+'" style="width:150px; height:100px; cursor:pointer;"/></a>'
    +'</div>'
    +'</div>'

    $("#relaxing").append(div);
}

function getCatList(cat)
{
    console.log(cat);
    window.location='/'+cat;
}