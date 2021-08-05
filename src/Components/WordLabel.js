import classes from "./WordLabel.module.css";

function WordLabel(props) {
  return <div className={classes.rectangle}>{props.word}</div>;
}

export default WordLabel;
