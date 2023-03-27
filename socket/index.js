const {instrument} = require('@socket.io/admin-ui');

const io = require('socket.io')(8001, {
    cors :{
        origin: ["http://localhost:5173", "https://admin.socket.io"],
        credentials: true
    },
})
console.log("active on port 8800");
let activeUsers = []

//set up connection
io.on("connection", async(socket)=> {
    // console.log('user connected: ' + socket.handshake.auth.token.username)
    user = socket.handshake.auth.token

    //get groups for user
    console.log("inside async")
    if(user==null){return;}
    console.log("got user: " +user.username);
    const response = await fetch("http://localhost:8000/users/user/"+user.id);
    const json = await response.json();
    if(!response.ok){
        console.log("unable to retrieve user groups");
    }
    if(response.ok){
        //console.log(json);
        if(Object.keys(json).length!==0){
            socket.emit("send-groups", json);
            json.map((id)=>{
                //console.log(id);
                socket.join(id);
            })
        }
        console.log(`${user.username} in ${socket.rooms.size-1} rooms`);
    }


    //to server from client
    socket.on("send-message", (message, groupid)=> {
        console.log("received " + message + " from room: " + groupid);
        socket.to(groupid).emit("receive-message", message, groupid);
    })

    socket.on("disconnect", ()=> {
        activeUsers= activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log("user disconnected");
    })
});

instrument(io, {
    auth: false,
});

