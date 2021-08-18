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
  "pr",
  "pl",
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

const separateBySyllable = (word) => {
  word = word.toLowerCase();
  let syllables = [];
  let nextSyllable = ""; //Has the next syllable that is being buildt
  //const wordArray = Array.from(word);
  for (let i = 0; i < word.length; i++) {
    if (word.length === i + 1) {
      syllables.push(nextSyllable + word[i]);
    }

    if (word.length >= i + 2) {
      const letterPair = `${word[i]}${word[i + 1]}`;
      let letterPairType = determineLetterPairType(letterPair);
      let hasPushed = false;

      if (letterPairType === "hiato") {
        //hiato must be separated
        syllables.push(letterPair[0]);
        continue;
      }

      if (letterPairType === "double-consonant") {
        //a syllable starting with double consonants
        nextSyllable = letterPair;
        i++;
        continue;
      }

      if (letterPairType === "vowel-consonant") {
        //vowel-consonant can be the start of a syllable or not
        nextSyllable = nextSyllable + letterPair[0];
      }

      if (
        letterPairType === "consonant-vowel" ||
        letterPairType === "diptongo" ||
        letterPairType === "vowel-consonant"
      ) {
        if (letterPairType !== "vowel-consonant") {
          nextSyllable = nextSyllable + letterPair;
          i++;

          if (word.length >= i + 2) {
            if (
              determineLetterPairType(`${letterPair[1]}${word[i + 1]}`) ===
              "diptongo" //a diptongo is always in the same syllable
            ) {
              nextSyllable = nextSyllable + word[i + 1];
              i++;
              if (
                word.length >= i + 2 &&
                determineLetterPairType(`${word[i]}${word[i + 1]}`) ===
                  "diptongo" //a diptongo can be followed by another diptongo, forming a triptongo
              ) {
                nextSyllable = nextSyllable + word[i + 1];
                i++;
              }
            }
            if (
              determineLetterPairType(`${letterPair[1]}${word[i + 1]}`) ===
              "hiato" //hiato is separated
            ) {
              syllables.push(nextSyllable);
              //hasPushed = true;
              nextSyllable = "";
              continue;
            }
          }
        }

        if (i + 1 === word.length - 1) {
          //what to do if next letter is the last
          if (determineLetterPairType(`${word[i]}${word[i + 1]}`) === "hiato") {
            //separate hiato
            syllables.push(nextSyllable);
            syllables.push(word[i + 1]);
            //return syllables;
            break;
          }
          syllables.push(`${nextSyllable}${word[i + 1]}`);
          //return syllables;
          break;
        }

        i++;
        //if (!hasPushed)
        if (word.length >= i + 2) {
          const letterPair = `${word[i]}${word[i + 1]}`;
          let letterPairType = determineLetterPairType(letterPair);
          //letterPairType==='consonant-vowel' || undividedConsonantPairs.includes(letterPair)
          if (letterPairType === "double-consonant") {
            //Decision to make if next pair of letters is doble-consonant
            //i++;
            if (word.length >= i + 3) {
              //it depends on the letter that is right after and wether the double-consonant is undivided or not
              if (
                vowels.includes(word[i + 2]) &&
                !undividedConsonantPairs.includes(letterPair)
              ) {
                nextSyllable = nextSyllable + letterPair[0];
                syllables.push(nextSyllable);
                hasPushed = true;
              }
              if (
                consonants.includes(word[i + 2]) &&
                !undividedConsonantPairs.includes(
                  `${letterPair[1]}${word[i + 2]}`
                )
              ) {
                nextSyllable = nextSyllable + letterPair;
                syllables.push(nextSyllable);
                hasPushed = true;
                i++;
              }
              if (
                consonants.includes(word[i + 2]) &&
                undividedConsonantPairs.includes(
                  `${letterPair[1]}${word[i + 2]}`
                )
              ) {
                nextSyllable = nextSyllable + letterPair[0];
                syllables.push(nextSyllable);
                hasPushed = true;
              }
            } else {
              //There is no word in spanish that ends with 2 consonants. Check for more exceptions...
              console.log("incorrect word");
              return [];
            }
          }
        }

        if (!hasPushed) {
          syllables.push(nextSyllable);
          i--;
        }
      }
    }
    nextSyllable = "";
  }

  //Change first character to upper case
  syllables[0] = syllables[0].replace(
    syllables[0][0],
    syllables[0][0].toUpperCase()
  );

  return syllables;
};

export const determineAccent = (word) => {
  let wordType;
  const wordSyllables = separateBySyllable(word);
  let accentPosition;

  if (wordSyllables.length === 1) {
    accentPosition = 0;
    wordType = "aguda";
  } else {
    const hasAccentMark = wordSyllables.some((syllable, i) => {
      const foundAccent = Array.from(syllable).some((letter) => {
        if (stressedVowels.includes(letter)) {
          accentPosition = i;
          return true;
        } else return false;
      });
      if (foundAccent) return true;
      else return false;
    });

    if (hasAccentMark) {
      if (accentPosition === wordSyllables.length - 1) wordType = "aguda";
      if (accentPosition === wordSyllables.length - 2) wordType = "grave";
      if (accentPosition === wordSyllables.length - 3) wordType = "esdrújula";
      if (accentPosition < wordSyllables.length - 3) wordType = "sobresdrújula";
    } else {
      if (
        word[word.length - 1] === "n" ||
        word[word.length - 1] === "s" ||
        vowels.includes(word[word.length - 1])
      ) {
        wordType = "grave";
        accentPosition = wordSyllables.length - 2;
      } else {
        wordType = "aguda";
        accentPosition = wordSyllables.length - 1;
      }
    }
  }

  return [wordType, accentPosition];
};

const determineSyllableNature = (syllable) => {
  syllable = syllable.toLowerCase();
  for (let i = 0; i < syllable.length; i++) {
    if (vowels.includes(syllable[i])) {
      if (i === syllable.length - 1 || consonants.includes(syllable[i + 1]))
        return "cima-simple";
      if (
        i + 2 < syllable.length &&
        vowels.includes(syllable[i + 1]) &&
        vowels.includes(syllable[i + 2])
      )
        return "triptongo";
      if (openVowels.includes(syllable[i])) return "diptongo-decreciente";
      return "diptongo-creciente";
    }
  }
  return "undefined";
};

const getSyllableFromStrongVowel = (syllable) => {
  syllable = syllable.toLowerCase();
  const syllableNature = determineSyllableNature(syllable);
  for (let i = 0; i < syllable.length; i++) {
    if (vowels.includes(syllable[i])) {
      //console.log(syllable.slice(i), syllableNature);
      if (
        syllableNature === "cima-simple" ||
        syllableNature === "diptongo-decreciente"
      )
        return syllable.slice(i);
      if (syllableNature === "diptongo-creciente") return syllable.slice(i + 1);
      if (syllableNature === "triptongo") {
        for (let j = i; j < 3; j++) {
          if (openVowels.includes(syllable[j])) return syllable.slice(j);
        }
      }
    }
  }
  return "";
};

export const getSyllablesSeparated = (word) => {
  const wordArr = separateBySyllable(word);
  return wordArr.join("-");
};

export const determineLyricism = (word1, word2) => {
  if (determineAccent(word1)[0] === determineAccent(word2)[0]) {
    const word1LyricalSyllables = separateBySyllable(word1).slice(
      determineAccent(word1)[1]
    );
    const word2LyricalSyllables = separateBySyllable(word2).slice(
      determineAccent(word2)[1]
    );
    if (
      //Determine if there is a perfect rhyme
      word1LyricalSyllables.join("").toLowerCase() ===
      word2LyricalSyllables.join("").toLowerCase()
    )
      return "Rima perfecta";
    else {
      // if there is no perfect rhyme
      //console.log(word1LyricalSyllables);
      word1LyricalSyllables[0] = getSyllableFromStrongVowel(
        word1LyricalSyllables[0]
      );
      word2LyricalSyllables[0] = getSyllableFromStrongVowel(
        word2LyricalSyllables[0]
      );
      //console.log(word1LyricalSyllables, word2LyricalSyllables);
      if (
        word1LyricalSyllables.join("").toLowerCase() ===
        word2LyricalSyllables.join("").toLowerCase()
      )
        return "Rima regular";
      else if (1) {
      }
    }
  }
  return "No rima";
};
