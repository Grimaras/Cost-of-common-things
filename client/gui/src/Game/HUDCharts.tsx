import React from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Line} from "react-chartjs-2";
import {useSelector} from "react-redux";
import {IAppState} from "../redux/reducer";
import _ from "lodash";
import {ScenariosObjectifs} from "./Objective";

const options = {
    title: {
        text: 'My chart'
    },
    tooltip: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    series: [{
        data: [1, 2, 3]
    }]
};

interface ILittleChart {
    data: number[],
    title: string;
    color?: string;
    maxValue?: number;
    invertedMetric?: boolean;
}

const LittleChart = ({data, title, color, maxValue, invertedMetric}: ILittleChart) => {
    const val = invertedMetric
        ? (_.last(data) || 0) < (maxValue || Infinity)
        : (_.last(data) || 0) > (maxValue || Infinity);
    const baseData = {
                        label: title,
                        data: _.cloneDeep(data),
                        backgroundColor: val
                            ? "rgba(255,0,0,0.4)"
                            : "rgba(153,255,51,0.4)"
    };
    const finalDataSet = maxValue ? [{
                        label: "MAX",
                        data: data.map(x => maxValue),
                        borderColor: "rgba(255,0,0,0.4)"
                    }, baseData] : [baseData];

    return (
        <div style={{width: 400, height: 200, display: "block"}} className="tile notification">
            <div>
                <span style={{color: 'black'}}>{title}</span>
            </div>
            <Line
                data={{
                    labels: data.map(e => ""),
                    datasets: finalDataSet
                }}
                width={200}
                height={100}
                options={{
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 50,
                                suggestedMax: 100
                            }
                        }]
                    }
                }}
            />
        </div>
    )
};

export const HUDCharts = () => {

    const objectiveNb = useSelector((app: IAppState) => app.objectiveNb);
    const objective = ScenariosObjectifs[objectiveNb!];
    const rAndDCost = useSelector((appState: IAppState) => appState.game!.history.rAndD);
    const perf = useSelector((appState: IAppState) => appState.game!.history.perf);
    const factoryCost = useSelector((appState: IAppState) => appState.game!.history.cost);

    return (
        <div style={{marginTop: 40, marginRight: 10}}>
            <LittleChart title="R&D" data={rAndDCost} maxValue={objective.criteres.rAndD}/>
            <LittleChart title="Cout Fab." data={factoryCost} maxValue={objective.criteres.prix}/>
            <LittleChart title="Performance" invertedMetric  data={perf} maxValue={objective.criteres.perf}/>
        </div>
    )
};
