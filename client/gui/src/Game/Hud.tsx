import React from "react";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import _ from "lodash";

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
    const rAndD = useSelector((appState: IAppState) => appState.game && appState.game!.rAndD);
    const composants = useSelector((appState: IAppState) => appState.game && appState.game!.components);

    const componentPrice = _.reduce(
        _.map(composants, (c) => c.criteres.prix),
        (acc, a) => a + acc, 0);

    return null;
    /*return (
        <div style={hudContainerStyle}>
            <div style={hudStyle} className="notification is-success">
                Cout de Fab. : {componentPrice}.00$ | Budget R&D {rAndD}.00$
            </div>
        </div>
    )*/
};

