function ColoredWord(props) {
  return (
    <span
      data-styleindex = {props.styleIndex}
      onMouseOver={() => {
        if(props.styleIndex!==0)
          document.querySelectorAll(`[data-styleIndex='${props.styleIndex}']`).forEach(el=>{ el.style.border=`1px solid ${el.style.color}`; el.style.borderRadius='3px'; })
      }}
      onMouseOut={()=>{
        if(props.styleIndex!==0)
          document.querySelectorAll(`[data-styleIndex='${props.styleIndex}']`).forEach(el=> el.style.border='none')
      }}
      style={props.style}
    >
      {props.children}
    </span>
  );
}

export default ColoredWord;
