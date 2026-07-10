import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";
import type { Key } from "./types/Key";

function App() {
  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");

  function handleKeyPress(key: Key) {
    switch (key.type) {
      case "number":
        handleNumber(key);
        break;

      case "action":
        handleAction(key);
        break;
    }
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

  function handleAction(key: Key) {
    switch (key.label) {
      case "CE": // Clear Entry (Limpa toda a entrada)
        setValue("0");
        break;

      case "C": // Clear (Limpa toda a memória)
        setHistory("");
        setValue("0");
        break;

      case "⌫": // Backspace
        setValue((prev) => {
          if (prev.length <= 1) {
            return "0";
          }

          return prev.slice(0, -1);
        });
        break;

      case "±": // Inverte o sinal
        if (value === "0") return;

        if (value.startsWith("-")) {
          setValue((prev) => {
            return prev.slice(1);
          });
        } else {
          setValue((prev) => "-" + prev);
        }
        break;
    }
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
