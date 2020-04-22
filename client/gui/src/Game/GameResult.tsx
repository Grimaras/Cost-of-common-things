import React from "react";
import _ from "lodash";
import {HUD} from "./Hud";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import {ScenariosObjectifs} from "./Objective";

export const GameResult = () => {

    const objectiveNb = useSelector((app: IAppState) => app.objectiveNb);
    const scenario = ScenariosObjectifs[objectiveNb!];
    const rawData = useSelector((app:IAppState) => app.gameResult);

    console.log("------------------------------");
    var myData = JSON.parse(JSON.stringify(rawData));


    const sommeAll = _.reduce(myData.components, (acc, element) => {
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


    var resTarget = scenario.criteres.prix + scenario.criteres.perf;
    var resProcent = Math.round(((sommeAll.perf + sommeAll.prix)*100)/resTarget);
    const resShow = resProcent > 100 ? resProcent - ((resProcent - 100)*2) :  resProcent;

    return (
        <section className="hero is-medium is-primary is-bold is-fullheight">
            <HUD/>
            <div className="hero-body">
                <div className="container">
                    <p className="title is-1 is-spaced">Les résultats de votre projet :</p>
                    <br />
                    <p className="title is-4 is-spaced">{scenario.name} : {scenario.description}</p>
                    <br />
                    <div className="columns">
                        <div className="column">
                            <article >
                                <div className="is-vcentered">
                                    <p className="title is-4">Votre score : </p>
                                    <hr />
                                    <p className="subtitle"> Valeur preformance : {Math.round(sommeAll.perf)} / {scenario.criteres.perf}</p>
                                    <progress className="progress is-danger" value={sommeAll.perf} max={scenario.criteres.perf}>90%</progress>
                                    <p className="subtitle"> Valeur prix : {Math.round(sommeAll.prix)} / {scenario.criteres.prix}</p>
                                    <progress className="progress is-warning" value={Math.round(sommeAll.prix)} max={scenario.criteres.prix}>45%</progress>
                                </div>
                            </article>
                        </div>

                        <div className="column">
                            <article>
                                <p className="title is-4 is-spaced">Réussite de votre projete :</p>
                                <hr />
                                <p style={{ fontSize: 120 }}>{resShow}%</p>
                            </article>
                        </div>

                        <div className="column">
                            <article>
                                <p className="title is-4 is-spaced">La moyenne globale</p>
                                <hr />
                                <div className="is-vcentered">
                                    <p className="is-4 has-text-danger">ICI METTRE UN BEAU GRAPHE</p>
                                </div>
                            </article>
                        </div>
                    </div>
                    <button className="button is-success" >
                        Voir les détails!
                    </button>
                </div>
            </div>

        </section>
    )



};





