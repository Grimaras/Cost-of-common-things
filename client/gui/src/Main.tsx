import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {IAppState, companionSendPong, companionLoadDone} from "./redux/reducer";
import { Loading } from "./Loader/Loading";
import { Welcome } from "./WelcomeScreen/Welcome";
import { HTTPClient } from "./http/Client";
import {Game} from "./Game/Game";
import {Objective} from "./Game/Objective";

export const Main = () => {

    const dispatch = useDispatch();
    const companionState = useSelector((app: IAppState) => app.companionState);
    const gameData = useSelector((app: IAppState) => app.game);
    const objectiveData = useSelector((app: IAppState) => app.objectiveNb);
    
    useEffect(() => {
        HTTPClient.GET("/alive").then((res) => {
            dispatch(companionSendPong());

            HTTPClient.GET("/components").then((res) => {
                console.log("Response : ", res);
                res.json().then((components) => {
                    dispatch(companionLoadDone(components))
                });
            });

        })
    }, []);

    const loadingMessage = companionState.isAlive && !companionState.isReady
        ? "Getting data from companion service"
        : "Waiting for companion service pong";

    return companionState.isAlive && companionState.isReady
        ? gameData
            ? <Game />
            : objectiveData || objectiveData === 0 ? <Objective/> : <Welcome />
        : <Loading title="Loading application" subTitle={loadingMessage} loading/>
    ;
};
