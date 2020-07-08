const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const Player = require("./public/js/users");
var users = [];

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(path.join(__dirname, "public" )));

io.on("connection", socket => {
    // console.log("Client connected");
    
    //len userovi
    socket.emit("message", "mas maleho pandrlaka");


    users.push(new Player(socket.id));
    io.emit("sendUsers", users);


    //bradcast znamena ze emituje vsetkym okrem usera
    socket.broadcast.emit("message", socket.id + " sa pripojil");

    //io.emit() vsetkym clientom

    socket.on("disconnect", ()=>{

        users = delUser(socket.id);     
        io.emit("sendUsers", users);   
        io.emit("message", socket.id + " odišiel");
        
    })

    socket.on("textInput", (msg, id)=>{
        if(msg != ''){
            io.emit("message", id + ': ' +msg);
            io.emit("InputMsg", id + ': '+ msg);
        }
    })

    socket.on("colorInput",([color,id])=>{
        var index = users.findIndex(user => user.id === id);
        if(index != -1){
            users[index].Pcolor = color;
            io.emit("sendUsers", users)

        }
    })  ;

    socket.on("move",([keycode,id])=>{
        var index = users.findIndex(user => user.id === id);
        //move player  
        const a = 4;
        if(keycode==37){ //left
            users[index].x-=a;
        }else if(keycode==38){ //up
            users[index].y-=a;
        } else if(keycode==40){ //down
            users[index].y+=a;
        }else if(keycode==39){ //right
            users[index].x+=a;
        }

        io.emit("sendUsers", users); 
    })
    
})

delUser = function(id){
        var index = users.findIndex(user => user.id === id);
        if(index != -1)   users.splice(index,1);
        return users;
}

const PORT = process.env.PORT || 8888;

server.listen(PORT, ()=>console.log("running on " + PORT));


