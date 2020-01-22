const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

router.use(express.static(path.join(__dirname,'../public')));

// var songsSchema = new mongoose.Schema({
//     // songs : { type : Array , default : [] },
//     songname : String,
//     category : String,
//     image : String
//   })

//   var browseSchema = new mongoose.Schema({
//     category : String,
//     photoname : String
//   })
//   var playlistSchema = new mongoose.Schema({
//     name : String,
//     ownerid : { type: schema.Types.ObjectId, ref : 'users' },
//    // songs : [{type : schema.Types.ObjectId, ref : 'songs'}]
//   //  songs : Array
//   songs :  [{ type: schema.Types.ObjectId, ref: 'songs' }]
//   }) 

  // var userSchema = new mongoose.Schema({
  //   username : String,
  //   password : String,
  //   firstname : String,
  //   // plist : { type : Array , default : [] },
  //  plist : [ { type: schema.Types.ObjectId, ref: 'playlists'  } ],
  // })

  // var song = mongoose.model('songs',songsSchema);
  const song = require('../models/song');
  // var playlist = mongoose.model('playlists',playlistSchema);
  const playlist = require('../models/playlist');
  // var user = mongoose.model('users',userSchema);
  const user = require('../models/user');
  // var browse = mongoose.model('categories',browseSchema);
  const browse = require('../models/browse');

function logger(req,res,next)
{
    // console.log(req.path, new Date().toLocaleString());
    console.log("hello logger");
   if(req.session.isLogin==1)
   next();
   else
   {
    req.session.isLogin = 0;
    req.session.destroy();
    res.redirect('/');
   }
}

router.post('/login',function (req, res)
  {
	  console.log(req.body);
	  user.find({
		username : req.body.username,
		password : req.body.password
	})
	 .then(data => {
	 if(data.length>0)
	 {
		console.log("valid user");
	//	console.log(req.session.data);
		
			req.session.isLogin = 1;
			req.session._id = data[0]._id;
      req.session.username=data[0].username;
      req.session.firstname=data[0].firstname;
			req.session.password = data[0].password;

      // let query = [{ path : 'plist' , select : { 'name' : 1 , 'songs' : 1 , 'ownerid' : 1  } }];
      //     user.findOne({ "_id" : req.session._id }).populate( query ).exec(function(error,result) {
      //       if(error)
      //       throw error;
      //       else {
      //         console.log('-' + result + '-');
      //        // req.session = result;
      //        req.session.plist = result.plist;
      //        console.log(req.session);
      //       res.send("User");
      //     }
      //   })
        res.send("User");
	 }
	 else{
		 res.send("Invalid User");
	 }
   })
   .catch(err => {
     console.error(err)
     res.send(err)
   })
      
  });

  router.get('/userPlaylistSonngs/:pro',logger,function(req,res)
  {
    let id = req.params.pro;
    let query = [{ path : 'songs' , select : { 'songname' : 1 , 'category' : 1 , 'image' : 1  } }];
    playlist.findOne({ "_id" : id }).populate( query ).exec(function(error,result)
    {
      if(error)
      throw error;
      else {
        console.log('Dekh upu' + result);
        res.render('plistSongs',{ obj : req.session , pobj : result });
      }
    })
  })

  router.post('/addSongToPlayList',function(req,res)
  {
    console.log(req.body);
    playlist.find(
      {
        $and: [
               { "_id" : { $in : req.body.playlistid } },
               { songs : { $in : [ req.body.songid ]  } }
             ]
      }
    )
    .then(data => {
      console.log('data of add to plist '+data);
      console.log('-----------')
      if(data.length>0)
      res.send("Already");
      else
      {
        playlist.updateOne({ "_id" : req.body.playlistid }, { $push : { songs :  req.body.songid } },function(error,result)
        {
          if(error)
          throw error;
          else {
            console.log(result);
            res.send("SONG ADDED");
          }
        })
      }
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    })

  
  })

  router.post('/removeSongFromPlayList',function(req,res)
  {
    console.log(req.body);
    playlist.updateOne( { "_id" : req.body.playlistid } , { $pull : { songs : { $in : [req.body.songid ] }} },function(error,result)
    {
      if(error)
      {
        console.log(error);
      throw error;
      }
      else {
        console.log('removed');
        res.send();
      }
    })
  })
  router.get('/home',logger,function(req,res)
  {
	  console.log("-----------------------")
	  console.log(req.session)
	  //console.log(req.session.data)
	  console.log("-----------------------")
	  
	 res.render('home',{obj : req.session});

  });

  router.get('/signupPage',function(req,res)
  {
    res.render('SignUp');
  });

  router.post('/signup',function(req,res)
  {
    console.log(req.body);
    var obj=req.body;
    console.log(obj);
    user.findOne({"username":req.body.username},function(error,result)
    {
      if(error)
      {
        res.send(error);
      }
      else{
        if(result)
        {
          res.send("User already Exists");
        }
        else{
          user.create(obj,function(err,result)
          {
            if(err)
            throw err;
            else
            {
              console.log("created successfully");
              req.session._id = result._id;
              console.log('in user created----------');
              console.log(req.session);
              console.log('after in');

              req.session.isLogin = 1;
              // req.session._id = result._id;
               req.session.username=obj.username;
               req.session.firstname=obj.firstname;
               req.session.password = obj.password;
              // req.session.plist = [];
              console.log('created------------');
              console.log(req.session);
              console.log('-----------------');
               res.send("Created");

            }
          })
        }
      }
    })

  //   req.session.isLogin = 1;
  //  // req.session._id = result._id;
  //   req.session.username=obj.username;
  //   req.session.firstname=obj.firstname;
  //   req.session.password = obj.password;
  //  // req.session.plist = [];
  //  console.log('created------------');
  //  console.log(req.session);
  //  console.log('-----------------');
  //   res.send("Created");
  })

  router.post('/songlist',logger,function(req,res)
  {
    
    song.find({

    }).exec(function(error,result)
    {
      if(error)
      throw error;
      else
      {
        console.log(result);
        res.send(result);
      }
    })
  })

  router.get('/out',logger,function(req,res)
{
	req.session.isLogin = 0;
	req.session.destroy();
	res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.redirect('/');
});

router.get('/createList',logger,function(req,res)
{
    res.render('createPlaylist',{obj : req.session});
})

router.post('/createName',logger,function(req,res)
{
    console.log(req.body);
    var obj=req.body;
    obj.ownerid = req.session._id;
    playlist.findOne({
      "name" : req.body.name,
      "_id" : req.session._id
    },function(error,result)
    {
      if(error)
      {
        res.send(error);
      }
      else{
        if(result)
      {
        res.send("Playlist already exists!");
      }
      else{
        playlist.create(obj,function(err,result)
        {
          if(err)
          throw err;
          else
          {
            console.log('pl '+result);
            console.log('-----------rs--')
            req.session.plist=result;
            console.log('-----------rs--')
            user.updateOne({ "_id" : req.session._id }, {$push : {plist : result._id}} , function(err, result)
            {
              if(err)
              throw err;
              else
              {
                console.log('u'+result);
               
              }
            })
          }
         // req.session.plist=result;
        })
        res.send("Created");
      }
      }
    })
   
})

router.get('/browse',logger,function(req,res)
{
    res.render('BrowseSongs',{obj : req.session});
})

router.post('/categorylist',logger,function(req,res)
{
  
  browse.find({

  }).exec(function(error,result)
  {
    if(error)
    throw error;
    else
    {
      console.log(result);
      res.send(result);
    }
  })
})

router.get('/Romantic',logger,function(req,res)
{
    res.render('romantic',{obj : req.session});
})

router.get('/PoP',logger,function(req,res)
{
    res.render('pop',{obj : req.session});
})

router.get('/Relaxing',logger,function(req,res)
{
    res.render('relaxing',{obj : req.session});
})

router.get('/showList',logger,function(req,res)
{
  res.render('userPlist',{obj : req.session});
})

router.get('/getPlist',logger,function(req,res)
{
  let query = [{ path : 'plist' , select : { 'name' : 1 , 'songs' : 1 , 'ownerid' : 1  } }];
  user.findOne({ "_id" : req.session._id }).populate( query ).exec(function(error,result) {
    if(error)
    throw error;
    else {
      console.log('-' + result + '-');
     // req.session = result;
    // req.session.plist = result.plist;
     console.log(req.session);
    res.send(result);
  }
})   
})

module.exports = router;