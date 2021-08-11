import classes from "./WordBox.module.css";
import { useRef, useState } from "react";
import { getSyllablesSeparated } from "../helper/rhymeEvaluator";

function WordBox(props) {
  const [inputValue, setInputValue] = useState("");
  const [wordInSyllables, setWordInSyllables] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler(getSyllablesSeparated(inputValue));
    setInputValue("");
  };

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className={classes}
        maxLength={33}
        placeholder="Digite una palabra"
        onChange={changeInputValue}
        value={inputValue}
        required
      ></input>
    </form>
  );
}
export default WordBox;
