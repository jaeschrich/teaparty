import React, { useRef } from 'react';
import { acceptMap } from 'shared/StorageTypes';
import { Submission } from '../state';
import '../styles/hidden-file-input.css';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

function getFile(accept: string, ev: any) {
    let f = document.createElement('input')
    f.setAttribute('type',  'file');
    f.setAttribute('accept', accept);
    f.click();
    let p = new Promise<File>((accept, reject) => {
        function handle() {
            if (f.files) { 
                accept(f.files![0])
            }
            else { reject(null) } 
            // ev.target.removeEventListener('focus', handle)
        }
        f.addEventListener('change', handle, {once:true});
    });

    return p;
}

export const FileInput = observer(({ value } : { value: Submission }) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleFile = action((ev: any) => {
        ev.preventDefault();
        if (ref.current && ref.current.files && ref.current.files.length > 0) {
            value.file = {
                value: ref.current.files[0],
                filename: ref.current.files[0].name,
            }
            value.category = ref.current.dataset.value!;
        }
    });

    const handleClick = action((ev: any) => {
        ev.preventDefault();
        if (ref.current) {
            ref.current.accept = acceptMap[ev.target.dataset.value];
            ref.current.value = "";
            value.category = ev.target.dataset.value!;
            ref.current.click();
        }
    });

    let content = (!value.file) ?
         (<>
            <input type="file" onChange={handleFile} className="hidden-file-input" ref={ref} /> 
            <button onClick={handleClick} data-value="prose">Prose</button>
            <button onClick={handleClick} data-value="poetry">Poetry</button>
            <button onClick={handleClick} data-value="visual-art">Visual Art</button>
            <button onClick={handleClick} data-value="photography">Photography</button>
        </>) : (<>
            <span>{value.file.filename}</span>
            <button onClick={action((ev) => {
                value.destroyRemote();
            })}>Change</button>
        </>);
    return (<div role="group" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {content}
    </div>);
});
