import classes from "./Button.module.css";

function Button(props) {
  return (
    <button className={classes} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
