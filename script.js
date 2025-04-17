const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}<>?/|";

const passwordOutput = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("lengthInput");
const lengthDisplay = document.getElementById("lengthDisplay");
const includeLower = document.getElementById("includeLower");
const includeUpper = document.getElementById("includeUpper");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("load", () => {
    const savedSettings = JSON.parse(localStorage.getItem("passwordSettings"));
    if (savedSettings) {
        lengthInput.value = savedSettings.length || 12;
        includeLower.checked = savedSettings.lower;
        includeUpper.checked = savedSettings.upper;
        includeNumbers.checked = savedSettings.numbers;
        includeSymbols.checked = savedSettings.symbols;
    }
    lengthDisplay.textContent = lengthInput.value;

    const dark = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", dark);
});

function saveSettings() {
    const settings = {
        length: lengthInput.value,
        lower: includeLower.checked,
        upper: includeUpper.checked,
        numbers: includeNumbers.checked,
        symbols: includeSymbols.checked,
    };
    localStorage.setItem("passwordSettings", JSON.stringify(settings));
}

function generatePassword() {
    let chars = "";
    if (includeLower.checked) chars += lowercase;
    if (includeUpper.checked) chars += uppercase;
    if (includeNumbers.checked) chars += numbers;
    if (includeSymbols.checked) chars += symbols;

    if (!chars) return (passwordOutput.textContent = "❗ Обери хоча б 1 тип символів");

    let result = "";
    for (let i = 0; i < lengthInput.value; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        result += chars[rand];
    }

    passwordOutput.textContent = result;
    saveSettings();
}

copyBtn.onclick = () => {
    const text = passwordOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "✔️ Скопійовано!";
        setTimeout(() => (copyBtn.textContent = "Копіювати"), 1500);
    });
};

themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
};

generateBtn.onclick = generatePassword;
lengthInput.oninput = () => {
    lengthDisplay.textContent = lengthInput.value;
    saveSettings();
};
