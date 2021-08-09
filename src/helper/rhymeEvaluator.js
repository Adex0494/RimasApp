const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const vowels = ["a", "á", "e", "é", "i", "í", "o", "ó", "u", "ú", "ü"];
const openVowels = ["a", "e", "o", "á", "é", "í", "ó", "ú"];
const closedVowels = ["i", "u", "ü"];
const stressedVowels = ["á", "é", "í", "ó", "ú"];
const specialCombo = ["gu", "gü", "qu"];
const hybridConsonantPair = ["ps", "sc"];
const companyingConsonants = ["l", "r"];
const undividedConsonantPairs = [
  "bl",
  "br",
  "ch",
  "cl",
  "cr",
  "dr",
  "fl",
  "fr",
  "gl",
  "gr",
  "ll",
  "rr",
  "tl",
  "tr",
  "kl",
  "kr",
];

const getLetterType = (letter) => {
  if (consonants.includes(letter)) return "consonant";
  if (openVowels.includes(letter)) return "open vowel";
  if (closedVowels.includes(letter)) return "closed vowel";
  if (stressedVowels.includes(letter)) return "stressed vowel";
  return "undefined";
};

const determineLetterPairType = (letterPair) => {
  //const letterPairArr = Array.from(letterPair);
  if (vowels.includes(letterPair[0])) {
    if (
      openVowels.includes(letterPair[0]) &&
      openVowels.includes(letterPair[1])
    )
      return "hiato";

    if (vowels.includes(letterPair[1])) return "diptongo";
    if (consonants.includes(letterPair[1])) return "vowel-consonant";
  }

  if (consonants.includes(letterPair[0])) {
    if (consonants.includes(letterPair[1])) return "double-consonant";
    if (vowels.includes(letterPair[1])) return "consonant-vowel";
  }

  return "undefined";
};

const separateByLetter = (word) => {
  return Array.from(word);
};

const separateBySyllable = (word) => {
  let syllables = [];
  let nextSyllable = "";
  let syllableCount = 0;
  //const wordArray = Array.from(word);
  for (let i = 0; i < word.length; i++) {
    let currentSyllableCount = syllableCount;
    let letterInSyllableCount = 0;

    if (letterInSyllableCount === 0) {
      if (word.length >= i + 2) {
        const letterPair = `${word[i]}${word[i + 1]}`;
        let letterPairType = determineLetterPairType(letterPair);
        if (
          letterPairType === "consonant-vowel" ||
          letterPairType === "diptongo" ||
          letterPairType === "double-consonant"
        ) {
          nextSyllable = letterPair;
          i++;

          if (word.length >= i + 2) {
            if (
              determineLetterPairType(`${letterPair[1]}${word[i + 2]}`) ===
              "diptongo"
            ) {
              nextSyllable = nextSyllable + word[i + 2];
              i++;
            }
          }

          if (i === word.length - 1) {
            if (
              determineLetterPairType(`${word[i - 1]}${word[i]}`) === "hiato"
            ) {
              syllables.push(nextSyllable);
              syllables.push(word[i]);
              return syllables;
            }
            syllables.push(`${nextSyllable}${word[i]}`);
            return syllables;
          }

          i++;
          if (word.length >= i + 2) {
            const letterPair = `${word[i]}${word[i + 1]}`;
            let letterPairType = determineLetterPairType(letterPair);
            //letterPairType==='consonant-vowel' || undividedConsonantPairs.includes(letterPair)
            if (letterPairType === "double-consonant") {
              if (word.length >= i + 3) {
                if (vowels.includes(word[i + 2])) {
                  nextSyllable = nextSyllable + letterPair[0];
                  syllables.push(nextSyllable);
                }
                if (consonants.includes(word[i + 2])) {
                  nextSyllable = nextSyllable + letterPair;
                  syllables.push(nextSyllable);
                  i++;
                }
              }
            }
          }
        }
      }
    }

    // syllableCount++;
  }
  //syllables.push(nextSyllable);
  return syllables;
};

// const word = "aábcdeéfghiíjklmnñoópqrstuúúvwxyz@AÁ";

// let arr = Array.from(word);
// arr.forEach((letter) => console.log(letter, getLetterType(letter)));

// let arr = ["la", "al", "ll", "aé", "éa", "íu", "úi", "ps"];

// arr.forEach((pair) => console.log(pair + " - ", determineLetterPairType(pair)));

separateBySyllable("palomo");

const doWordsRhyme = (word1, word2) => {};
