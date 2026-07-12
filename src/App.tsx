import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";
import type { Key } from "./types/Key";
import type { Operator } from "./types/Operator";

function App() {
  const divisionByZeroMessage = "Não é possível dividir por zero";

  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [resetScreen, setResetScreen] = useState<boolean>(true);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [lastOperator, setLastOperator] = useState<Operator | null>(null);
  const [lastOperand, setLastOperand] = useState<number | null>(null);

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

      case "equals":
        handleEquals();
        break;
    }
  }

  function handleNumber(key: Key) {
    if (hasResult) {
      resetCalculator();
      setValue(key.label);
      return;
    }

    if (resetScreen) {
      if (key.label === ",") {
        setValue((prev) => prev + ",");
        setResetScreen(false);
        return;
      }

      setValue(key.label);
      setResetScreen(false);
      return;
    }

    // Evita dois zeros iniciais
    if (value === "0" && key.label === "0") {
      return;
    }

    // Evita o zero à esquerda
    if (value === "0" && key.label !== ",") {
      setValue(key.label);
      return;
    }

    // Vírgula
    if (key.label === ",") {
      if (value.includes(",")) return;

      setValue((prev) => prev + ",");

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
    setHasResult(false);

    const newOperator = key.label as Operator;

    if (operator === null) {
      const operand = parseDisplayValue(value);

      setFirstOperand(operand);
      setOperator(newOperator);
      setHistory(`${formatNumberToDisplay(operand)} ${newOperator}`);
      setValue("0");
      setResetScreen(true);

      return;
    }

    if (firstOperand === null) {
      throw new Error("Estado inválido da calculadora.");
    }

    let result: number;

    try {
      result = calculate(firstOperand, parseDisplayValue(value), operator);
    } catch {
      setHasError(true);
      setResetScreen(true);

      setFirstOperand(null);
      setOperator(null);

      setHistory(`${formatNumberToDisplay(firstOperand)} ${operator} 0`);
      setValue(divisionByZeroMessage);
      return;
    }

    setFirstOperand(result);
    setOperator(newOperator);
    setHistory(`${formatNumberToDisplay(result)} ${newOperator}`);
    setValue("0");
    setResetScreen(true);
  }

  function handleEquals() {
    let result: number;

    if (operator === null || firstOperand === null) {
      if (lastOperator === null || lastOperand === null) return;

      result = calculate(parseDisplayValue(value), lastOperand, lastOperator);

      setHistory(
        `${value} ${lastOperator} ${formatNumberToDisplay(lastOperand)} =`,
      );
      setValue(result.toString().replace(".", ","));
      setHasResult(true);

      return;
    }

    try {
      result = calculate(firstOperand, parseDisplayValue(value), operator);
    } catch {
      setHasError(true);

      setResetScreen(true);

      setFirstOperand(null);
      setOperator(null);

      setHistory(`${formatNumberToDisplay(firstOperand)} ${operator} ${value}`);

      setValue(divisionByZeroMessage);

      return;
    }

    setHistory(`${formatNumberToDisplay(firstOperand)} ${operator} ${value} =`);

    setLastOperator(operator);
    setLastOperand(parseDisplayValue(value));

    setValue(formatNumberToDisplay(result));

    setHasResult(true);

    setFirstOperand(null);
    setOperator(null);
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

  function parseDisplayValue(val: string): number {
    // Substitui a vírgula pelo ponto antes de converter para número
    return Number(val.replace(",", "."));
  }

  function formatNumberToDisplay(num: number): string {
    // Transforma o número em string e troca o ponto por vírgula
    return num.toString().replace(".", ",");
  }

  function resetCalculator() {
    setHistory("");
    setValue("0");
    setFirstOperand(null);
    setOperator(null);
    setHasError(false);
    setHasResult(false);
    setLastOperator(null);
    setLastOperand(null);
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
