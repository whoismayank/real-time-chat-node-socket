const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const path = require('path');
http.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);
})

// app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

const io = require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log('Socket connected');
    socket.on('message',(userMessage)=>{
        console.log(userMessage);
        socket.broadcast.emit('message',userMessage);
    })
})