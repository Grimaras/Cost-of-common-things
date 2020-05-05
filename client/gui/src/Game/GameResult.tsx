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

    // console.log("------------------------------");

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

    // console.log("Somme all = ", sommeAll);

    /* Final Score */
    const rAndDPro = Math.round(rAndDVal*100)/scenario.criteres.rAndD;
    const resTarget = scenario.criteres.prix + scenario.criteres.perf;
    const resProcent = Math.round(((sommeAll.perf + sommeAll.prix)*100)/resTarget);

    const resFinal = resProcent;/*Math.round(((resProcent*2) + rAndDPro)/2);*/
    const resShow = resFinal > 100 ? resFinal - ((resFinal - 100)*2) :  resFinal;
    const resShowFin = resShow < 0 ? 0 : resShow;

    /* For 1kk phones  */
    const co2Tonnes = Math.round(sommeAll.eco * 1000000 / 1000000);
    const co2Trees = Math.round((co2Tonnes*1000)/35);
    const co2TreesPerM2 = Math.round(co2Trees/21);
    const co2Patate = Math.round(co2Tonnes*4.7);
    const co2CarKm = Math.round(co2Tonnes*1000000/180);
    const co2CarEarth = co2CarKm/40075;


    return (
        <section className="hero is-medium is-primary is-bold is-fullheight">
            <HUD/>
            <div className="body" style={{paddingTop: 50}}>
                <div className="container">
                    <p className="title is-1 is-spaced" style={{marginBottom: 20}}>Les résultats de votre projet :</p>
                    <br />
                    <p className="title is-4 is-spaced" style={{marginBottom: 40}}>{scenario.name} : {scenario.description}</p>
                    <hr />
                    <div className="columns">
                        <div className="column" style={{marginRight: 50, marginLeft: 20}}>
                            <article>
                                    <p className="title is-4">Votre score : </p>
                                    <p className="is-italic has-text-weight-medium " style={{ fontSize: 160 }} >{resShowFin}%</p>

                                    <hr />
                                    <div className="is-vcentered">
                                        <p className="subtitle" style={{marginTop: 40 }}> Performance : {Math.round(sommeAll.perf)} / {scenario.criteres.perf}</p>
                                        <progress className="progress is-danger" value={sommeAll.perf} max={scenario.criteres.perf}></progress>
                                        <p className="subtitle" style={{marginTop: 20 }} > Prix : {Math.round(sommeAll.prix)} / {scenario.criteres.prix}</p>
                                        <progress className="progress is-warning" style={{marginBottom: 20 }} value={Math.round(sommeAll.prix)} max={scenario.criteres.prix}></progress>
                                        <p className="subtitle" style={{marginBottom: 20}}> Cout R&D : {Math.round(rAndDVal)} / {scenario.criteres.rAndD} </p>
                                        <progress className="progress is-success" value={Math.round(rAndDVal)} max={scenario.criteres.rAndD}></progress>
                                    </div>
                            </article>
                        </div>

                        <hr style={{width: 2, height: 600, display: "inline-block"}} />

                        <div className="column" style={{marginLeft: 50, marginRight: 20}}>
                            <article>
                                <p className="title is-4"> Voici la représentation en quelques chiffres pour une production de 1.000.000 téléphones selon votre design : </p>
                                <br />
                                <ol className="has-text-left has-margin-3" style={{listStyleType: "circle"}}>
                                    <li style={{paddingBottom: 25}}>
                                        Émissions de dioxyde de carbone :
                                        <p className="has-text-weight-bold is-inline has-text-danger">{' '}{co2Tonnes}{' '}</p> tonnes</li>
                                    <li style={{paddingBottom: 25}}>
                                        Soit l'absortion par
                                        <p className="has-text-weight-bold is-inline has-text-danger">{' '}{co2Trees}{' '}</p> arbres pendant 1 an
                                    </li>
                                    <li style={{paddingBottom: 25}}>
                                        Cela represente
                                        <p className="has-text-weight-bold is-inline has-text-danger">{' '}{co2TreesPerM2}{' '}</p> mètres carrés de forêt
                                    </li>
                                    <li style={{paddingBottom: 25}}>
                                        Ou la production de
                                        <p className="has-text-weight-bold is-inline has-text-danger">{' '}{co2Patate}{' '}</p> tonnes de pommes de terrre
                                    </li>
                                    <li style={{paddingBottom: 25}}>
                                        Ou bien <p className="has-text-weight-bold is-inline has-text-danger">{' '}{ co2CarKm }{' '}</p>
                                        kilomètres parcourus par une voiture, soit équivalent à
                                        <p className="has-text-weight-bold is-inline has-text-danger">{' '}{co2CarEarth.toFixed(1) }{' '}</p>
                                         tours du Monde.
                                    </li>
                                </ol>
                            </article>
                            <hr />
                            <article>
                                <p className="title is-4">Quick facts :</p>
                                <div className="">
                                    <p>Dans le monde, en 2017, 1.56 milliards de téléphones ont été vendu soit 50 par secondes.</p>
                                    <p>Il faut, en moyenne, 5 ans pour amortir le coût en CO2 d'un téléphone alors que leur durée de vie moyenne est de 2 ans.</p>
                                </div>
                            </article>
                        </div>
                    </div>
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
