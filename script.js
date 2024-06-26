document.addEventListener("DOMContentLoaded", () => {
  const speech = new SpeechSynthesisUtterance();
  let voices = [];
  const speakButton = document.getElementById("speakButton");
  const textToSpeak = document.getElementById("textToSpeak");
  const voiceSelect = document.getElementById("voiceSelect");

  function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });

    // Filter for Hindi, Urdu, and Sindhi voices and add them to the select dropdown
    const hindiUrduSindhiVoices = voices.filter(
      (voice) =>
        voice.lang.includes("hi") ||
        voice.lang.includes("ur") ||
        voice.lang.includes("sd")
    );
    hindiUrduSindhiVoices.forEach((voice) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });
  }

  // Wait for voices to be loaded before populating the list
  speechSynthesis.onvoiceschanged = populateVoiceList;

  speakButton.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop speaking if currently speaking
    }

    // Set the text to be spoken
    speech.text = textToSpeak.value.trim();

    // Find the selected voice from the voices array
    const selectedVoiceName =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    const selectedVoice = voices.find(
      (voice) => voice.name === selectedVoiceName
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
    } else {
      console.error("Voice not found");
      return;
    }

    // Speak the text using selected voice
    window.speechSynthesis.speak(speech);
  });
});
