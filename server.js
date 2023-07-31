const express = require('express');
const app = express();
require("dotenv")
const http = require('http').createServer(app);
const port = process.env.PORT || 3000
http.listen(port ,  ()=>{
    console.log(`listining on port  ${port}`)
});

app.use(express.static(__dirname +'/public'))

app.get('/',(req, res)=>{

   return res.sendFile(__dirname+'/index.html')
});


const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected...')
    socket.on('message',(msg)=>{
       socket.broadcast.emit('message',msg)
    })
})