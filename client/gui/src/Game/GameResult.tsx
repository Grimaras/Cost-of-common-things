import React from "react";
import _ from "lodash";
import {HUD} from "./Hud";
import {useSelector} from 'react-redux';
import {IAppState} from "../redux/reducer";
import {ScenariosObjectifs} from "./Objective";
import {GameResultGraph} from "./GameResultGraph";
import {GET_BACKEND_URL} from "../http/Client";


export const GameResult = () => {
    const rAndDVal = useSelector((appState: IAppState) => appState.game!.rAndD);

    const objectiveNb = useSelector((app: IAppState) => app.objectiveNb);
    const scenario = ScenariosObjectifs[objectiveNb!];
    const rawData = useSelector((app:IAppState) => app.game!);
    const gameId = useSelector((app: IAppState) => app.gameResult && app.gameResult!._id);

    console.log("------------------------------");

    const sommeAll = _.reduce(rawData.components, (acc, element) => {
        return {
            eco: acc.eco + element.criteres.eco,
            perf: acc.perf + element.criteres.perf,
            prix: acc.prix + element.criteres.prix
        }
    }, {
        eco: 0,
        perf: 0,
        prix: 0
    });

    console.log("Somme all = ", sommeAll);

    const rAndDPro = Math.round(rAndDVal*100)/scenario.criteres.rAndD;
    var resTarget = scenario.criteres.prix + scenario.criteres.perf;
    var resProcent = Math.round(((sommeAll.perf + sommeAll.prix)*100)/resTarget);

    const resFinal = Math.round(((resProcent*2) + rAndDPro)/2);
    const resShow = resFinal > 100 ? resFinal - ((resFinal - 100)*2) :  resFinal;
    const resShowFin = resShow < 0 ? 0 : resShow;

    return (
        <section className="hero is-medium is-primary is-bold is-fullheight">
            <HUD/>
            <div className="hero-body">
                <div className="container">
                    <p className="title is-1 is-spaced" style={{marginBottom: 20}}>Les résultats de votre projet :</p>
                    <br />
                    <p className="title is-4 is-spaced" style={{marginBottom: 40}}>{scenario.name} : {scenario.description}</p>
                    <br />
                    <div className="columns">
                        <div className="column">
                            <article >

                                    <p className="title is-5">Votre score : </p>
                                    <hr />
                                    <div className="is-vcentered">
                                        <p className="subtitle" style={{marginTop: 40 }}> Performance : {Math.round(sommeAll.perf)} / {scenario.criteres.perf}</p>
                                        <progress className="progress is-danger" value={sommeAll.perf} max={scenario.criteres.perf}></progress>
                                        <p className="subtitle" style={{marginTop: 20 }} > Prix : {Math.round(sommeAll.prix)} / {scenario.criteres.prix}</p>
                                        <progress className="progress is-warning" style={{marginBottom: 20 }} value={Math.round(sommeAll.prix)} max={scenario.criteres.prix}></progress>
                                        <p className="subtitle" style={{marginBottom: 20}}> Cout R&D : {Math.round(rAndDVal)} / {scenario.criteres.rAndD} </p>
                                        <progress className="progress is-success" style={{marginBottom: 20 }} value={Math.round(rAndDVal)} max={scenario.criteres.rAndD}></progress>
                                    </div>
                            </article>
                        </div>

                        <div className="column" >
                            <article>
                                <p className="title is-5 is-spaced">Réussite de votre projet :</p>
                                <hr />
                                <p className="is-italic has-text-weight-medium " style={{ fontSize: 160 }} >{resShowFin}%</p>
                            </article>
                        </div>

                        <div className="column">
                            <article>
                                <p className="title is-5 is-spaced">Score par rapport aux parties precedentes:</p>
                                <hr />
                                <div className="is-vcentered is-centered">
                                    <GameResultGraph />
                                </div>
                            </article>
                        </div>
                    </div>
                    <hr />
                    { gameId &&
                        <a href={GET_BACKEND_URL() + "details?gId=" + gameId }>
                            <button className="button is-info" style={{ fontSize: 25, marginTop: 20 }}>
                                Voir les détails!
                            </button>
                        </a>
                        || null }
                </div>
            </div>

        </section>
    )
};
