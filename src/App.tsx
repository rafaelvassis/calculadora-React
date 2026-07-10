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
    if (key.type === "action") handleAction(key);
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
    // CE (Clean Entry - Limpar entrada)
    if (key.label === "CE") {
      setValue("0");
    }

    // Tecla C (Clear - Limpa a memória da calculadora)
    if (key.label === "C") {
      setHistory("");
      setValue("0");
    }

    // Tecla ⌫ (Backspace)
    if (key.id === 3) {
      if (value.length > 0) {
        setValue((prev) => {
          return prev.length > 0 ? prev.slice(0, -1) : prev;
        });
      }

      if (value.length === 1) {
        setValue("0");
      }
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
