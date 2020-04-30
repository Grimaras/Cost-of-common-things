import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IAppState, setStep} from "../redux/reducer";
import _ from "lodash";


interface IEtape {
    id: number;
    name: string;
}

export const etapes = [{
    id: 6,
    name: "Coque"
}, {
    id: 2,
    name: "Ecran"
}, {
    id: 3,
    name: "Processeur"
}, {
    id: 1,
    name: "Batterie"
}, {
    id: 4,
    name: "RAM"
}, {
    id: 5,
    name: "Stockage"
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
    const latestEtapes = useMemo( () => maybeSelectedComponents && Math.max(...maybeSelectedComponents.map(c => etapes.findIndex(e => e.id === c.idEtape))),
        [maybeSelectedComponents]);
    console.log("Latest etapes : ", latestEtapes);

    const onClick = (e: IEtape) => () => dispatch(setStep(e.id));

    return (
        <div className="tile is-parent is-3 is-vertical">
            {
                etapes.map((e, k) => {
                    const maybeSelectedComponent = maybeSelectedComponents && _.find(maybeSelectedComponents, (c) => c.idEtape === e.id);
                    const color = e.id === currentStep
                        ? 'is-success'
                        : maybeSelectedComponent ? 'is-dark' : 'is-warning'; // TODO: Check if component selected or if current step
                    const componentSelectedName = maybeSelectedComponent ? maybeSelectedComponent.name :''// TODO: Check if component selected
                    const disabled = latestEtapes === -Infinity ? k > 1 : k - 1 > (latestEtapes || 0);

                    return (
                        <article
                            className={`tile is-child notification ${color}`}
                            onClick={disabled ? () => {} : onClick(e)}
                            style={{minHeight: 105, cursor: 'pointer', opacity: disabled ? 0.2 : 1}}
                        >
                            <p className="title">{e.name}</p>
                            <p className="subtitle">{componentSelectedName}</p>
                        </article>
                    );
                })
            }
        </div>
    );
}
