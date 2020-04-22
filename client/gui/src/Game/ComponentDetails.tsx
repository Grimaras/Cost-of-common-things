import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {chooseComponent, IAppState} from "../redux/reducer";

const statStyle = {
    marginTop: 20
};

export const ComponentDetails = ({component} : {component: any}) => {
    const dispatch = useDispatch();

    const maxCriteraValuesPerStep = useSelector((appState: IAppState) => appState.cache.maxCriteraValues);

    console.log("Selected component : ", component);
    const maxCriteraValues = maxCriteraValuesPerStep[component.idEtape - 1];
    console.log(maxCriteraValues);

    const onClick = () => dispatch(chooseComponent(component));

    console.log("Component img : ", component.image);

    return (
        <>
           <div style={statStyle}>
                Prix <br />
                <progress className="progress is-success" value={component.criteres.prix} max={maxCriteraValues.prix}/>
            </div>
            <div style={statStyle}>
                Performance <br />
                 <progress className="progress is-primary" value={component.criteres.perf} max={maxCriteraValues.perf}/>
            </div>
            <p style={{marginTop: 40, minHeight: 200}}>
                {component.description}
            </p>
            <hr />
            <button className="button is-success" onClick={onClick}>
                Selectionner
            </button>
        </>
    )
}
