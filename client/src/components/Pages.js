import React from 'react';
import {Pagination} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useAction} from "../hooks/useAction";
import '../index.css'

const Pages = () => {
    const {isTotalCount, isLimit, isPage} = useSelector(state => state.deviceReducer)
    const {ASetPage} = useAction()
    const pageCount = Math.ceil(isTotalCount / isLimit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-4">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={isPage === page}
                    onClick={() => ASetPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;