import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import {Line} from "react-chartjs-2";
import {HTTPClient} from "../http/Client";



export const GameResultGraph = () => {


    /*
    ROUTE:
    /api/scenario/id/xxxx
    */

    const scenID = useSelector( (appState: IAppState) => appState.game!.scenarioId);

    const dataTest = [1,2,3,5];

    const [data, setData] = useState(undefined);
    useEffect(() =>  {
       fetch("http://localhost:82/api/scenario/id/" + scenID).then(console.log)
    });





    return (
     
    );

};