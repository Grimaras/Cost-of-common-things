import React, {useState} from "react";
import {IComposant} from "./models";
import {useDispatch} from "react-redux";
import {setFocusedComponent} from "../redux/reducer";
import {imagesTable} from "../icons";
import {ComponentDetails} from "./ComponentDetails";

const IMG_H = 128;
const IMG_W = 128;

interface IComponentProps {
    composant: IComposant,
    banned: boolean
}

export const Component = (props: IComponentProps) => {
    const dispatch = useDispatch();
    const hovered = useState(false);
    const onClick = () => dispatch(setFocusedComponent(props.composant._id));

    // console.log("Rendering component", props.composant);

    const image = imagesTable[props.composant.image];
    return <div className={"notification is-dark"} style={{width: 200, height: 800, padding: 10, cursor: 'pointer', opacity: props.banned ? 0.2 : 1}} onClick={onClick}>
        <p style={{height: 48}}>{props.composant.name}</p>
        <hr />
        <img src={image} height={IMG_H} width={IMG_W} style={{userSelect: 'none'}}/>
        <hr />
        <ComponentDetails component={props.composant} banned={props.banned}/>
    </div>;

};
