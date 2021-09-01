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
    //console.log("#" + rgbColor[0] + rgbColor[1] + rgbColor[2]);
    return "#" + rgbColor[0] + rgbColor[1] + rgbColor[2];
  };

  const getListOfRhymes = (text) => {
    const stylesArr = [
      //default style for words that do not have a rhyming partner
      {
        whiteSpace: "pre-wrap",
        backgroundColor: "white",
        color: "black",
        fontSize: "24px",
      },
    ];

    const words = text
      //.replace(/[.,/#¡!$%^&*;:{}=\-—_`~()""''¿?«»‘’“”\[\]'\\' ]/g, " ")
      .replaceAll("\n", " \n ")
      .split(" ")
      .filter((word) => word !== "");
    //console.log(words);
    const listOfRhymes = [];
    words.forEach((word, wordIndex) => {
      if (word === "\n") {
        //words[wordIndex] = [word, 0];
        return;
      }
      if (listOfRhymes.length === 0) {
        //First word?
        listOfRhymes.push([[word, wordIndex]]); //Put word as the first element of a list of words that rhyme. This element is an array with the word and the its index
        words[wordIndex] = [word, 0]; //0 means the word does not have a rhyme, yet. Hence, it has the default style (0)
      } else {
        let hasARhyme = false;
        for (let i = 0; i < listOfRhymes.length; i++) {
          const lyricism = determineLyricism(word, listOfRhymes[i][0][0]);
          if (lyricism === "Rima perfecta" || lyricism === "Rima regular") {
            if (listOfRhymes[i].length === 1) {
              stylesArr.push({
                whiteSpace: "pre-wrap",
                fontWeight: "bold",
                fontStyle: "italic",
                backgroundColor: "white",
                color: generateHexRandomColor(),
                fontSize: "24px",
              });
              const styleIndex = stylesArr.length - 1;
              listOfRhymes[i][0].push(styleIndex); //The first element of the corresponding array in the list of rhymes now is pushed the style index as reference for next words that rhyme. Only the first element has this extra data
              words[listOfRhymes[i][0][1]][1] = styleIndex; //Now the [word,-1] in the wordIndex stored in the first element mentioned above becomes [word,styleIndex]
              words[wordIndex] = [word, styleIndex];
            } else {
              words[wordIndex] = [word, listOfRhymes[i][0][2]]; //This word now has the style index of the first element of the corresponding  array in the list of rhymes (the same element mentioned above).
            }

            hasARhyme = true;
            listOfRhymes[i].push([word, wordIndex]);
            break;
          }
        }
        if (!hasARhyme) {
          listOfRhymes.push([[word, wordIndex]]);

          words[wordIndex] = [word, 0];
        }
      }
    });

    setContainerChildren(
      <p>
        {words.map((wordStyle, i) =>
          wordStyle !== "\n" ? (
            <ColoredWord key={i} style={stylesArr[wordStyle[1]]}>
              {`${wordStyle[0]} `}
            </ColoredWord>
          ) : (
            <span key={i} style={{ whiteSpace: "pre-wrap" }}>
              {"\n"}
            </span> //next line
          )
        )}
      </p>
    );

    setColorWords(true);
    //console.log(words);
    //console.log(listOfRhymes);
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
          value={textAreaValue}
        ></TextBox>
      )}
      <Button
        onClick={() => {
          getListOfRhymes(textAreaValue);
        }}
        text="Determinar rimas"
      ></Button>
      {colorWords && (
        <Button
          onClick={() => {
            setColorWords(false);
          }}
          text="Editar"
        ></Button>
      )}
    </React.Fragment>
  );
}

export default App;
