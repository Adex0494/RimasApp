import WordBox from "./Components/WordBox";
import RhymingWords from "./Components/RhymingWords";
import WordLabel from "./Components/WordLabel";
import classes from "./App.module.css";
import { useState } from "react";

function App() {
  const [wordInSyllables, setWordInSyllables] = useState("");
  const DUMMY_WORDS = [
    "zorra",
    "porra",
    "corra",
    "chorra",
    "borra",
    "lorra",
    "ñorra",
  ];

  const showWordInSyllable = (word) => {
    setWordInSyllables(word);
  };
  return (
    <div className={classes}>
      <div>
        <WordBox submitHandler={showWordInSyllable}></WordBox>
      </div>
      <div>
        <WordLabel word={wordInSyllables}></WordLabel>
      </div>
    </div>
  );
}

export default App;
