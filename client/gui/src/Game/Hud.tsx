import React from "react";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import _ from "lodash";
import {ScenariosObjectifs} from "./Objective";

const hudContainerStyle = {
    position: "fixed" as "fixed",
    width: "100%",
    top: 0
};

const HUD_WIDTH = 400;
const hudStyle = {
    width: HUD_WIDTH,
    marginLeft: `calc(50% - ${HUD_WIDTH / 2}px)`
};

export const HUD = () => {
    const scenarioId = useSelector((appState: IAppState) => appState.objectiveNb);
    console.log("Scenario Id : ", scenarioId);
    const scenario = (scenarioId || scenarioId === 0) && ScenariosObjectifs[scenarioId];

    return (
        <div style={hudContainerStyle}>
            <div style={hudStyle} className="notification is-success">
                { scenario ? scenario.name : ". . ." }
            </div>
        </div>
    )
};

