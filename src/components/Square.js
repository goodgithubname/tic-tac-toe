import React from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Square;
