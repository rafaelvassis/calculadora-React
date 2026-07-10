import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";
import type { Key } from "./types/Key";
import type { Operator } from "./types/Operator";

function App() {
  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [hasError, setHasError] = useState(false);
  const divisionByZeroMessage = "Não é possível dividir por zero";

  function handleKeyPress(key: Key) {
    if (hasError) {
      if (key.type === "number") {
        if (key.label === ",") return;

        resetCalculator();
        setValue(key.label);
      }

      if (key.type === "action") {
        if (key.label === "±") return;

        resetCalculator();
      }

      return;
    }

    switch (key.type) {
      case "number":
        handleNumber(key);
        break;

      case "action":
        handleAction(key);
        break;

      case "operator":
        handleOperator(key);
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
        resetCalculator();
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

  function handleOperator(key: Key) {
    const newOperator = key.label as Operator;

    if (operator === null) {
      const operand = Number(value);

      setFirstOperand(operand);
      setOperator(newOperator);
      setHistory(`${operand} ${newOperator}`);
      setValue("0");

      return;
    }

    if (firstOperand === null) {
      throw new Error("Estado inválido da calculadora.");
    }

    if (firstOperand === null) {
      return;
    }

    let result: number;

    try {
      result = calculate(firstOperand, Number(value), operator);
    } catch {
      setHasError(true);

      setFirstOperand(null);
      setOperator(null);

      setHistory(`${firstOperand} ${operator} 0`);
      setValue(divisionByZeroMessage);
      return;
    }

    setFirstOperand(result);
    setOperator(newOperator);
    setHistory(`${result} ${newOperator}`);
    setValue("0");
  }

  function calculate(
    first: number,
    second: number,
    operator: Operator,
  ): number {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        if (second === 0) {
          throw new Error("DIVISION_BY_ZERO");
        }

        return first / second;
    }
  }

  function resetCalculator() {
    setHistory("");
    setValue("0");
    setFirstOperand(null);
    setOperator(null);
    setHasError(false);
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
