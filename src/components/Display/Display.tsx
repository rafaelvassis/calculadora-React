import "./Display.css";

type DisplayProps = {
  history: string;
  value: string;
};

function Display({ history, value }: DisplayProps) {
  return (
    <section className="display">
      <span className="display__history">{history}</span>
      <h1 className="display__value">{value}</h1>
    </section>
  );
}

export default Display;
