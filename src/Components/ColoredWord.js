function ColoredWord(props) {
  return (
    <span
      onMouseOver={() => {
        console.log(props.children);
      }}
      style={props.style}
    >
      {props.children}
    </span>
  );
}

export default ColoredWord;
