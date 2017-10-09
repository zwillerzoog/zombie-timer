
let timeLabel;
let socket = io.connect('http://localhost:3000');
let game = new Phaser.Game(750, 500, Phaser.AUTO, '', {
    // preload: preload,

    create: function() {
        let me = this;
        me.totalTime = 120;
        me.timeElapsed = 0;
     
        me.createTimer();
     
        me.gameTimer = game.time.events.loop(100, function(){
            me.update();
        });
        console.log(me.gameTimer)
    },
    createTimer: function(){
       
           var me = this;
           timeLabel = me.game.add.text(me.game.world.centerX, 100, "00:00", {font: "100px Arial", fill: "#fff"});
           timeLabel.anchor.setTo(0.5, 0);
           timeLabel.align = 'center';
        
       },
    update: function(){
        socket = io(); // This triggers the 'connection' event on the server
        
        socket.on('start-time', function(startTime) {
            // console.log('data',startTime)
            // console.log('hiee')
           var me = this;
        
           var currentTime = new Date();
           var timeDifference = startTime - currentTime.getTime();
            console.log(timeDifference)
           //Time elapsed in seconds
           me.timeElapsed = Math.abs(timeDifference / 1000);
        
           //Time remaining in seconds
           var timeRemaining = me.timeElapsed;
            // console.log(timeRemaining)
           //Convert seconds into minutes and seconds
           var minutes = Math.floor(timeRemaining / 60);
           var seconds = Math.floor(timeRemaining) - (60 * minutes);
        
           //Display minutes, add a 0 to the start if less than 10
           var result = (minutes < 10) ? "0" + minutes : minutes;
        
           //Display seconds, add a 0 to the start if less than 10
           result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        
           timeLabel.text = result;
        })
}
});
