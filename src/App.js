import WordBox from "./Components/WordBox";
import RhymingWords from "./Components/RhymingWords";
import WordLabel from "./Components/WordLabel";
import classes from "./App.module.css";
import { useState } from "react";

function App() {
  const [wordInSyllables, setWordInSyllables] = useState("");
  const [wordType, setWordType] = useState("");
  const DUMMY_WORDS = [
    "zorra",
    "porra",
    "corra",
    "chorra",
    "borra",
    "lorra",
    "ñorra",
  ];

  const showWordInSyllableAndType = (word, theWordType) => {
    setWordInSyllables(word);
    setWordType(theWordType);
  };

  return (
    <div className={classes}>
      <div>
        <WordBox submitHandler={showWordInSyllableAndType}></WordBox>
      </div>
      <div>
        <WordLabel word={wordInSyllables}></WordLabel>
        <WordLabel word={wordType}></WordLabel>
      </div>
    </div>
  );
}

export default App;
