const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')

// databases
require('./db/config')
// const Product = require('./db/Product')
const User = require('./db/User')
// 

const bodyParser = require('body-parser');
const router = require('./routes')

// socket io 
const  {Server} = require('socket.io')
const app = express();
app.use(bodyParser.json());
app.use(cors(),router)

// Set up a route to serve images from the 'uploads' folder
app.use('/uploads', express.static('uploads'));


const server = http.createServer(app);
// const io = socketIO(server);

const io = new Server(server,{
    cors : {
        // origin :'http://localhost:3001'
    }
})
let users = 0 
io.on('connection', (socket) => {
    users++ ; 
    console.log('Socket Io Connected  ----- ',socket.id , users)

    // event for send connected users 
    socket.emit('activeUser', {users})

    // event for join room
    socket.on('joinRoon',(data)=>{
        console.log('join roon  ==',data)
        socket.join(data)
    })

    // get message event 
    socket.on('send_msg',(msg)=>{
        console.log('check mesage on node js ',msg)
        socket.to(msg.room).emit('recive_msg',msg)
    })

    

    socket.on('disconnect', () => {
        users--;
        socket.emit('activeUser', {users:users})
        console.log('A user disconnected');
    });
    

});



app.post('/changePassword',async(req,resp)=>{
    let user = await User.find({username:req.body.username , password:req.body.password})
    if(user.length == 0){
        let change = await User.updateOne(filter, { password: 'newapass' })
        
        resp.send('Password change Successfully')
    }else{
        resp.send('User not Found')
    }
    
})

// app.delete('/delete-product/:id', async(req,resp)=>{
//     console.log('_id',req.params.id)
//     let result = await Product.deleteOne({_id:req.params.id})
//     console.log('result ---------- ',result)
//     if(result.acknowledged){
//         resp.send('Deleted Successfully')
//     }else{
//         resp.send('Something Went')
//     }
// })
// app.put('/update-product/:id' , async(req,resp)=>{
//     let result = await Product.updateOne({_id:req.params.id} , {$set :req.body})
//     resp.send(req.body)
// })
// app.get('/search-product/:key',async(req,resp)=>{
//     let result = await Product.find({
//         "$or":[
//             {name : {$regex : req.params.key}},
//         ]
//     })
//     resp.send(result)
// })

const port = 5000; // Or any other port you prefer
const ipAddress = "192.168.1.44"

server.listen(port, ipAddress,() => {
  console.log(`Server started on port http://${ipAddress}:${port}`);
});




