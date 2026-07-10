import Button from "../Button/Button";
import "./Keyboard.css";
import type {Key} from "../../types/key"


const keys: Key[] = [
  { id: 1, label: "CE", type: "action" },
  { id: 2, label: "C", type: "action" },
  { id: 3, label: "⌫", type: "action" },
  { id: 4, label: "÷", type: "operator" },

  { id: 5, label: "7", type: "number" },
  { id: 6, label: "8", type: "number" },
  { id: 7, label: "9", type: "number" },
  { id: 8, label: "×", type: "operator" },

  { id: 9, label: "4", type: "number" },
  { id: 10, label: "5", type: "number" },
  { id: 11, label: "6", type: "number" },
  { id: 12, label: "-", type: "operator" },

  { id: 13, label: "1", type: "number" },
  { id: 14, label: "2", type: "number" },
  { id: 15, label: "3", type: "number" },
  { id: 16, label: "+", type: "operator" },

  { id: 17, label: "±", type: "action" },
  { id: 18, label: "0", type: "number" },
  { id: 19, label: ",", type: "number" },
  { id: 20, label: "=", type: "equals" },
];

function Keyboard() {

  function handleKeyPress(key: Key) {
    console.log(`Função ainda não implementada para a tecla ${key.label}`);
  }

  return (
    <section className="keyboard">
      {keys.map((key) => (
        <Button
          key={key.id}
          label={key.label}
          type={key.type}
          onClick={() => handleKeyPress(key)}
        />
      ))}
    </section>
  );
}

export default Keyboard;
