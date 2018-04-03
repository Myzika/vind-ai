var Bot = require('bot');
var PF = require('pathfinding');
var bot = new Bot('YOUR_KEY_HERE', 'training', 'http://vind-legacy.thegrid.red/'); //Put your bot's code here and change training to Arena when you want to fight others.
// var bot = new Bot('YOUR_KEY_HERE', 'arena', 'http://bgdb.hesby.io:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////

        /*                                      *
         * This Code is global data!            *
         *                                      */

        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir;
        
        //
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];

        //
        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);


        /*                                      *
         * This Code Decides WHAT to do         *
         *                                      */
        var task = "none"





        /*                                      *
         * This Code Determines HOW to do it    *
         *                                      */

        if(task === "none") {
            console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            myDir = dirs[rand];
        }




        /*                                                                          *
         * This Code Sets your direction based on myDir. Change if you want.        */

        bot.goDir = myDir;
        
        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();
