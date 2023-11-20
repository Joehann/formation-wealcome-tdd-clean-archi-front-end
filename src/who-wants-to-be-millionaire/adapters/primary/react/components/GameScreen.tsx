import { CurrentQuestion } from "./current-question/CurrentQuestion.component.tsx";
import { Jokers } from "./jokers/Jokers.component.tsx";
import { Pyramid } from "./pyramid/Pyramid.component.tsx";


export const GameScreen = () => {
  return (
    <div className="App">
      <div className="flex justify-between mx-3">
        <div className="flex flex-col w-6/12">
          <CurrentQuestion />
        </div>
        <div className="flex flex-col w-6/12 bg-gradient-to-r from-indigo-900 ml-5">
          <div>
            <Jokers />
            <Pyramid />
          </div>
        </div>
      </div>
    </div>
  );
}
