const textInput = document.getElementById("textInput");
const img_btn = document.getElementById("img_btn");

const socket = io();



socket.on("message", (message) =>{
    console.log(message);
});



//add div with msg
socket.on("InputMsg", (msg)=>{
    const div = document.createElement("div");
    div.innerHTML =`<p> ${msg} </p>`;
    document.body.appendChild(div);
})



//send msg and color input
textInput.addEventListener("submit", (e)=> {
    e.preventDefault();
    const color = e.target.elements.colorPicker.value;
    const msg = e.target.elements.msg.value;
    socket.emit("textInput", msg, socket.id);
    socket.emit("colorInput", [color, socket.id]);
    e.target.elements.msg.value = '';
});

//change color of element
socket.on("changeColor", (color, id)=>{
    changeColor(id, color);
    console.log(color);
})
