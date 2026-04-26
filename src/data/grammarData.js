export const grammarModules = [
  {
    id: 'parts-of-speech',
    title: 'Parts of Speech',
    icon: '🏷️',
    color: 'bg-brand-blue',
    description: 'Nouns, Verbs, Adjectives and more!',
    lessons: [
      {
        type: 'all',
        title: 'Mixed Master',
        rules: 'Master the building blocks of sentences!',
        quizPool: [
          // Nouns
          { q: "Identify the Noun: 'The Eiffel Tower is in Paris.'", a: "Eiffel Tower", options: ["The", "Eiffel Tower", "in", "is"] },
          { q: "Which word is a common noun?", a: "city", options: ["London", "city", "Vedhanshi", "Monday"] },
          { q: "Identify the abstract noun:", a: "Happiness", options: ["Cake", "Happiness", "Dog", "Table"] },
          { q: "Find the plural noun:", a: "Children", options: ["Child", "Children", "Foot", "Mouse"] },
          { q: "Name the thing: 'The pencil is sharp.'", a: "pencil", options: ["The", "is", "sharp", "pencil"] },
          // Verbs
          { q: "Find the Verb: 'She studied for three hours.'", a: "studied", options: ["She", "studied", "for", "hours"] },
          { q: "Which is a helping verb?", a: "have", options: ["run", "have", "jump", "sing"] },
          { q: "Identify the action: 'The baby cried loudly.'", a: "cried", options: ["The", "baby", "cried", "loudly"] },
          { q: "Complete the sentence: 'They ___ playing.'", a: "are", options: ["is", "am", "are", "be"] },
          { q: "Which word is a link verb?", a: "seems", options: ["walks", "seems", "hits", "kicks"] },
          // Adjectives
          { q: "Find the Adjective: 'That is a beautiful garden.'", a: "beautiful", options: ["That", "garden", "beautiful", "is"] },
          { q: "Which word describes the noun: 'A cold wind blew.'", a: "cold", options: ["A", "wind", "blew", "cold"] },
          { q: "Find the adjective: 'The large elephant ate.'", a: "large", options: ["The", "ate", "large", "elephant"] },
          { q: "Which is a comparative adjective?", a: "faster", options: ["fast", "faster", "fastest", "slow"] },
          { q: "Identify the adjective: 'Five birds were flying.'", a: "Five", options: ["flying", "birds", "Five", "were"] },
          // Adverbs
          { q: "Find the Adverb: 'He ran quickly.'", a: "quickly", options: ["He", "ran", "quickly", "is"] },
          { q: "Which word describes HOW: 'She speaks softly.'", a: "softly", options: ["Speaks", "softly", "She", "nice"] },
          { q: "Identify the adverb: 'The sun is very hot.'", a: "very", options: ["sun", "is", "very", "hot"] },
          { q: "Find the adverb of frequency:", a: "Always", options: ["Now", "Always", "Here", "There"] },
          { q: "Identify the adverb: 'We are almost there.'", a: "almost", options: ["We", "are", "almost", "there"] },
          // Pronouns
          { q: "Replace 'John' with a pronoun:", a: "He", options: ["She", "It", "They", "He"] },
          { q: "Identify the pronoun: 'We love pizza.'", a: "We", options: ["We", "love", "pizza", "eat"] },
          { q: "Which is a possessive pronoun?", a: "Mine", options: ["Me", "My", "Mine", "I"] },
          { q: "Find the pronoun: 'Give it to them.'", a: "them", options: ["Give", "it", "to", "them"] },
          { q: "Identify the reflexive pronoun:", a: "Myself", options: ["Me", "I", "Myself", "Mine"] }
        ]
      }
    ]
  },
  {
    id: 'articles',
    title: 'Articles Mastery',
    icon: '🅰️',
    color: 'bg-brand-green',
    description: 'A, An, and The usage.',
    lessons: [
      {
        type: 'usage',
        title: 'Mastering Articles',
        rules: 'Use markers correctly for the 8-15 age level contexts.',
        quizPool: [
          { q: "I have ___ honest friend.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "She is ___ university student.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "He is ___ tallest boy in class.", a: "the", options: ["a", "an", "the", "no article"] },
          { q: "Can I have ___ orange?", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "___ moon is bright tonight.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "I'll be there in ___ hour.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "___ Himalayas are very high.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "Do you play ___ guitar?", a: "the", options: ["a", "an", "the", "no article"] },
          { q: "I watched ___ amazing movie.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "This is ___ one-way street.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "She bought ___ umbrella.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "He works at ___ hospital.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "___ sun rises in the east.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "I need ___ new phone.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "It was ___ honor to meet you.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "I saw ___ UFO last night.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "___ Atlantic Ocean is vast.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "She is ___ MP (Member of Parliament).", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "We had ___ picnic yesterday.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "___ rich should help the poor.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "I have ___ X-ray machine.", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "Is there ___ ATM near here?", a: "an", options: ["a", "an", "the", "no article"] },
          { q: "___ President is visiting today.", a: "The", options: ["A", "An", "The", "no article"] },
          { q: "I want ___ slice of cake.", a: "a", options: ["a", "an", "the", "no article"] },
          { q: "It was ___ European car.", a: "a", options: ["a", "an", "the", "no article"] }
        ]
      }
    ]
  },
  {
    id: 'punctuations',
    title: 'Punctuation Lab',
    icon: '❓',
    color: 'bg-brand-red',
    description: 'Commas, Semicolons, and more!',
    lessons: [
      {
        type: 'advanced',
        title: 'Level Up Punctuation',
        rules: 'Commas, colons, and quotation marks usage.',
        quizPool: [
          { q: "Correct punctuation: 'I like apples_ bananas_ and grapes.'", a: ", ,", options: [", ,", ". .", "; ;", ": :"] },
          { q: "Which mark for a list? 'Prepare these items_ pen, paper, and ink.'", a: ":", options: [",", ";", ":", "-"] },
          { q: "Where does the comma go? 'If it rains_ we will stay home.'", a: "After 'rains'", options: ["After 'If'", "After 'rains'", "After 'we'", "No comma"] },
          { q: "Identify the mark in 'John's car':", a: "Apostrophe", options: ["Comma", "Apostrophe", "Hyphen", "Dash"] },
          { q: "End this sentence: 'Can you hear me_'", a: "?", options: [".", "?", "!", ","] },
          { q: "Quotation marks: 'She said_ I am tired._ '", a: ", ' '", options: [", ' '", ". ' '", ": ' '", "; ' '"] },
          { q: "Which mark for excitement? 'Wow_ what a goal.'", a: "!", options: [".", "?", "!", ","] },
          { q: "Join two sentences: 'I am tired_ however_ I will finish.'", a: "; ,", options: [", ,", "; ,", ". .", ": :"] },
          { q: "Identify the mark: 'A long-term goal.'", a: "Hyphen", options: ["Dash", "Hyphen", "Underscore", "Tilde"] },
          { q: "Proper noun comma: 'Paris_ France is beautiful.'", a: ",", options: [",", ";", ":", "."] },
          { q: "Direct speech: 'I am hungry_ said Sam.'", a: ",", options: [",", ".", "?", "!"] },
          { q: "Address comma: 'New York_ NY.'", a: ",", options: [",", ";", ":", "."] },
          { q: "Date comma: 'May 5_ 2024.'", a: ",", options: [",", ";", ":", "."] },
          { q: "Greeting comma: 'Dear Sam_'", a: ",", options: [",", ";", ":", "!"] },
          { q: "Closing comma: 'Sincerely_'", a: ",", options: [",", ";", ":", "."] },
          { q: "Parenthesis use: 'He (Sam) is my friend.' Name the mark:", a: "Parenthesis", options: ["Bracket", "Parenthesis", "Brace", "Slash"] },
          { q: "Semicolon use: 'I love cats_ they are so cute.'", a: ";", options: [",", ";", ":", "."] },
          { q: "Identify the ellipsis:", a: "...", options: ["---", "...", ":::", ",,,"] },
          { q: "Possessive plural: 'The dogs_ toys are here.'", a: "'", options: ["s'", "'s", "'", "s"] },
          { q: "Correct use: 'It_s raining.'", a: "'", options: ["s'", "'s", "'", "s"] }
        ]
      }
    ]
  }
];
