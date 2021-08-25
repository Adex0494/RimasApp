import WordBox from "./Components/WordBox";
import TextBox from "./Components/TextBox";
import RhymingWords from "./Components/RhymingWords";
import WordLabel from "./Components/WordLabel";
import classes from "./App.module.css";
import Button from "./Components/Button";
import React, { useState } from "react";
import { determineLyricism } from "../src/helper/rhymeEvaluator";

function App() {
  const [wordInSyllables, setWordInSyllables] = useState("");
  const [wordType, setWordType] = useState("");
  const [lyricism, setLyricism] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [rhymes, setRhymes] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");

  const showWordInSyllableAndType = (word, theWordType) => {
    setWordInSyllables(word);
    setWordType(theWordType);
  };

  const showLyricismOfWords = () => {
    setLyricism(determineLyricism(word1, word2));
  };

  const getListOfRhymes = (text) => {
    const words = text
      .replace(/[.,/#¡!$%^&*;:{}=\-—_`~()""''¿?«»‘’“”\[\]'\\' ]/g, " ")
      .split(" ")
      .filter((word) => word !== "");
    //console.log(words);
    const listOfRhymes = [];
    words.forEach((word) => {
      if (listOfRhymes.length === 0) {
        listOfRhymes.push([word]);
      } else {
        let hasARhyme = false;
        for (let i = 0; i < listOfRhymes.length; i++) {
          const lyricism = determineLyricism(word, listOfRhymes[i][0]);
          if (lyricism !== "No rima") {
            hasARhyme = true;
            listOfRhymes[i].push(word);
            break;
          }
        }
        if (!hasARhyme) listOfRhymes.push([word]);
      }
    });
    console.log(listOfRhymes);
    return listOfRhymes;
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
      <TextBox
        onChange={(value) => {
          setTextAreaValue(value);
        }}
        rows={30}
        cols={50}
      ></TextBox>
      <Button
        onClick={() => {
          getListOfRhymes(textAreaValue);
        }}
        text="Determinar rimas"
      ></Button>
    </React.Fragment>
  );
}

export default App;
