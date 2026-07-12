import type { Operator } from "../types/Operator";

export function calculate(
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

export function parseDisplayValue(val: string): number {
  // Substitui a vírgula pelo ponto antes de converter para número
  return Number(val.replace(",", "."));
}

export function formatNumberToDisplay(num: number): string {
  // Transforma o número em string e troca o ponto por vírgula
  return num.toString().replace(".", ",");
}
