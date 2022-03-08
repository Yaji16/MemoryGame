//DOM elements
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('.playerLivesCount');
let playerLives = 6;

playerLivesCount.textContent = playerLives;

//card images data - this returns an array of objects
const getData = () => [
    {imgSrc: 'images/cat.jpg', name: 'cat'},
    {imgSrc: 'images/flower.jpg', name: 'flower'},
    {imgSrc: 'images/guy.jpg', name: 'guy'},
    {imgSrc: 'images/orange.jpg', name: 'orange'},
    {imgSrc: 'images/pattern.jpg', name: 'pattern'},
    {imgSrc: 'images/shoes.jpg', name: 'shoes'},
    {imgSrc: 'images/piano.jpg', name: 'piano'},
    {imgSrc: 'images/umbrella.jpg', name: 'umbrella'},
    {imgSrc: 'images/cat.jpg', name: 'cat'},
    {imgSrc: 'images/flower.jpg', name: 'flower'},
    {imgSrc: 'images/guy.jpg', name: 'guy'},
    {imgSrc: 'images/orange.jpg', name: 'orange'},
    {imgSrc: 'images/pattern.jpg', name: 'pattern'},
    {imgSrc: 'images/shoes.jpg', name: 'shoes'},
    {imgSrc: 'images/piano.jpg', name: 'piano'},
    {imgSrc: 'images/umbrella.jpg', name: 'umbrella'}
];

//randomize function
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random()-0.5);
    return cardData;
};

//Generate cards
const cardGenerator = () => {
    const cardData = randomize();
    console.log(cardData);
    //Generate HTML
    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //attach image to card
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        //append to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        
        card.addEventListener('click', e =>{
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
    
};

//check cards matching or not
const checkCards = (e) => {
    const clickedCard = e.target;
    console.log(clickedCard);
    
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
            console.log("match");
            flippedCards.forEach((card)=>{
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }else{
            console.log('wrong!');
            flippedCards.forEach((card)=>{
                card.classList.remove("flipped");
                setTimeout(()=>card.classList.remove("toggleCard"),1000);
            });
            playerLives --;
            playerLivesCount.textContent = playerLives;
            if(playerLives == 0){
                restart("Try Again!");
            }
        }
    }
    if(toggleCard.length === 16){
        restart("You won! Congrats!");
    }
};

//restart the game
const restart = (text) =>{
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index)=>{
        cards[index].classList.remove("toggleCard");

        setTimeout(()=>{
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name",item.name);
            section.style.pointerEVents = "all";
        }, 1000);
        
    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(()=>{window.alert(text);},100);
};

cardGenerator();