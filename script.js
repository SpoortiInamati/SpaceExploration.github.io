// -------------------------------------------
// BLUR ON SCROLL
// -------------------------------------------
window.addEventListener("scroll", () => {
    document.querySelectorAll(".blur-on-scroll").forEach(el => {
        let blurValue = Math.min(window.scrollY / 40, 8);
        el.style.filter = `blur(${blurValue}px)`;
        el.style.opacity = `${1 - blurValue / 12}`;
    });
});

/* SCROLL PARALLAX ROTATION */
const model = document.querySelector(".earth-model");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    // Smooth movement + rotation based on scroll
    let rotateY = scrollY * 0.05;
    let translateY = scrollY * 0.1;

   
});
function openModal(title, imgSrc, desc) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalImg").src = imgSrc;

    // allow proper formatting with line breaks + emojis
    document.getElementById("modalDesc").innerHTML = desc.replace(/\n/g, "<br>");

    document.getElementById("imgModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("imgModal").style.display = "none";
}

gsap.timeline().from(".container-fluid", {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.5
});