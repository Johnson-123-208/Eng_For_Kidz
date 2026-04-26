export const playAudio = (text) => {
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Find a voice and pitch it up to simulate a child's voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.name.includes('Google UK English Female') || 
    v.name.includes('Samantha') || 
    v.name.includes('Victoria') ||
    v.name.includes('Female')
  ) || voices.find(v => v.lang.startsWith('en'));
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  // Pitch > 1 makes the voice higher (child-like)
  utterance.pitch = 1.6; 
  utterance.rate = 0.9; 
  
  window.speechSynthesis.speak(utterance);
};
