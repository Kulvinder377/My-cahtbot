const texts = {
  en: {
    welcome: "Welcome to Kulvinder's AI Chatbot",
    output: "Chat output will appear here...",
    placeholder: "Type your message...",
    sendBtn: "🚀 Send",
    lightMode: "🌞 Light",
    darkMode: "🌙 Dark",
    thinking: "Thinking...",
    error: "Sorry, there was an error."
  },
  hi: {
    welcome: "कुलविंदर के ए.आई. चैटबोट में स्वागत है",
    output: "यहां चैट आउटपुट दिखाई देगा...",
    placeholder: "अपना संदेश टाइप करें...",
    sendBtn: "🚀 भेजें",
    lightMode: "🌞 हल्का",
    darkMode: "🌙 गहरा",
    thinking: "सोचा जा रहा है...",
    error: "क्षमा करें, एक त्रुटि हुई।"
  }
};

const langSelect = document.getElementById("language");
const themeToggle = document.getElementById("themeToggle");
const modeLabel = document.getElementById("modeLabel");
const welcomeMessage = document.getElementById("welcomeMessage");
const outputDiv = document.getElementById("output");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("send");

function applyLanguage(lang) {
  const t = texts[lang];
  welcomeMessage.textContent = t.welcome;
  outputDiv.textContent = t.output;
  userInput.placeholder = t.placeholder;
  sendButton.textContent = t.sendBtn;
  updateModeText();
}

function updateModeText() {
  const isDark = document.body.classList.contains("dark-mode");
  const lang = langSelect.value;
  modeLabel.textContent = isDark ? texts[lang].darkMode : texts[lang].lightMode;
}

langSelect.addEventListener("change", () => {
  applyLanguage(langSelect.value);
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  updateModeText();
});

sendButton.addEventListener("click", async () => {
  const prompt = userInput.value;
  if (!prompt) return;
  outputDiv.innerText = texts[langSelect.value].thinking;
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBVRygfw_1EUtUcPGTxoXTU_OVA5GWmt8Y',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    outputDiv.innerText = data.candidates?.[0]?.content?.parts?.[0]?.text || texts[langSelect.value].error;
  } catch (error) {
    console.error('Error generating response:', error);
    outputDiv.innerText = texts[langSelect.value].error;
  }
});

// Set initial language
applyLanguage("en");
