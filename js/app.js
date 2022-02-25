//Import data
import { getData } from "./data.js";
const data = getData();

const destinations = data.destinations;
const crew = data.crew;
const technologies = data.technology;

/*Global variables*/
let header = document.querySelector('#header');

//Selecting all sections
let sections = document.querySelectorAll('section');
let activeSection; //Current displayed section
let currSectionIndex = 0;

//Nav parent to put children inside it
let navParent = document.getElementById('nav-links');
//Holds all the li in the navlist
let navlist = [];
let activeNav;  //Currnet highlighted nav

//nav button
let navButton = document.getElementById('nav-button');

//Holds all li in the destination list
let destinationList = [];
let activeDestination; //Current displayed destination

//Holds all divs in the crew list
let crewList = [];
let activeCrewMember; //Current displayed crew member

//Holds all divs in the technology list
let technologyList = [];
let activeTechnology; //Current displayed technology
let currTechIndex = 0;

/*Main functions*/

//Dynamic navbar
function buildNav() {
    for (let i = 0; i < sections.length; i++) {
        let ele = document.createElement('li');
        ele.innerHTML = `0${i} ${sections[i].getAttribute('data-nav')}`;
        ele.classList.add('nav-link');
        navParent.appendChild(ele);
    }

    //First nav will be the active nav by default (00 HOME)
    navlist = document.querySelectorAll('.nav-link');

    navlist[0].classList.add('active-nav');
    activeNav = navlist[0];
    activeSection = sections[0];

    //Disable pointer event
    navlist[0].classList.add('no-hover');

    //Navbar button
    navButton.innerHTML = `<img src='assets/shared/icon-hamburger.svg' alt='navbar button'>`;
    if (window.innerWidth >= 730) {
        navButton.setAttribute('style', 'display: none');   
    }

    changeHeaderBG();   //Header background
}

function buildDestinations() {
    let destinationParent = document.querySelector('.destination-links');

    for (let i = 0; i < destinations.length; i++) {
        let ele = document.createElement('li');
        ele.innerHTML = destinations[i].name;
        ele.classList.add('destination-link');
        destinationParent.appendChild(ele);
    }

    destinationList = document.querySelectorAll('.destination-link');

    //Highlighting the first destination 'MOON'
    destinationList[0].classList.add('active-destination');
    activeDestination = destinationList[0];

    //Disable pointer event
    destinationList[0].classList.add('no-hover');

    //Default displayed destination
    let destImgContainer = document.getElementById('destination-image-container');
    destImgContainer.innerHTML = `<img src="${destinations[0].images.png}" alt="Moon" class='destination-image'>`;

    let destinationName = document.getElementById('destination-name');
    destinationName.innerHTML = destinations[0].name;

    let destinationText = document.getElementById('destination-text');
    destinationText.innerHTML = destinations[0].description;

    let destinationDistance = document.getElementById('destination-distance');
    destinationDistance.innerHTML = destinations[0].distance;

    let destinationTravel = document.getElementById('destination-travel-time');
    destinationTravel.innerHTML = destinations[0].travel;
}

function buildCrew() {
    let crewParent = document.querySelector('.crew-links');
    for (let i = 0; i < crew.length; i++) {
        let ele = document.createElement('div');
        ele.classList.add('crew-link');
        crewParent.appendChild(ele);
    }

    crewList = document.querySelectorAll('.crew-link');

    //Highlighting the first crew member 'Douglas'
    crewList[0].classList.add('active-crew-member');
    activeCrewMember = crewList[0];

    //Disable pointer event
    crewList[0].classList.add('no-hover');

    //Default displayed crew member
    let crewImgContainer = document.getElementById('crew-image-container');
    crewImgContainer.innerHTML = `<img src="${crew[0].images.png}" alt="Douglas Picture" class='crew-image'>`;

    let crewRole = document.getElementById('crew-role');
    crewRole.innerHTML = crew[0].role;

    let crewMemberName = document.getElementById('crew-name');
    crewMemberName.innerHTML = crew[0].name;

    let crewMemberBio = document.getElementById('crew-bio');
    crewMemberBio.innerHTML = crew[0].bio;
}

function buildTechnologies() {
    let technologyParent = document.querySelector('.technology-links');
    for (let i = 0; i < technologies.length; i++) {
        let ele = document.createElement('div');
        ele.innerHTML = i + 1;
        ele.classList.add('technology-link');
        technologyParent.appendChild(ele);
    }

    technologyList = document.querySelectorAll('.technology-link');

    //Highlighting the first technology 'Launch vehicle'
    technologyList[0].classList.add('active-technology');
    activeTechnology = technologyList[0];

    //Disable pointer event
    technologyList[0].classList.add('no-hover');

    //Default displayed technology
    let techImgContainer = document.getElementById('technology-image-container');
    if (window.innerWidth <= 1100) {
        techImgContainer.innerHTML = `<img src="${technologies[0].images.landscape}" alt="${technologies[0].name} picture" class='technology-image'>`;
    }
    else {
        techImgContainer.innerHTML = `<img src="${technologies[0].images.portrait}" alt="${technologies[0].name} picture" class='technology-image'>`;
    }

    let techName = document.getElementById('technology-name');
    techName.innerHTML = technologies[0].name;

    let techDescription = document.getElementById('technology-description');
    techDescription.innerHTML = technologies[0].description;
}

/*Helper functions*/
//Change the dimensions of the header image on resizing
function changeHeaderBG() {

    if (window.innerWidth <= 1000) {
        header.setAttribute('style', `background: url(/assets/${sections[currSectionIndex].getAttribute('data-nav')}/background-${sections[currSectionIndex].getAttribute('data-nav')}-tablet.jpg) no-repeat center/cover`);
    }
    else {
        header.setAttribute('style', `background: url(/assets/${sections[currSectionIndex].getAttribute('data-nav')}/background-${sections[currSectionIndex].getAttribute('data-nav')}-desktop.jpg) no-repeat center/cover`);
    }
}

//Change the dimensions of the technology image on resizing
function changeTechnologyBg() {
    let techImgContainer = document.getElementById('technology-image-container');
    if (window.innerWidth <= 1100) {
        techImgContainer.innerHTML = `<img src="${technologies[currTechIndex].images.landscape}" alt="${technologies[currTechIndex].name} picture" class='technology-image'>`;
    }
    else {
        techImgContainer.innerHTML = `<img src="${technologies[currTechIndex].images.portrait}" alt="${technologies[currTechIndex].name} picture" class='technology-image'>`;
    }
}

function navDisplay() {
    if (window.innerWidth >= 730) {
        navButton.setAttribute('style', 'display: none');
        navButton.innerHTML = `<img src='assets/shared/icon-hamburger.svg' alt='navbar button'>`;
        navParent.setAttribute('style', 'display: flex');
    }
    else {
        navButton.setAttribute('style', 'display: flex');
        navParent.setAttribute('style', 'display: none');
    }
}

function clickNav () {
   
    //getComputedStyle gets the current style of the element
    if (getComputedStyle(navParent).display === 'none') {
        navParent.style.display = 'flex';
        //Changing the logo of the navbar button
        navButton.innerHTML = `<img src='assets/shared/icon-close.svg' alt='navbar button'>`;
    } else {
        navParent.style.display = 'none';
        //Changing the logo of the navbar button
        navButton.innerHTML = `<img src='assets/shared/icon-hamburger.svg' alt='navbar button'>`;
    }
}

/*Function calls*/
buildNav();
buildDestinations();
buildCrew();
buildTechnologies();

/*Events*/
//Displaying the selected sections 
navlist.forEach((nav, index) => {
    nav.addEventListener('click', function () {

        //Highlighting the selected nav
        activeNav.classList.remove('active-nav');
        activeNav.classList.remove('no-hover');
        activeNav = navlist[index];
        activeNav.classList.add('no-hover');
        activeNav.classList.add('active-nav');

        //Displaying the selected section
        activeSection.setAttribute('style', 'display: none');
        sections[index].setAttribute('style', 'display: grid');
        activeSection = sections[index];

        //Displaying the background image
        currSectionIndex = index;
        changeHeaderBG();
    });
});

//Displaying selected destinations
destinationList.forEach((dest, index) => {
    dest.addEventListener('click', function () {

        //Changing the content according to the destination
        let destImgContainer = document.getElementById('destination-image-container');
        destImgContainer.innerHTML = `<img src="${destinations[index].images.png}" alt="${destinations[0].name}" class='destination-image'>`

        let destinationName = document.getElementById('destination-name');
        destinationName.innerHTML = destinations[index].name;

        let destinationText = document.getElementById('destination-text');
        destinationText.innerHTML = destinations[index].description;

        let destinationDistance = document.getElementById('destination-distance');
        destinationDistance.innerHTML = destinations[index].distance;

        let destinationTravel = document.getElementById('destination-travel-time');
        destinationTravel.innerHTML = destinations[index].travel;

        //Highlight the selected destination
        activeDestination.classList.remove('active-destination');
        activeDestination.classList.remove('no-hover');
        activeDestination = destinationList[index];
        activeDestination.classList.add('no-hover');
        activeDestination.classList.add('active-destination');
    });
});

//Displaying selected crew members
crewList.forEach((crewMember, index) => {
    crewMember.addEventListener('click', function () {

        //Changing the content according to the selected crew member 
        let crewImgContainer = document.getElementById('crew-image-container');
        crewImgContainer.innerHTML = `<img src="${crew[index].images.png}" alt="${crew[index].name} Picture" class='crew-image'>`;

        let crewRole = document.getElementById('crew-role');
        crewRole.innerHTML = crew[index].role;

        let crewMemberName = document.getElementById('crew-name');
        crewMemberName.innerHTML = crew[index].name;

        let crewMemberBio = document.getElementById('crew-bio');
        crewMemberBio.innerHTML = crew[index].bio;

        //Highlight the selected crew member
        activeCrewMember.classList.remove('active-crew-member');
        activeCrewMember.classList.remove('no-hover');
        activeCrewMember = crewList[index];
        activeCrewMember.classList.add('no-hover');
        activeCrewMember.classList.add('active-crew-member');
    });
});

//Displaying selected technologies
technologyList.forEach((tech, index) => {
    tech.addEventListener('click', function () {

        //Changing the content according to the selected technology
        let techImgContainer = document.getElementById('technology-image-container');
        if (window.innerWidth <= 1100) {
            techImgContainer.innerHTML = `<img src="${technologies[index].images.landscape}" alt="${technologies[index].name} picture" class='technology-image'>`;
        }
        else {
            techImgContainer.innerHTML = `<img src="${technologies[index].images.portrait}" alt="${technologies[index].name} picture" class='technology-image'>`;
        }
        currTechIndex = index;

        let techName = document.getElementById('technology-name');
        techName.innerHTML = technologies[index].name;

        let techDescription = document.getElementById('technology-description');
        techDescription.innerHTML = technologies[index].description;

        //Highlight the selected crew member
        activeTechnology.classList.remove('active-technology');
        activeTechnology.classList.remove('no-hover');
        activeTechnology = technologyList[index];
        activeTechnology.classList.add('no-hover');
        activeTechnology.classList.add('active-technology');
    });
});

//Show navbar
navButton.addEventListener('click', clickNav);

//Window resize function calls
window.addEventListener('resize', function () {
    navDisplay();
    changeHeaderBG(); 
    changeTechnologyBg();
});

