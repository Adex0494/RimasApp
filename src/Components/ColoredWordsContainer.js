import classes from "./ColoredWordsContainer.module.css";

function ColoredWordsContainer(props) {
  return <div id={props.id} className={classes.container}>{props.children}</div>;
}

export default ColoredWordsContainer;
