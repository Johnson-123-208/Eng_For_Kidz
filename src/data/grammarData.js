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
          { q: "End this sentence: 'Can you hear me_'", a: "?", options: [".", "?", "!", ","] }
        ]
      }
    ]
  },
  {
    id: 'prepositions',
    title: 'Prepositions',
    icon: '📍',
    color: 'bg-brand-yellow',
    description: 'Where is it? (In, On, Under, Beside)',
    lessons: [
      {
        type: 'basics',
        title: 'Positional Words',
        rules: 'Prepositions tell us where something is located.',
        quizPool: [
          { q: "The apple is ___ the table.", a: "on", options: ["on", "in", "under", "beside"] },
          { q: "The ball is ___ the box.", a: "inside", options: ["inside", "on", "behind", "with"] },
          { q: "Stand ___ your friend.", a: "beside", options: ["under", "beside", "in", "above"] },
          { q: "The cat is hiding ___ the bed.", a: "under", options: ["on", "under", "above", "in"] },
          { q: "The birds are flying ___ the tree.", a: "above", options: ["in", "on", "above", "under"] },
          { q: "The keys are ___ the drawer.", a: "in", options: ["in", "on", "above", "to"] },
          { q: "He walked ___ the door.", a: "through", options: ["on", "through", "under", "above"] },
          { q: "Sit ___ the chair.", a: "on", options: ["on", "in", "at", "under"] },
          { q: "We walked ___ the park.", a: "to", options: ["to", "on", "in", "at"] },
          { q: "Lunch is ___ the bag.", a: "inside", options: ["on", "inside", "under", "beside"] }
        ]
      }
    ]
  }
];

// Content for the Learn Mode
export const learningContent = {
  'parts-of-speech': [
    { title: 'Nouns', rule: "A Noun is a 'Naming Word'.", details: "It names people (Dr. Sam), places (Library), things (Pencil), and ideas (Love).", examples: ["Paris", "Apple", "Happiness", "Teacher"] },
    { title: 'Verbs', rule: "A Verb is an 'Action Word'.", details: "It tells what someone or something is doing.", examples: ["Running", "Think", "Sing", "Jump"] },
    { title: 'Adjectives', rule: "An Adjective 'Describes' a Noun.", details: "It tells us more about the size, color, or shape.", examples: ["Beautiful", "Large", "Green", "Fast"] }
  ],
  'articles': [
    { title: 'A vs An', rule: "Use 'An' for Vowel Sounds.", details: "A, E, I, O, U are vowels. (An Apple, An Hour). Use 'A' for everything else.", examples: ["A Car", "An Elephant", "A University", "An Honor"] },
    { title: 'The', rule: "Use 'The' for Specific Things.", details: "When we talk about something unique or already mentioned.", examples: ["The Moon", "The President", "The Atlantic"] }
  ],
  'punctuations': [
    { title: 'Commas', rule: "Use Commas to take a short breath.", details: "Used in lists or to separate parts of a sentence.", examples: ["Red, Blue, Green", "If I run, I win."] },
    { title: 'Semicolons', rule: "A Semicolon joins two related sentences.", details: "Stronger than a comma, weaker than a period.", examples: ["I love ice cream; it is sweet."] }
  ],
  'prepositions': [
    { title: 'What is a Preposition?', rule: "Prepositions show 'Where' or 'When'.", details: "They connect a noun to the rest of the sentence to show position, time, or direction.", examples: ["Behind", "Across", "During", "Between"] },
    { title: 'In, On, At', rule: "Use 'In' for spaces, 'On' for surfaces.", details: "In the room, On the table, At the door.", examples: ["In the box", "On the wall", "At the park"] },
    { title: 'Beside & Between', rule: "Beside means 'next to'.", details: "Between means in the middle of two things.", examples: ["Sit beside me", "Between two trees"] },
    { title: 'Under & Above', rule: "Under means 'below'.", details: "Above means 'higher than'.", examples: ["Under the bed", "Above the clouds"] }
  ]
};
