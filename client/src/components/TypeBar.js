import React from 'react';
import {useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";
import {useAction} from "../hooks/useAction";


const TypeBar = () => {
    const {isTypes, isSelectedType} = useSelector(state => state.deviceReducer)
    const {ASetSelectedType} = useAction()

    const selectTypeDevice = (type) => {
        if (isSelectedType !== type.id){
            ASetSelectedType(type.id)
        } else {
            ASetSelectedType({})
        }
    }

    return (
        <ListGroup>
            {isTypes.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    key={type.id}
                    className="btn btn mt-2"
                    action
                    variant={'secondary'}
                    active={type.id === isSelectedType}
                    onClick={() => selectTypeDevice(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TypeBar;