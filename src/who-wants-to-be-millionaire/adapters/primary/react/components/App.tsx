import "../../../../../App.css";
import {Pyramid} from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import React from "react";
import {GameScreen} from "./GameScreen.tsx";

type Game = {
    pyramid: Pyramid;
    setPyramid: (pyramid: Pyramid) => void;
}

export let GameContext = React.createContext<Game>(null as any);

const App = () => {

    const [game, setGame] = React.useState<Game>({
        pyramid: {steps: [0, 1000000], currentStep: 0},
        setPyramid: (pyramid: Pyramid) => {
            setGame({...game, pyramid});
        }
    });

    return <GameContext.Provider value={game}>
        <GameScreen/>
    </GameContext.Provider>
};

export default App;
