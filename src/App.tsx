
import Display from "./components/Display/Display";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
   return (
    <main>
      <Display
        history="12 + 35"
        value="47"
      />
      <Keyboard />
    </main>
  );
}

export default App;