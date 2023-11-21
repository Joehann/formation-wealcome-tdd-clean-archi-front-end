import {useSelector} from "react-redux";
import {AppState} from "../../../../../store/appState.ts";

export const Pyramid = () => {

    const pyramid = useSelector((state: AppState) => state.pyramid);

    return (
        <div className="mt-3 justify-center rounded-lg text-yellow-500">
            <div className="flex flex-col justify-center">
                <ul className="flex flex-col mx-auto">
                    {
                        pyramid.steps.map((step, index) => {
                            return (
                                <li key={index} className="text-white font-bold">
                                    <div className={pyramid.currentStep === pyramid.steps[index] ?
                                        "p-2 rounded-full bg-orange-500" : ''}>{step} €</div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};
