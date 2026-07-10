import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";
import type { Key } from "./types/Key";

function App() {
  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");

  function handleKeyPress(key: Key) {
    if (key.type !== "number") {
      return;
    }
    setValue((prevValue) => prevValue + key.label);
  }

  return (
    <main className="calculator">
      <Display history={history} value={value} />
      <Keyboard onKeyPress={handleKeyPress} />
      <Credits />
    </main>
  );
}

export default App;
