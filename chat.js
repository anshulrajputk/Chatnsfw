// Load character from localStorage
const charData = JSON.parse(localStorage.getItem("cnsfw_currentChar")) || {
  name: "Character",
  avatar: "",
  desc: "Hi, I’m here!",
  welcomeImage: ""
};

// Elements
const chatWindow = document.getElementById("chatWindow");
const charName = document.getElementById("charName");
const charAvatar = document.getElementById("charAvatar");
const welcomeText = document.getElementById("welcomeText");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// Set header + welcome
charName.textContent = charData.name;
charAvatar.src = charData.avatar;
welcomeText.textContent = charData.desc;

// Background
if (charData.welcomeImage) {
  document.body.style.background = `
    linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.6)),
    url('${charData.welcomeImage}') center/cover no-repeat`;
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backdropFilter = "blur(5px)";
}

// Scroll helper
function scrollBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Add user message
function addUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "msg right";
  msg.innerHTML = `<div class="bubble">${text}</div>`;
  chatWindow.appendChild(msg);
  scrollBottom();
}

// Send action
sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addUserMessage(text);
  chatInput.value = "";
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});