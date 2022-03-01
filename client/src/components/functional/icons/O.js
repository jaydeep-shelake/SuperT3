import React from 'react';

const beforeStyle ={
    background: '#e93e3e',
    width: '90%',
    height: '90%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(45deg)'
}
const afterStyle ={
    background:'#121212',
    width: '70%',
    height: '70%',
    position: 'absolute',
    borderRadius: '50%',
    // transform: 'rotate(45deg)'
}


const O = () => {
    return (
        <>
            <div className="before" style={beforeStyle}></div>
            <div className = "after" style={afterStyle}></div>
        </>
    );
}

export default O;
