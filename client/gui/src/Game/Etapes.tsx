import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {IAppState, setStep} from "../redux/reducer";
import _ from "lodash";


interface IEtape {
    id: number;
    name: string;
}
const etapes = [{
    id: 1,
    name: "Batterie"
}, {
    id: 2,
    name: "Ecran"
}, {
    id: 3,
    name: "Processeur"
}, {
    id: 4,
    name: "RAM"
}, {
    id: 5,
    name: "Stockage"
}, {
    id: 6,
    name: "Coque"
}, {
    id: 7,
    name: "Fin"
}];

const Etape = () => {
    return null;
};


export const Etapes = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector((appState: IAppState) => appState.game && appState.game.currentStep);
    console.log("ETAPES", currentStep);

    const maybeSelectedComponents = useSelector((appState: IAppState) => appState.game && appState.game.components);

    const onClick = (e: IEtape) => () => dispatch(setStep(e.id));

    return (
        <div className="tile is-parent is-3 is-vertical">
            {
                etapes.map((e) => {
                    const maybeSelectedComponent = maybeSelectedComponents && _.find(maybeSelectedComponents, (c) => c.idEtape === e.id)
                    const color = e.id === currentStep
                        ? 'is-success'
                        : maybeSelectedComponent ? 'is-dark' : 'is-warning'; // TODO: Check if component selected or if current step
                    const componentSelectedName = maybeSelectedComponent ? maybeSelectedComponent.name :''// TODO: Check if component selected
                    return (
                        <article
                            className={`tile is-child notification ${color}`}
                            onClick={onClick(e)}
                            style={{minHeight: 105, cursor: 'pointer'}}
                        >
                            <p className="title">{e.name}</p>
                            <p className="subtitle">{componentSelectedName}</p>
                        </article>
                    );
                })
            }
        </div>
    );
};
