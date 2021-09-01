import classes from "./TextBox.module.css";
import { useRef, useState } from "react";

function TextBox(props) {
  //const [textAreaValue, setTextAreaValue] = useState("");

  const changeTextAreaValue = (e) => {
    // setTextAreaValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <textarea
      onChange={changeTextAreaValue}
      rows={props.rows}
      cols={props.cols}
      className={classes}
      value={props.value}
      required
    ></textarea>
  );
}
export default TextBox;
