import { useState } from "react";
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  const [history, setHistory] = useState("");
  const [value, setValue] = useState("0");

  return (
    <main className="calculator">
      <Display history={history} value={value} />
      <Keyboard />
      <Credits />
    </main>
  );
}

export default App;
