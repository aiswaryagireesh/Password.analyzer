const password = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const len = document.getElementById("len");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const num = document.getElementById("num");
const sym = document.getElementById("sym");

/* Show / Hide button */

toggleBtn.onclick = () => {
    if(password.type === "password"){
        password.type = "text";
        toggleBtn.innerText = "Hide";
    }else{
        password.type = "password";
        toggleBtn.innerText = "Show";
    }
};


/* Password analyzer */

password.addEventListener("input", checkStrength);

function checkStrength(){

    let value = password.value;
    let score = 0;

    if(value.length >= 8){
        len.classList.add("valid");
        score++;
    }else len.classList.remove("valid");

    if(/[A-Z]/.test(value)){
        upper.classList.add("valid");
        score++;
    }else upper.classList.remove("valid");

    if(/[a-z]/.test(value)){
        lower.classList.add("valid");
        score++;
    }else lower.classList.remove("valid");

    if(/[0-9]/.test(value)){
        num.classList.add("valid");
        score++;
    }else num.classList.remove("valid");

    if(/[^A-Za-z0-9]/.test(value)){
        sym.classList.add("valid");
        score++;
    }else sym.classList.remove("valid");

    let percent = (score / 5) * 100;
    strengthBar.style.width = percent + "%";

    if(score <= 2){
        strengthBar.style.background = "#ff004c";
        strengthText.innerText = "Weak";
    }
    else if(score <= 4){
        strengthBar.style.background = "#ffae00";
        strengthText.innerText = "Medium";
    }
    else{
        strengthBar.style.background = "#00ffae";
        strengthText.innerText = "Strong";
    }

    if(value.length === 0){
        strengthBar.style.width = "0%";
        strengthText.innerText = "---";
    }
}


/* Vertical moving lines background */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

function createLines() {
    lines = [];
    let count = 35;

    for (let i = 0; i < count; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            height: Math.random() * 60 + 40,
            speed: Math.random() * 0.8 + 0.3,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
}

createLines();

function animateLines() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {

        ctx.strokeStyle = `rgba(157, 91, 255, ${line.opacity})`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.height);
        ctx.stroke();

        line.y += line.speed;

        if (line.y > canvas.height) {
            line.y = -line.height;
            line.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateLines);
}

animateLines();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createLines();
});


// 💬 Feedback Submit
const submitBtn = document.getElementById("submitFeedback");
const thankYou = document.getElementById("thankYouMessage");

submitBtn.addEventListener("click", () => {
    const feedbackText = document.getElementById("userFeedback").value;


    if(feedbackText.trim() === ""){
        alert("Please write some feedback 😊");
        return;
    }

    thankYou.innerText = "🎉 Thank you for your feedback!";
});
