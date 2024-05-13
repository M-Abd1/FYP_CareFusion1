require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs")
const { registerPartials } = require("ejs");
const path = require("path");
const connDB = require("./config/connDB")
const port = process.env.PORT || 3000;
const http = require("http").createServer(app)
const io = require("socket.io")(http);
//creating session
const session = require("express-session");
app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: true,
      saveUninitialized: true,
    })
  );

// path
const staticPath = path.join(__dirname, "public")
const viewPath = path.join(__dirname, "templates/views")
const partialPath = path.join(__dirname, "templates/partials")

// middleware
app.use(express.static(staticPath));
app.set("view engine", "ejs")
app.set("views", viewPath)



//middleware for handling url encoded data (form data)
app.use(express.urlencoded({ extended: false }))

// buildin middleware for json
app.use(express.json());

// serve static file from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// routing
// root routes
app.use('/',require('./routers/root'))
// seeker routes
app.use('/seeker',require('./routers/seeker'))
// provider routes
app.use('/provider',require('./routers/provider'))
//services routes
app.use('/services', require('./routers/services'))
// 404 page not found
app.get("/*",(req,res)=>{
    res.status(404).render("404");
})
  // Socket

io.on("connection", (socket) =>{
    console.log ("Connected......")
    socket.on ("message", (msg)=>{
        //console.log(msg);
        socket.broadcast.emit('message', msg);
    })
})

// adding port and database connection
const start = async () =>{
    try{
        await connDB(process.env.DATABASE_CONNECTION)
        http.listen(port,()=>{console.log(`Server is listening at port ${port}`)});
    }catch(err){
        console.log(`Database Connection Error ${err}`);
    }
}
start();