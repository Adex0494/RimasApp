import WordBox from "./Components/WordBox";
import RhymingWords from "./Components/RhymingWords";
import WordLabel from "./Components/WordLabel";
import classes from "./App.module.css";
import React, { useState } from "react";
import { determineLyricism } from "../src/helper/rhymeEvaluator";

function App() {
  const [wordInSyllables, setWordInSyllables] = useState("");
  const [wordType, setWordType] = useState("");
  const [lyricism, setLyricism] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
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

  const showLyricismOfWords = () => {
    setLyricism(determineLyricism(word1, word2));
  };

  return (
    <React.Fragment>
      <div className={classes}>
        <div>
          <WordBox
            submitHandler={showWordInSyllableAndType}
            clearWord={true}
          ></WordBox>
        </div>
        <div>
          <WordLabel word={wordInSyllables}></WordLabel>
          <WordLabel word={wordType}></WordLabel>
        </div>
      </div>

      <div className={classes}>
        <div>
          <WordBox
            submitHandler={showLyricismOfWords}
            onChangeInput={(value) => {
              setWord1(value);
            }}
          ></WordBox>
        </div>
        <div>
          <WordBox
            submitHandler={showLyricismOfWords}
            onChangeInput={(value) => {
              setWord2(value);
            }}
          ></WordBox>
        </div>

        <div>
          <WordLabel word={lyricism}></WordLabel>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
