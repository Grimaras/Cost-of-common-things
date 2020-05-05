import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {chooseComponent, deleteComponent, IAppState} from "../redux/reducer";

const statStyle = {
    marginTop: 20
};

export const ComponentDetails = ({component, banned} : {component: any, banned: boolean}) => {
    const dispatch = useDispatch();

    const maxCriteraValuesPerStep = useSelector((appState: IAppState) => appState.cache.maxCriteraValues);

    // console.log("Selected component : ", component);
    const maxCriteraValues = maxCriteraValuesPerStep[component.idEtape - 1];
    const selectedComponents = useSelector((app: IAppState) => app.game && app.game.components);
    const selected = selectedComponents && selectedComponents.includes(component);

    // console.log(maxCriteraValues);

    const onClickAdd = () => dispatch(chooseComponent(component));
    const onClickDelete = () => dispatch(deleteComponent(component._id));

    // console.log("Component img : ", component.image);

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
            {selected ? <button className="button is-danger" onClick={onClickDelete}>
                    Supprimer
                </button>
                : <button className="button is-success" onClick={onClickAdd} disabled={banned}>
                    Selectionner
                </button>
            }
        </>
    )
}
