import React from 'react';
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import {useAction} from "../hooks/useAction";

const BrandBar = () => {
    const {isBrands, isSelectedBrand} = useSelector(state => state.deviceReducer)
    const {ASetSelectedBrand} = useAction()

    const selectTypeBrand = (brand) => {
        if (isSelectedBrand !== brand.id){
            ASetSelectedBrand(brand.id)
        } else {
            ASetSelectedBrand({})
        }
    }

    return (
        <div className="d-flex flex-wrap ">
            {isBrands.map(brand =>
                <Card
                    style={{
                        cursor: "pointer",
                        backgroundColor: '#e2e3e5',
                        height: 40,
                        justifyContent: 'center',
                }}
                    key={brand.id}
                    className="p-3 me-1 mt-2"
                    onClick={() => selectTypeBrand(brand)}
                    border={brand.id === isSelectedBrand ? 'primary' : "light"}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
};

export default BrandBar;