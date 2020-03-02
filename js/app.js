'use strict'
var arrayOfImages = ['usb.gif', 'water-can.jpg', 'wine-glass.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'bag.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'unicorn.jpg', 'banana.jpg', 'tauntaun.jpg', 'boots.jpg', 'bathroom.jpg', 'chair.jpg', 'pen.jpg', 'dragon.jpg', 'dog-duck.jpg', 'cthulhu.jpg', 'sweep.png'];
var arrayToPushInIt = [];//to store all objects
var rightImage = document.querySelector('#right_img');
var centerImage = document.querySelector('#center_img');
var leftImage = document.querySelector('#left_img');
var groupImageSection = document.getElementById('all_images');
var totalClicks = 0;
var numClicksArray = [];
var rightImageRandom;
var centerImageRandom;
var leftImageRandom;
var container = document.getElementById('results');
var articleEl = document.createElement('article');
container.appendChild(articleEl);

//the constructor function
function BusMall(name) {
    this.name = name.split(".")[0];
    this.urlImage = `images/${name}`;
    this.votes = 0;
    this.views = 0;
    arrayToPushInIt.push(this);//this refers to the object that i'm created

}
//new objects
for (var i = 0; i < arrayOfImages.length; i++) {
    new BusMall(arrayOfImages[i]);
}
//to pick the random images
function pickRandom() {
    rightImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
    centerImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
    leftImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
    //to avoid same images 
    while (rightImageRandom.name === leftImageRandom.name || rightImageRandom.name === centerImageRandom.name || leftImageRandom.name === centerImageRandom.name) {
        rightImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
        centerImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
        leftImageRandom = arrayToPushInIt[randomNumber(0, arrayToPushInIt.length - 1)];
        //totalClicks++;
    }
    rightImage.setAttribute('src', rightImageRandom.urlImage);
    rightImage.setAttribute('alt', rightImageRandom.name);
    rightImageRandom.views = rightImageRandom.views + 1;
    console.log('number of right views', rightImageRandom.views);
    centerImage.setAttribute('src', centerImageRandom.urlImage);
    centerImage.setAttribute('alt', centerImageRandom.name);
    centerImageRandom.views = centerImageRandom.views + 1;
    console.log('number of center views',centerImageRandom.views);
    leftImage.setAttribute('src', leftImageRandom.urlImage);
    leftImage.setAttribute('alt', leftImageRandom.name);
    leftImageRandom.views = leftImageRandom.views + 1;
    console.log('number of left views',leftImageRandom.views);

}
pickRandom();

groupImageSection.addEventListener('click', clickTheImages);


function clickTheImages(event) {

    if (event.target.id === 'right_img') {
        totalClicks++;
        rightImageRandom.votes = rightImageRandom.votes + 1;
        console.log('right votes',rightImageRandom.votes,rightImageRandom.name);
        pickRandom();
    }

    else if (event.target.id === 'center_img') {
        totalClicks++;
        centerImageRandom.votes = centerImageRandom.votes + 1;
        console.log('center votes',centerImageRandom.votes,centerImageRandom.name);
        pickRandom();
    }
    else if (event.target.id === 'left_img') {
        totalClicks++;
        leftImageRandom.votes = leftImageRandom.votes + 1;
        console.log('left votes',leftImageRandom.votes,leftImageRandom.name);
        pickRandom();
    }
    else { alert('oooh no!'); }

    if (totalClicks === 25) {
        groupImageSection.removeEventListener('click',clickTheImages);
        // rightImage.remove();
        // centerImage.remove();
        // leftImage.remove();
        render();
    }
}

function render() {
    // var container = document.getElementById('results');
    // var articleEl = document.createElement('article');
    // container.appendChild(articleEl);
    var ulEl = document.createElement('ul');
    articleEl.appendChild(ulEl);
    for(var i = 0 ; i < arrayToPushInIt.length ; i++){
      var liEl = document.createElement('li');
      liEl.textContent = `${arrayToPushInIt[i].name} had ${arrayToPushInIt[i].votes} votes and was shown ${arrayToPushInIt[i].views} times`;
      ulEl.appendChild(liEl);}

}


//helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

