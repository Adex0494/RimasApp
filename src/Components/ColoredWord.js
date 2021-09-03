function ColoredWord(props) {
  return (
    <span
      data-styleIndex = {props.styleIndex}
      onMouseOver={() => {
        document.querySelectorAll(`[data-styleIndex='${props.styleIndex}']`).forEach(el=> el.style.border="3px solid black")
      }}
      onMouseOut={()=>{
        document.querySelectorAll(`[data-styleIndex='${props.styleIndex}']`).forEach(el=> el.style.border='none')
      }}
      style={props.style}
    >
      {props.children}
    </span>
  );
}

export default ColoredWord;
