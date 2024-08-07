import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import multer from "multer";
import path from "path";

const app=express();
const port=3000;

//using a middleware called multer for uploading files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let posts=[]; 

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('X-HTTP-Method-Override'))


app.get("/",(req,res)=>{
    res.render("index.ejs", { posts: posts });
});

app.get("/create-new-post",(req,res)=>{
    res.render("createpost.ejs");
    
});

//upload.single("thumbnail") for multer
app.post("/create-post", upload.single("thumbnail"), (req,res)=>{
  
      const newPost={
        id: posts.length+1,
        heading: req.body["heading"],
        description: req.body["desc"],
        content: req.body["content"],
        thumbnail: req.file ? `/uploads/${req.file.filename}` : null 
        // saving the path to the uploaded file
      };
      posts.push(newPost); 
      res.render("index.ejs", { posts: posts });
    });


app.get("/view-post/:heading/:id", (req,res)=>{
    const postId= parseInt(req.params.id);
    const postToView= posts.find(p=>p.id===postId);
    res.render("viewpost.ejs",{
      postToView: postToView
    });
})

app.get("/edit-post/:id",(req,res)=>{
      const postId=parseInt(req.params.id);
      const postToEdit=posts.find(p=>p.id===postId);
      res.render("editpost.ejs",{
        postToEdit:postToEdit
      });
});

app.post("/update-post/:id", (req,res)=>{
    const postId=parseInt(req.params.id);
    const postIndex= posts.findIndex(checkPost);
    function checkPost(p){
        return p.id===postId;
    }
    posts[postIndex]={
        id:postId,
        heading: req.body["heading"],
        description: req.body["desc"],
        content: req.body["content"],
        thumbnail: posts[postIndex].thumbnail
        //keeping the existing thumbnail path
    }
    res.render("index.ejs",{
        posts: posts
    });
});

app.get("/delete-post/:id", (req,res)=>{
    const postId=parseInt(req.params.id);
    posts=posts.filter(p=>p.id!==postId);
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});