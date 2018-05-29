const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port',3000);
app.use('/static',express.static(__dirname+'/static'));


//
app.get('/',(request,response)=>{
    response.sendFile(path.join(__dirname,'index.html'));
});

server.listen(3000,()=>{
console.log('server started lsitening');
});

let socketList ={};
let playerList ={};

function Player(id){

    var self ={
        x:250,
        y:250,
        id:id,
        number: ""+ Math.floor(10*Math.random()),
        pressingRight : false,
        pressingLeft: false,
        pressingUp:false,
        pressingDown:false,
        maxSpeed: 10,

    }
    self.updatePlayer =function(){
        if(self.pressingRight)
            self.x+=self.maxSpeed;
        if(self.pressingLeft)
            self.x-=self.maxSpeed;
        if(self.pressingDown)
            self.y+=self.maxSpeed;
        if(self.pressingUp)
            self.y-=self.maxSpeed;
    }
return self;
}

function updatePlayerPosition(movement, player)
{
     player.pressingLeft= movement.left;
     player.pressingRight= movement.right;
     player.pressingDown=movement.down;
     player.pressingUp=movement.up;

}
io.on('connection',(socket)=>{
   /// console.log("new connection");
    socket.id= Math.random();
    socketList[socket.id]=socket;
    var player=Player(socket.id);
    playerList[socket.id]=player;
   socket.on('disconnect', ()=>{
       delete socketList[socket.id];
       delete playerList[socket.id];
   });
    socket.on('movement',(movement)=>{
        updatePlayerPosition(movement,player);
    })
});

setInterval(()=>{
let pack=[];
for(var i in playerList)
    {   var player= playerList[i];
       player.updatePlayer();
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });
       // console.log('In Interval'+socket.number);
    }
    for(var pos in socketList)
        {
            var socket = socketList[pos];
            socket.emit('new Position',pack);
        }
},1000/25);