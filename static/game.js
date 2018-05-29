let socket = io();
var canvas = document.getElementById('canvas');
canvas.width=800;
canvas.height=600;
var context = canvas.getContext('2d');
context.font ='30px Arial';
socket.on('new Position',(data)=>{
context.clearRect(0,0,800,600);

data.forEach(function(element) {
    console.log(element);
    context.fillText(element.number,element.x,element.y);
}, this);
});

socket.on('test',(data)=>{
console.log(data);
});


var movement ={
    up: false,
    down: false,
    left: false,
    right: false
}

document.addEventListener('keydown',(event)=>{
    switch(event.keyCode)
    {
        case 65: //A
        movement.left =true;
        socket.emit('movement',movement);
        break;
        case 87: //w
        movement.up =true;
        socket.emit('movement',movement);
          break;
        case 68: //D
        movement.right =true;
        socket.emit('movement',movement);
          break;
        case 83: //S
        movement.down =true;
        socket.emit('movement',movement);
          break;
        
    }
});
document.addEventListener('keyup',(event)=>{
    switch(event.keyCode)
    {
        case 65: //A
        movement.left =false;
        socket.emit('movement',movement);
        break;
        case 87: //w
        movement.up =false;
        socket.emit('movement',movement);
          break;
        case 68: //D
        movement.right =false;
        socket.emit('movement',movement);
          break;
        case 83: //S
        movement.down =false;
        socket.emit('movement',movement);
          break;
        
    }
});

