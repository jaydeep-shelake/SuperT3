//utilities functions and classes
const {randRoom, randPiece} = require('./utilities/utils')
const Player = require('./utilities/player')
const Board = require('./utilities/board')
const cors = require('cors')
//set up express server
const express = require('express')
const mongoose =  require('mongoose')
const http = require('http')
const socketio = require('socket.io')
const userRouter = require('./routes/userRouter')
const PORT = process.env.PORT || 5000
const path = require('path');
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())  // to parse body in json format (body parser)
app.use(express.urlencoded({extended:true}))
const uri ="mongodb+srv://Jaydeep-shelake:Pass%40123@cluster0.dvyoz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,
    err => {
        if(err) throw err;
        console.log('connected...')
    });

app.use(cors())
app.use('/api/users',userRouter)
//Store the room ids mapping to the room property object 
//The room property object looks like this {roomid:str, players:Array(2)}
const rooms = new Map()

//Promise function to make sure room id is unique
const makeRoom = (resolve) =>{
    var newRoom = randRoom()
    while (rooms.has(newRoom)){
        newRoom = randRoom()
    }
    rooms.set(newRoom, {roomId: newRoom, players:[], board:null})
    resolve(newRoom)
}

//Put the newly joined player into a room's player list 
const joinRoom = (player, room) => {
    currentRoom = rooms.get(room)
    updatedPlayerList = currentRoom.players.push(player)
    updatedRoom = {...currentRoom, players:updatedPlayerList}
}

//Remove the latest player joined from a room's player list 
function kick(room){
    currentRoom = rooms.get(room)
    currentRoom.players.pop()
}

//Check how many player is currently in the room
function getRoomPlayersNum(room){
    return rooms.get(room).players.length 
}

//Assign x o values to each of the player class
function pieceAssignment(room){
    const firstPiece = randPiece()
    const lastPiece = firstPiece === 'X'? 'O':'X'

    currentRoom = rooms.get(room)
    currentRoom.players[0].piece = firstPiece
    currentRoom.players[1].piece = lastPiece
}

//Initialize a new board to a room
function newGame(room){
    currentRoom = rooms.get(room)
    const board = new Board
    currentRoom.board = board
}

io.on('connection', socket =>{
    //On the client submit event (on start page) to create a new room
    socket.on('newGame', () => {
        new Promise(makeRoom).then((room) => {
            socket.emit('newGameCreated', room)
        })
    })

    //On the client submit event (on start page) to join a room
    socket.on('joining', ({room}) => {
        if (rooms.has(room)){
            socket.emit('joinConfirmed')
        }else{
            socket.emit('errorMessage', 'No room with that id found')
        }
    })

    socket.on('newRoomJoin', ({room,name})=>{
        //If someone tries to go to the game page without a room or name then
        //redirect them back to the start page
        if (room === '' || name ===''){
            io.to(socket.id).emit('joinError')
        }

        //Put the new player into the room
        socket.join(room)
        const id = socket.id
        const newPlayer = new Player(name, room, id)
        joinRoom(newPlayer, room)

        //Get the number of player in the room
        const peopleInRoom = getRoomPlayersNum(room)

        //Need another player so emit the waiting event
        //to display the wait screen on the front end
        if (peopleInRoom===1){
            io.to(room).emit('waiting')
        }

        //The right amount of people so we start the game
        if (peopleInRoom===2){
            //Assign the piece to each player in the backend data structure and then
            //emit it to each of the player so they can store it in their state
            pieceAssignment(room)
            currentPlayers = rooms.get(room).players
            for (const player of currentPlayers){
                io.to(player.id).emit('pieceAssignment', {piece: player.piece, id: player.id})
            }
            newGame(room)

            //When starting, the game state, turn and the list of both players in
            //the room are required in the front end to render the correct information
            const currentRoom = rooms.get(room)
            const gameState = currentRoom.board.game
            const turn = currentRoom.board.turn
            const players = currentRoom.players.map((player) => [player.id, player.name])
            io.to(room).emit('starting', {gameState,players,turn})
        } 

        //Too many people so we kick them out of the room and redirect 
        //them to the main starting page
        if (peopleInRoom===3){
            socket.leave(room)
            kick(room)
            io.to(socket.id).emit('joinError')
        }
    })

    //Listener event for each move and emit different events depending on the state of the game
    socket.on('move', ({room, piece, index}) => {
        currentBoard = rooms.get(room).board
        currentBoard.move(index, piece)

        if (currentBoard.checkWinner(piece)){
            io.to(room).emit('winner', {gameState:currentBoard.game, id:socket.id})
        }else if(currentBoard.checkDraw()){
            io.to(room).emit('draw', {gameState:currentBoard.game})
        }else{
            currentBoard.switchTurn()
            io.to(room).emit('update', {gameState:currentBoard.game, turn:currentBoard.turn})
        }
    })

    //Listener event for a new game
    socket.on('playAgainRequest', (room) => {
        currentRoom = rooms.get(room)
        currentRoom.board.reset()
        //Reassign new piece so a player can't always go first
        pieceAssignment(room)
        currentPlayers = currentRoom.players
        for (const player of currentPlayers){
            io.to(player.id).emit('pieceAssignment', {piece: player.piece, id: player.id})
        }

        io.to(room).emit('restart', {gameState:currentRoom.board.game, turn:currentRoom.board.turn})
    })

    //On disconnect event
    socket.on('disconnecting', ()=> {
        //Get all the rooms that the socket is currently subscribed to
        const currentRooms = Object.keys(socket.rooms)
        //In this game an object can only have 2 rooms max so we check for that
        if (currentRooms.length === 2){
            //The game room is always the second element of the list 
            const room = currentRooms[1]
            const num = getRoomPlayersNum(room)
            //If one then no one is left so we remove the room from the mapping
            if (num === 1){
                rooms.delete(room)
            }
            //If 2 then there is one person left so we remove the socket leaving from the player list and
            //emit a waiting event to the other person
            if (num === 2){
                currentRoom = rooms.get(room)
                currentRoom.players = currentRoom.players.filter((player) => player.id !== socket.id)
                io.to(room).emit('waiting')
            }
        }
    })        
})

//Serve static assests if in production
app.use(express.static(path.join(__dirname, '../client/build')))
if(process.env.NODE_ENV==='production'){
    //set a static folder
    app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}


app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})



server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))