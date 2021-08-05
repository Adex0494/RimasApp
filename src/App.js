import WordBox from "./Components/WordBox";
import RhymingWords from "./Components/RhymingWords";

function App() {
  const DUMMY_WORDS = [
    "zorra",
    "porra",
    "corra",
    "chorra",
    "borra",
    "lorra",
    "ñorra",
  ];
  return (
    <div>
      <WordBox></WordBox>;<RhymingWords wordList={DUMMY_WORDS}></RhymingWords>
    </div>
  );
}

export default App;
