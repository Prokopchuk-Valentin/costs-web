import { useUnit } from "effector-react";

import { useState } from "react";
import {
  $counter,
  $multiplierOrDivisor,
  buttonClickedMinus,
  buttonClickedPlus,
  changeMultiplierOrDivisor,
} from "./stores";

function App() {
  const [count, setCount] = useState(0);
  const count2 = useUnit($counter);
  const multiplierOrDivisor = useUnit($multiplierOrDivisor);
  const changeMultiplier = useUnit(changeMultiplierOrDivisor); //
  const handlePlusClick = useUnit(buttonClickedPlus);
  const handleMinusClick = useUnit(buttonClickedMinus);

  const handleChangeMultiplier = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value; // Извлекаем значение из события
    changeMultiplier(Number(newValue)); // Приводим значение к числу и передаем в событие Effector
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p />
        <button onClick={handlePlusClick}>+</button>
        {count2}
        <button onClick={handleMinusClick}>-</button>
        <p />
        <input
          type="number"
          onChange={handleChangeMultiplier}
          value={multiplierOrDivisor}
        />
      </div>
    </>
  );
}

export default App;
