import React from "react";
import {Etapes} from "./Etapes";
import {ComponentSelector} from "./ComponentSelector";
import {ComponentDetails} from "./ComponentDetails";
import {GameResult} from "./GameResult";
import {HUD} from "./Hud";
import {store} from "../redux/store";
import {HTTPClient} from "../http/Client";
import {gameTick} from "../redux/reducer";
import {IAppState, setStep} from "../redux/reducer";
import _ from "lodash";
import {HUDCharts} from "./HUDCharts";
import {useSelector} from "react-redux";
import {ScenariosObjectifs} from "./Objective";
import {receptResult} from "../redux/reducer";

let timeout: any;
const TICK = 500;
export const startGameTicking = () => {
    timeout = setInterval(() => store.dispatch(gameTick()), TICK);
};

const stopGameTicking = () => clearInterval(timeout);
var showData = false;
/*var myDataRaw = {};*/

export const endGame = () => {
    stopGameTicking();
    const dispatch = store.dispatch;
    const state = store.getState();
    HTTPClient.POST("/gameresult", state.game).then((res) => {
        // TODO: ICI DUDEK FAIT UN TRUC POUR AFFICHER LES RESULTATS :)
        res.json().then((components) => {
         /*   myDataRaw = JSON.parse(JSON.stringify(components));*/
            dispatch(receptResult(JSON.parse(JSON.stringify(components))));
            showData = true;
            console.log(components);
            dispatch(setStep(-1))
        });
    });
};

export const Game = () => {

    const objectiveNb = useSelector((app: IAppState) => app.objectiveNb);
    const scenario = ScenariosObjectifs[objectiveNb!];
    const rawData = useSelector((app:IAppState) => app.gameResult);


    if (rawData)
    {
        return (
            <GameResult />
        );
    }
    else
    {
        return (
            <section className="hero is-info is-fullheight">
                <HUD/>
                <div className="hero-body">
                    <div className="tile is-ancestor">
                        <div className="tile is-vertical is-9">
                            <div className="tile">
                                <Etapes />
                                <ComponentSelector/>
                            </div>
                        </div>
                        <div className="tile is-parent is-3 is-vertical">
                            <div className="tile is-vertical" style={{minHeight: 710}}>
                                <HUDCharts/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};
