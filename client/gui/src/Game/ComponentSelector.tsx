import React from "react";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import _ from "lodash";
import {Component} from "./Component";
import {IComposant} from "./models";
import {endGame} from "./Game";

const finalStep = 7;

export const ComponentSelector = () => {
    const composants = useSelector((app: IAppState) => app.cache.components);
    const currentStep = useSelector((app: IAppState) => app.game!.currentStep);
    const currentComposants = _.filter(composants, (c) => c.idEtape === currentStep);
    const userComposants = useSelector((app: IAppState) => app.game!.components);

    console.log("Composants : ", composants);
    console.log("Etape courante : ", currentStep);
    console.log("Current Composants : ", currentComposants);

    const selectionIisFull = userComposants && (userComposants.length === finalStep - 1);

    return currentStep !== finalStep ? (
      <div className="tile is-parent">
        <article className="tile is-child notification is-info">
            <p className="title">Selection des composants</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', textAlign: 'center'}}>
                {
                    currentComposants.map((c: IComposant, k: number) => {
                        return <Component composant={c}/>;
                    })
                }
            </div>
        </article>


      </div>
    ) :
        <div className="tile is-parent is-vcentered is-fullheight is-vertical">
            <div style={{marginTop: 200}}>
                <p>
                    {
                        selectionIisFull
                            ? <>Vous avez selectionne tous les composants possible. Souhaitez vous valider ?<br />
                    Vous pouvez toujours changer les composants.</>
                            : `Vous n'avez pas encore choisi tous les composants`
                    }
                    <br />
                    <button className="button is-success" onClick={endGame} disabled={!selectionIisFull}>
                        Valider le choix des composants
                    </button>
                </p>
            </div>
        </div>;
};