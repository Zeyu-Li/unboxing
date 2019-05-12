'use strict';

// inits
var level = 1;
var start_coin = 0;
var start_gem = 0;
var ongoing = false;
var ongoing2 = false;
var scale;
var int1;
var int2;
var start = new Date();
start = start.getTime();

// random int
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$('.overlay').click(function() {
    $('.warning').fadeOut();
});

// resize function
function resize() {
    scale = ($(window).width() * .8)/1024;
    if ($(window).width() < 1280 || $(window).height() < 850) {
        $('.warning').fadeIn();
    }
    if (scale <= 1 && scale >= 0.5) {
        $('.shapeshifter, .shapeshifter2').css('transform', 'scale('+ scale + ','+ scale + ')');
        $('.gemstack').css('transform', 'scale(.35, .35)');
        $('.coinstack').css('transform', 'scale(.4, .4)');
    } else if (scale <= 0.5) {
        $('.shapeshifter, .shapeshifter2').css('transform', 'scale('+ .5 + ','+ .5 + ')');
        $('.gemstack').css('transform', 'scale(.28, .28)');
        $('.coinstack').css('transform', 'scale(.28, .28)');
    } else {
        $('.shapeshifter, .shapeshifter2').css('transform', 'scale('+ 1 + ','+ 1 + ')');
        $('.gemstack').css('transform', 'scale(.35, .35)');
        $('.coinstack').css('transform', 'scale(.4, .4)');
    }
}

// animating gems, counts, fades, and more
function animation() {
    $('.shapeshifter').hide();
    $('.shapeshifter2').show();
    $('.shapeshifter2').css('animation-play-state', 'running');

    // timing the moving chest animation part 2
    setTimeout(function(){
        if ((!ongoing) && ongoing2){
            return 0;
        }
        $('.shapeshifter2').css('animation-play-state', 'paused');
        int1 = getRandomInt(100);
        int2 = getRandomInt(100);
        var add_coin;
        var end_coin;
        if (int1 <= 30) {
            add_coin = 450*level;
        } else if (int1 <= 60) {
            add_coin = 800*level;
        } else if (int1 <= 90) {
            add_coin = 1300*level;
        } else if (int1 < 99) {
            add_coin = 4000*level;
            level = level+3;
        } else {
            add_coin = 'x2';
            var coin_text = true;
            level = level+10;
        }

        if (add_coin=='x2'){
            end_coin = start_coin * 2;
        } else {
            end_coin = start_coin + add_coin;
        }
        start_coin = end_coin;

        // added levels to multiply gem count
        var add_gem;
        var end_gem;
        if (int2 <= 30) {
            add_gem = 50*level;
        } else if (int2 <= 60) {
            add_gem = 80*level;
        } else if (int2 <= 90) {
            add_gem = 130*level;
        } else if (int2 < 99) {
            add_gem = 400*level;
            level = level+3;
        } else {
            add_gem = 'x2';
            level = level+10;
            var gem_text = true;
        }

        if (add_gem=='x2'){
            end_gem = start_gem * 2;
        } else {
            end_gem = start_gem + add_gem;
        }
        start_gem = end_gem;

        // wins game at 1 billion coins and 5^8 gems
        if (start_coin > Math.pow(10,9) && start_gem > Math.pow(5, 8)) {
            $('.gemer').text('You win');
            $('.coiner').text('You win');
            return 0;
        }

        $('.reward .right, .reward .left').css('display', 'grid');
        $('.reward').css('display', 'grid');
        $('.gemstack, .coinstack').fadeIn();

        if (gem_text) {
            em_text = false;
            end_gem = start_gem/2;
        } 
        if (coin_text) {
            coin_text = false;
            end_coin = start_coin/2;
        }

        $('.gemer').html(Number(end_gem));
        $('.coiner').html(Number(end_coin));
        
        $('.gemer2').html(Number(add_gem));
        $('.coiner2').html(Number(add_coin));

        // changes it so it is the starting position and resets time interval
        $('.reward').click(function(){
            level++;
            $('.shapeshifter2').hide();
            $('.reward').hide();
            $('.shapeshifter').css('background-image','url(images/jump_new.svg)');
            var start = new Date();
            start = start.getTime()+200;
            $('.shapeshifter').show();

        });

    }, 3740);

}

// resize on startup and on subsequent brower resizes
resize();
$(window).resize(function() {
    resize();
});

// after clicking chest
$('.shapeshifter').click(function(){

    if (ongoing == true){
        return 0;
    }
    ongoing == true;

    // wait time interval for animation (doesn't work most of the time :( )
    var end = new Date();
    end = end.getTime();
    var interval = 1200 - ((end-start) % 1200);
    setTimeout(function(){
        animation();
    }, interval);
});
