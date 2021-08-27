import WordBox from "./Components/WordBox";
import TextBox from "./Components/TextBox";
import RhymingWords from "./Components/RhymingWords";
import WordLabel from "./Components/WordLabel";
import classes from "./App.module.css";
import Button from "./Components/Button";
import React, { useState } from "react";
import { determineLyricism } from "../src/helper/rhymeEvaluator";
import ColorWord from "./Components/ColoredWord";
import ColoredWordsContainer from "./Components/ColoredWordsContainer";
import ColoredWord from "./Components/ColoredWord";

function App() {
  const [wordInSyllables, setWordInSyllables] = useState("");
  const [wordType, setWordType] = useState("");
  const [lyricism, setLyricism] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [rhymes, setRhymes] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [colorWords, setColorWords] = useState(false);
  const [containerChildren, setContainerChildren] = useState();

  const showWordInSyllableAndType = (word, theWordType) => {
    setWordInSyllables(word);
    setWordType(theWordType);
  };

  const showLyricismOfWords = () => {
    setLyricism(determineLyricism(word1, word2));
  };

  const generateHexRandomColor = () => {
    const rgbColor = [0, 0, 0];
    let sum = 0;
    rgbColor.forEach((color, i) => {
      if (i === 2) {
        let randomNumber;
        if (sum < 70) {
          randomNumber = 70 - sum + Math.round(255 * Math.random());
        }
        if (sum > 445) {
          randomNumber = Math.round((700 - sum) * Math.random());
        }
        if (sum >= 70 && sum <= 445) {
          randomNumber = Math.round(255 * Math.random());
        }
        rgbColor[2] = randomNumber.toString(16);
      }
      let numb = Math.round(255 * Math.random());
      sum += numb;
      rgbColor[i] = numb.toString(16);
    });

    return "#" + rgbColor[0] + rgbColor[1] + rgbColor[2];
  };

  const getListOfRhymes = (text) => {
    const stylesArr = [
      // {
      //   backgroundColor: "white",
      //   color: "red",
      //   fontSize: "24px",
      // },
      // {
      //   backgroundColor: "white",
      //   color: "blue",
      //   fontSize: "24px",
      // },
    ];
    const wordStyleArr = [];
    const words = text
      .replace(/[.,/#¡!$%^&*;:{}=\-—_`~()""''¿?«»‘’“”\[\]'\\' ]/g, " ")
      .split(" ")
      .filter((word) => word !== "");
    //console.log(words);
    const listOfRhymes = [];
    words.forEach((word, wordIndex) => {
      if (listOfRhymes.length === 0) {
        //First word?
        listOfRhymes.push([[word, wordIndex]]); //Put word as the first element of a list of words that rhyme. This element is an array with the word and the its index
        // stylesArr.push({
        //   backgroundColor: "white",
        //   color: generateHexRandomColor,
        //   fontSize: "24px",
        // });

        //wordStyleArr.push([word, -1]);//
        words[wordIndex] = [word, -1];
      } else {
        let hasARhyme = false;
        for (let i = 0; i < listOfRhymes.length; i++) {
          const lyricism = determineLyricism(word, listOfRhymes[i][0][0]);
          if (lyricism !== "No rima") {
            if (listOfRhymes[i].length === 1) {
              stylesArr.push({
                backgroundColor: "white",
                color: generateHexRandomColor,
                fontSize: "24px",
              });
              words[listOfRhymes[i][0][1]][1] = stylesArr.length - 1;
            }

            if (listOfRhymes[i].length > 1) {
              words[wordIndex] = [word, listOfRhymes[i][0][1]]; //incorrect Modify algorithm
            }

            hasARhyme = true;
            listOfRhymes[i].push([word, wordIndex]);
            //wordStyleArr.push([word, i]);
            words[wordIndex] = [word, stylesArr.length - 1];
            break;
          }
        }
        if (!hasARhyme) {
          listOfRhymes.push([[word, wordIndex]]);

          //wordStyleArr.push([word, listOfRhymes.length - 1]);
          words[wordIndex] = [word, -1];
        }
      }
    });

    setContainerChildren(
      wordStyleArr.map((wordStyle, i) => (
        <ColoredWord key={i} style={stylesArr[wordStyle[1]]}>
          {`${wordStyle[0]} `}
        </ColoredWord>
      ))
    );

    setColorWords(true);
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
      {colorWords ? (
        <ColoredWordsContainer>{containerChildren}</ColoredWordsContainer>
      ) : (
        <TextBox
          onChange={(value) => {
            setTextAreaValue(value);
          }}
          rows={30}
          cols={50}
        ></TextBox>
      )}
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
