import "../../../../../App.css";
import {Pyramid} from "../../../../core-logic/use-cases/answer-validation/validateAnswer.ts";
import React, {Context} from "react";
import {GameScreen} from "./GameScreen.tsx";

type Game = {
    pyramid: Pyramid;
    setPyramid: (pyramid: Pyramid) => void;
}

export let GameContext: Context<Game>;

const App = () => {

    const initialGame: Game = {
        pyramid: {steps: [0, 1000000], currentStep: 0},
        setPyramid: (pyramid: Pyramid) => {
            setGame({...game, pyramid});
        }
    };

    GameContext = React.createContext<Game>(initialGame);

    const [game, setGame] = React.useState<Game>(initialGame);

    return <GameContext.Provider value={game}>
        <GameScreen />
    </GameContext.Provider>
};

export default App;
