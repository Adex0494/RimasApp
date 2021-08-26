import classes from "./ColoredWordsContainer.module.css";

function ColoredWordsContainer(props) {
  return <div className={classes.container}>{props.children}</div>;
}

export default ColoredWordsContainer;
