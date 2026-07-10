
import type { Key } from "../../types/key";
import "./Button.css";

type ButtonProps = {
  label: string;
  type: Key["type"];
  onClick: () => void;
};

function Button({ label, type, onClick }: ButtonProps) {
  return (
    <button 
        onClick = {onClick} 
        className={`button button--${type}`}
    >
      {label}
    </button>
  );
}

export default Button;