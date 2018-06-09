'use strict'
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.all = [];
Product.justViewed = [];
Product.totalClicks = 0;
Product.container = document.getElementById('image_container');
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');

function Product(name){
    this.name = name;
    if(name === 'usb'){
        this.path = 'img/' + name + '.gif';
    }else if(name === 'sweep'){
        this.path = 'img/' + name + '.png';
    }else{
        this.path = 'img/' + name + '.jpg';
    };
    this.path;
    this.votes = 0;
    this.views = 0;
    Product.all.push(this);
}
function loop2Products(){
    // for loops to loop through names
    for(var j = 0; j < Product.names.length; j++){
        new Product(Product.names[j]);
    }
}
function displayPics() {
    var currentlyShowing = [];
    // Storing the votes Data
    Product.votesData = [];
    for(var m = 0; m < Product.names.length; m++){
        Product.votesData.push(Product.all[m].votes); 
    }
    // make left img unique
    currentlyShowing[0] = makeRandom();
    while(Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
        console.error('Duplicate, re run!');
        currentlyShowing[0] = makeRandom();
    }
    // make center img unique
    currentlyShowing[1] = makeRandom();
    while(currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) { // -1 is the previous img 
        console.error('Duplicate at center or in prior view! Re run');
        currentlyShowing[1] = makeRandom();
    }
    // make right img unique
    currentlyShowing[2] = makeRandom();
    while(currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1 ){
        console.error('Duplicate at right! re run it!');
        currentlyShowing[2] = makeRandom();
    }
    // take it to the DOM
    for(var i = 0; i < 3; i++){ //ensure it runs only 3 times
        Product.pics[i].src = Product.all[currentlyShowing[i]].path;
        Product.pics[i].id = Product.all[currentlyShowing[i]].name;
        Product.all[currentlyShowing[i]].views += 1;
        Product.justViewed[i] = currentlyShowing[i];
    }
};
function makeRandom(){
    return Math.floor(Math.random() * Product.names.length);
};
function handleClick(event) {
    console.log(Product.totalClicks, 'total clicks');
    // make the clicks stop at 25
    if(Product.totalClicks > 24){
        Product.container.removeEventListener('click', handleClick); // after 24 remove event listener
        // show the list after the last click
        showTally(); 
        // makeChart();
    }
    // this is how we direct the user to click on a specefic image
    if (event.target.id === 'image_container'){
        return alert('need to click on an image!');
    }
    // start to add up the total clicks and log it to console
    Product.totalClicks += 1;
    for(var i = 0; i < Product.names.length; i++){
        if(event.target.id === Product.all[i].name){
            Product.all[i].votes += 1;
            console.log(event.target.id + 'has '+ Product.all[i].votes + ' votes in '+ Product.all[i].views +' views.');
        }
    }
    displayPics();
}
function makeChart(){
    var labelColors = ['red', 'blue', 'yellow','green','purple','orange','red', 'blue', 'yellow','green','purple','orange','red', 'blue', 'yellow','green','purple','orange','red','blue'];
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: Product.names,
            datasets: [{
                label: '# of Votes for each Products',
                data: Product.votesData,
                backgroundColor: labelColors
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}
function showTally(){
    for(var i = 0; i < Product.all.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views +' views.';
        // append the list item to the Product.tally created above globally for the ul
        Product.tally.appendChild(liEl);
    }
}
Product.container.addEventListener('click', handleClick);
loop2Products();
displayPics();