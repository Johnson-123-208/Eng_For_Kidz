export const playAudio = (text) => {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a kid-friendly or standard English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha') || v.lang === 'en-US');
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.rate = 0.85; // slightly slower for kids
  utterance.pitch = 1.2; // slightly higher pitch
  
  window.speechSynthesis.speak(utterance);
};
