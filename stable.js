var Bot = require('bot');
var PF = require('pathfinding');
//var bot = new Bot('t44uk7pz', 'training', 'http://vind-legacy.thegrid.red'); //Put your bot's code here and change training to Arena when you want to fight others.
var bot = new Bot('a0ebuvoi', 'arena', 'http://bgdb.hesby.io:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
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
        if (bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if (bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if (bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if (bot.yourBot.id != 4) enemyBots.push(bot.bot4);

        /*
         * Finds the closest bot, stores in closestBot 
         */
        var closestBot = enemyBots[0];
        for (var i = 0; i < enemyBots.length; i++) {
            if (bot.findDistance(myPos, closestBot.posArray) > bot.findDistance(myPos, enemyBots[i].posArray)) {
                closestBot = enemyBots[i];
            }
        }
        
        var ownedMine = enemyBots[0].mines[0]
        for (var i = 0; i < enemyBots.length; i++) {
            if (enemyBots[i].mineCount > 0) {
                ownedMine = enemyBots[i].mines[0]
            }
        }
        /*                                      *
         * This Code Decides WHAT to do         *
         *                                      */
        /**
         * Decides which task needs to be done.
         */
        var task;
        if (bot.yourBot.life < 35) task = "health";
        else if (bot.freeMines == 0 && ownedMine != null) task = "steal";
        else if (bot.yourBot.life > closestBot.life && bot.yourBot.life > 40) task = "attack";
        else task = "freeMines";

        /*                                      *
         * This Code Determines HOW to do it    *
         *                                      */

        if (task === "none") {
            console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            myDir = dirs[rand];
        }
        else if (task === "freeMines") {
            var closestMine = bot.freeMines[0];

            for (var i = 0; i < bot.freeMines.length; i++) {
                if (bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                    closestMine = bot.freeMines[i];
                }
            }
            console.log("Grabbing a free mine");
            myDir = bot.findPath(myPos, closestMine);
        }
        else if (task === "health") {
            var closestTavern = bot.taverns[0];

            for (var i = 0; i < bot.taverns.length; i++) {
                if (bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                    closestTavern = bot.taverns[i];
                }
            }
            console.log("Grabbing health");
            myDir = bot.findPath(myPos, closestTavern);
        }
        else if(task === "attack"){
            console.log("Attacking the closest bot");
            myDir = bot.findPath(myPos, closestBot.posArray);
        }
        else if (task === "steal") {
            console.log("Stealing");
            console.log(ownedMine);
            myDir = bot.findPath(myPos, ownedMine);
        }

        /*                                                                          *
         * This Code Sets your direction based on myDir. Change if you want.        */

        bot.goDir = myDir;

        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();
