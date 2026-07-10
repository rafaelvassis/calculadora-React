
import Credits from "./components/Credits/Credits";
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
   return (
    <main className="calculator">
      <Display
        history="12 + 35"
        value="47"
      />
      <Keyboard />
      <Credits/>
    </main>
  );
}

export default App;