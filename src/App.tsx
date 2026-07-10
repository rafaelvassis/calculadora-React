import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";
import type { Key } from "./types/Key";

function App() {
  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");

  function handleKeyPress(key: Key) {
    if (key.type === "number") handleNumber(key);
  }

  function handleNumber(key: Key) {
    // Evita dois zeros iniciais
    if (value === "0" && key.label === "0") return;

    // Vírgula
    if (key.label === ",") {
      if (value.includes(",")) return;

      setValue((prev) => prev + ",");

      return;
    }

    // Primeiro número substitui o zero inicial
    if (value === "0") {
      setValue(key.label);
      return;
    }

    // Concatena os demais números
    setValue((prev) => prev + key.label);
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
