import { useEffect, useState } from "react";
import { generateName } from "../../../shared/generateNames";

export type Placeholder = {
    name: string;
    email: string;
    text: string;
    nextName: string;
}

export function nextPlaceholder(place? : Placeholder) : Placeholder {
    const name = (place) ? place.nextName : generateName(); 
    const end = name.lastIndexOf(" ");
    let email = name.slice(0, end).split(' ').join('') + '.' + name.slice(end+1);
    email = email.toLowerCase() + "@ufl.edu";

    let nextName = generateName();
    while (name === nextName) nextName = generateName();

    const text = `They call me ${name}, but my real name is ${nextName}.\nDon't tell anyone🤫.`;

    return { name, email, text, nextName }
}

export function useFakeName(): [Placeholder, () => void] {
    const [ fake, setFake ] = useState(nextPlaceholder());

    useEffect(() => {
        let timeout = setTimeout(() => {
            setFake(nextPlaceholder(fake)); // will trigger re-render and new effect
        }, 10500);
        return () => clearTimeout(timeout);
    }, [ fake, setFake ]);
    return [ fake, () => { setFake(nextPlaceholder(fake)) } ];
}
