import React, {useEffect} from "react";
import useTypewriter from "react-use-typewriter";
import {useDispatch, useSelector} from "react-redux";
import {IAppState, startGame} from "../redux/reducer";
import {startGameTicking} from "./Game";
import {GameResultGraph} from "./GameResultGraph";

export const ScenariosObjectifs = [{
        name: "Flagship Killer",
        description: "Vous avez pour mission de creer le nouveau porte drapeau de l'entreprise, soyez ingenieux pour creer un telephone tres performant !",
        criteres: {
            rAndD: 6000,
            prix: 500,
            perf: 450
        },
    },
    {
        name: "Cost Killer",
        description: "Vous avez pour mission de creer le telephone d'entree de gamme de l'entreprise. Trouvez le compromis ingenieux entre performance et cout de fabrication !",
        criteres: {
            rAndD: 8000,
            prix: 100,
            perf:200
        }
    }
];

export const Objective = () => {

    const dispatch = useDispatch();
    const onClickStart = () => {
        dispatch(startGame());
        startGameTicking();
    };

    const [disabled, setDisabled] = React.useState(true);

    useEffect(() => {
        setTimeout(() => setDisabled(false), 500);
    }, []);
    const objectiveNb = useSelector((app: IAppState) => app.objectiveNb);

    const scenario = ScenariosObjectifs[objectiveNb!];
    const words = scenario.description;
    const currentWord = useTypewriter({words: [words], eraseWords: false, typeSpeed: 25, afterTypingDelay: 999999});

    return (
        <div>
            <section className="hero is-medium is-primary is-bold is-fullheight">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        {scenario.name}
                    </h1>
                    <h2 className="subtitle">
                        {currentWord}
                        <span className="cursor">|</span>
                    </h2>
                    <button className="button is-success" onClick={onClickStart} disabled={disabled}>
                        Accepter la mission
                    </button>
                    <hr />
                    <div className="columns">
                        <div className="column">
                            <h1 className="title"> Budget R&D maximum</h1>
                            <h2 style={{fontSize: 32}}>{scenario.criteres.rAndD}</h2>
                        </div>
                        <div className="column">
                            <h1 className="title"> Prix de fabrication cible</h1>
                            <h2 style={{fontSize: 32}}>{scenario.criteres.prix}</h2>
                        </div>
                         <div className="column">
                            <h1 className="title"> Performance minimale</h1>
                             <h2 style={{fontSize: 32}}>{scenario.criteres.perf}</h2>
                        </div>
                        <div className="column">
                            <h1 className="title"> Historique des parties</h1>
                                <GameResultGraph />
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
