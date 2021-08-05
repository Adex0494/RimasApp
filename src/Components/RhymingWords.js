import classes from "./RhymingWords.module.css";
import WordLabel from "./WordLabel";
import { Fragment, React } from "react";

function RhymingWords(props) {
  const wordList = (theWordList) => {
    return (
      <Fragment>
        {theWordList.map((word, index) => (
          <WordLabel word={word} key={index}></WordLabel>
        ))}
      </Fragment>
    );
  };

  return <div className={classes.rectangle}>{wordList(props.wordList)}</div>;
}

export default RhymingWords;
