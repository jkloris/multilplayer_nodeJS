const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var _users = [];

function clear(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,1000,1000);
}


function loop(){
    clear();
    counter();
    draw();
    
    requestAnimationFrame(()=>loop());
}

function counter(){
    ctx.fillStyle = "Black";
    ctx.font = "40px Arial";
    ctx.fillText(_users.length, 20, 40);
}

function init(){
    clear();
    loop();
}

function draw(){
    for(var i in _users){
        ctx.fillStyle=_users[i].Pcolor;
        ctx.fillRect(_users[i].x,_users[i].y,10,10);
        // console.log(_users[i]);
    }
}

document.addEventListener("keydown",e=>{
        socket.emit("move",[e.keyCode,socket.id]);

})

//get users from server  
_users = socket.on("sendUsers",(users)=>{
    users.forEach(user => {
        // console.log(user);        
    });
    _users = users;
})


 init();