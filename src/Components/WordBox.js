import classes from "./WordBox.module.css";

function WordBox() {
  return (
    <input
      className={classes}
      maxLength={33}
      placeholder="Digite una palabra"
      required
    ></input>
  );
}
export default WordBox;
