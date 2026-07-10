import "./Button.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: ButtonProps) {
  return (
    <button onClick = {onClick} className="button">
      {label}
    </button>
  );
}

export default Button;