window.addEventListener('scroll', reveal);

function reveal(){

    let reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++){

        let windowHeight = window.innerHeight;

        let revealTop = reveals[i].getBoundingClientRect().top;

        let revealPoint = 100;

        if (revealTop < windowHeight - revealPoint){

            reveals[i].classList.add('active');

        }

    }

}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const tabs = document.querySelectorAll(".project-tabs button");
const cards = document.querySelectorAll(".project-card");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // REMOVE ACTIVE
        tabs.forEach(btn => btn.classList.remove("active"));

        // ACTIVE
        tab.classList.add("active");

        // FILTER
        const filter = tab.dataset.filter;

        cards.forEach(card => {

            if(card.dataset.category === filter){

                card.style.display = "";

            }
            else{

                card.style.display = "none";

            }

        });

    });

});

// DEFAULT TAB
document.querySelector(".project-tabs .active").click();


// Ini buat typing dibagian home
const text = "Indie Horror Game Developer From Indonesia";

let index = 0;

function typeText()
{
    if (index < text.length){
        document.getElementById("typing-text").innerHTML += text.charAt(index);

        index++;

        setTimeout(typeText, 50);
    }
}

typeText();


// Ini buat custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';

    cursor.style.top = e.clientY + 'px';
})