const express = require('express'); // Express contains some boilerplate to for routing and such
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/assets', express.static('assets'));

app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), function() {
    console.log('listening on port', app.get('port'));
});

let hours;
let minutes;
let seconds;
let time;
let startTime = new Date()
let totalTime = 120;
let timeElapsed = 0;

io.on('connection', function(socket) {
    // hours = currentTime.getHours();
    // minutes = currentTime.getMinutes();
    // seconds = currentTime.getSeconds();
    time = startTime.getTime()
    // console.log('time', time);
    // console.log('time', typeof currentTime)
    //if all connections show same time, it's good
    io.emit('start-time', time)
})

function createTimer() {
    timeLabel = game.add.text(100, 100, "00:00", 
    {font: "100px Arial", fill: "#fff"});
    me.timeLabel.anchor.setTo(0.5, 0);
    me.timeLabel.align = 'center';
}
