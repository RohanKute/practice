const express = require('express');
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

const methodOverride = (req, res, next) => {
    if (req.query._method === 'DELETE') {
      req.method = 'DELETE';
    }
    else if (req.query._method === 'PATCH') {
      req.method = 'PATCH';
    } 
    next();
};

app.use(methodOverride);


// demo object to store comments 
let commentsObjArr = [{
        id : uuidv4() ,
        name : "Rohan" ,
        comment : "Whats up"
    },
    {   
        id : uuidv4(),
        name : "Siddhi" ,
        comment : "Weather is good today!"
        
    },
    {
        id :uuidv4() ,
        name : "Aditya" ,
        comment : "Happy Diwali"
    },
    { 
        id : uuidv4(),
        name : "Swara" ,
        comment : "Good morning!"  
    }];



app.listen(3000 , ()=>{
    console.log("Server is started");
});

app.get('/form' , (req , res)=>{
    console.log("Form loaded");
    res.render('form');
});

app.get('/comments' , (req , res)=>{
    res.render('comments' , {commentsObjArr});
});

app.post('/addComment', (req , res) =>{
    const {name , commentText } = req.body;
    let dummyObj = { 
        id : uuidv4() ,
        name : name ,
        comment : commentText
    };
    commentsObjArr.push(dummyObj);
    res.redirect('/comments');   
})

app.get('/comments/:id' , (req , res)=>{
    let userId = req.params.id;
    let userDetail = commentsObjArr.find(userData => userData.id === userId);
    res.render('details' , {userDetail});
});

app.delete('/comments/:id/delete' , (req , res)=>{
    let userId = req.params.id;
    commentsObjArr = commentsObjArr.filter(userData => userData.id != userId);
    res.redirect('/comments');
});

app.get('/comments/:id/edit' , (req , res)=>{
    let userId = req.params.id;
    let userDetail = commentsObjArr.find(userData => userData.id === userId);
    res.render('edit' , {userDetail});
});

app.patch('/comments/:id/edit/editComment', (req , res) =>{
    console.log(req.body);
    let userId = req.params.id;
    let userDetail = commentsObjArr.find(userData => userData.id === userId);
    let { commentText } = req.body;
    userDetail.comment = commentText;
    res.redirect('/comments');
});



