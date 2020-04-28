import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import {Line} from "react-chartjs-2";
import _ from "lodash";

export const GameResultGraph = () => {

    const scenID = useSelector( (appState: IAppState) => appState.game!.scenarioId);

    const [data, setData] = useState(undefined);
    useEffect(() =>  {
        setTimeout(() =>
            fetch("http://localhost:81/api/stats/" + scenID).then(res => res.json().then(setData)),
        500);
    }, []);

    if (!data)
        return <>Loading</>;

    const allScores = _.map(data, (c: any) => c.score);

    return (
        <Line data={{ datasets: [{label: "Scores", data: allScores}], labels: allScores.map(() => "")}} />
    );

};