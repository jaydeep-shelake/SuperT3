import React from "react";
import O from "../../functional/icons/O";
import X from "../../functional/icons/X";

const SquareComponent = (props) => {
    const classes = (props.className ? `${props.className} square-new ` : `square-new `)
    const getIcon=()=>{
        if(props.state==='X'){
            return <X/>
        }
        if(props.state==='O'){
            return <O/>
        }
        
    }
    return (
        <span
            className={classes}
            onClick={() => props.onClick(props.index)}>
           {getIcon()}
        </span>
    )
}
export default SquareComponent
