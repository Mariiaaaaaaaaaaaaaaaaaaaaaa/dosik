// ====== НАЛАШТУВАННЯ ======
// Дата народження: рік, місяць (від 0! січень = 0), день
// 13 листопада 2025 → місяць 10
const birthday = new Date(2025, 10, 13);

// ====== ЕЛЕМЕНТИ СТОРІНКИ ======
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const yearsLabel = document.getElementById("yearsLabel");
const monthsLabel = document.getElementById("monthsLabel");
const daysLabel = document.getElementById("daysLabel");
const title = document.getElementById("counterTitle");
const message = document.getElementById("message");
const heroAge = document.getElementById("heroAge");
const hero = document.getElementById("hero");
const button = document.getElementById("partyBtn");

// ====== ПРАВИЛЬНЕ ЗАКІНЧЕННЯ (1 рік, 2 роки, 5 років) ======
function ending(number, one, few, many) {
    const last = number % 10;
    const lastTwo = number % 100;

    if (lastTwo >= 11 && lastTwo <= 14) {
        return many;
    }
    if (last === 1) {
        return one;
    }
    if (last >= 2 && last <= 4) {
        return few;
    }
    return many;
}

// ====== РАХУЄМО РОКИ, МІСЯЦІ І ДНІ ======
const today = new Date();

let years = today.getFullYear() - birthday.getFullYear();
let months = today.getMonth() - birthday.getMonth();
let days = today.getDate() - birthday.getDate();

// якщо днів вийшло мінус, беремо один місяць і додаємо дні попереднього місяця
if (days < 0) {
    months = months - 1;
    days = days + new Date(today.getFullYear(), today.getMonth(), 0).getDate();
}

// якщо місяців вийшло мінус, беремо один рік
if (months < 0) {
    years = years - 1;
    months = months + 12;
}

// захист: якщо дата в майбутньому
if (years < 0) {
    years = 0;
    months = 0;
    days = 0;
}

// ====== ПЛАВНЕ ЗБІЛЬШЕННЯ ЦИФР ======
function countUp(element, finalNumber) {
    let current = 0;
    if (finalNumber === 0) {
        element.textContent = 0;
        return;
    }
    const timer = setInterval(function () {
        current = current + 1;
        element.textContent = current;
        if (current >= finalNumber) {
            clearInterval(timer);
        }
    }, 60);
}

countUp(yearsEl, years);
countUp(monthsEl, months);
countUp(daysEl, days);

// ====== ПІДПИСИ ПІД ЦИФРАМИ ======
yearsLabel.textContent = ending(years, "рік", "роки", "років");
monthsLabel.textContent = ending(months, "місяць", "місяці", "місяців");
daysLabel.textContent = ending(days, "день", "дні", "днів");

// ====== ЗАГОЛОВОК: "Мені вже 1 рік 2 міс 3 дн" ======
let text = "Мені вже";

if (years > 0) {
    text = text + " " + years + " " + ending(years, "рік", "роки", "років");
}
if (months > 0) {
    text = text + " " + months + " міс";
}
if (days > 0) {
    text = text + " " + days + " дн";
}

title.textContent = text;

// ====== КОЛИ НАСТУПНИЙ ДЕНЬ НАРОДЖЕННЯ ======
const isBirthday = (months === 0 && days === 0 && years >= 1);

let nextBirthday = new Date(today.getFullYear(), 10, 13);
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
if (nextBirthday < startOfToday) {
    nextBirthday = new Date(today.getFullYear() + 1, 10, 13);
}
const daysLeft = Math.round((nextBirthday - startOfToday) / (1000 * 60 * 60 * 24));

// ====== КОНФЕТІ ======
function makeConfetti() {
    const colors = ["#5fd6d0", "#4a7bd8", "#ffd966", "#ff8fab", "#ffffff"];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = 2 + Math.random() * 3 + "s";
        document.body.appendChild(piece);

        setTimeout(function () {
            piece.remove();
        }, 5500);
    }
}

// ====== СВЯТО: шапочка, торт, кульки, конфеті ======
function party() {
    hero.classList.remove("play");
    void hero.offsetWidth;         // трюк, щоб анімація запустилась ще раз
    hero.classList.add("play");

    setTimeout(makeConfetti, 1000);
}

// ====== ТЕКСТИ ЗАЛЕЖНО ВІД ДНЯ ======
if (isBirthday) {
    heroAge.textContent = "Мені сьогодні " + years + " " + ending(years, "рік", "роки", "років") + "!";
    message.textContent = "Ура! Сьогодні мій день народження! 🎂";
} else {
    heroAge.textContent = text + "!";
    message.textContent = "До наступного дня народження: " + daysLeft + " " + ending(daysLeft, "день", "дні", "днів") + " 🎈";
}

// ====== СВЯТО ЗАПУСКАЄТЬСЯ ТІЛЬКИ ПО КНОПЦІ ======
button.addEventListener("click", party);