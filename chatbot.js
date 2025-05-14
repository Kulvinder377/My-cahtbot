const toggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');

toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  document.body.classList.toggle('dark-mode', isDark);
  modeLabel.textContent = isDark ? '🌙 Dark' : '🌞 Light';
});

document.getElementById('send').addEventListener('click', async () => {
  const prompt = document.getElementById("userInput").value.trim();
  const language = document.getElementById("language").value;
  const output = document.getElementById('output');

  if (!prompt) return;
  output.innerText = "Thinking...";

  try {
    const result = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBVRygfw_1EUtUcPGTxoXTU_OVA5GWmt8Y',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await result.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    output.innerText = `(${language === 'hi' ? 'हिंदी' : 'English'}) ${reply}`;
  } catch (error) {
    console.error('Error:', error);
    output.innerText = "Sorry, there was an error.";
  }
});
