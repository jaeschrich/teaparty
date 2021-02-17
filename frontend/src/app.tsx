import React from 'react';

export function App(props : {name: string} ) { 
    return <p role="heading">Hello {props.name}!</p>
}