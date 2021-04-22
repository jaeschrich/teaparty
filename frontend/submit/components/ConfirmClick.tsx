import React, { cloneElement, MouseEventHandler, ReactElement, useState } from 'react';

export function ConfirmClick({ initial, accept, reject, onClick }: { onClick: MouseEventHandler; initial: ReactElement; accept: ReactElement; reject: ReactElement; }) {
    const [conf, setConf] = useState(false);
    if (!conf) {
        return cloneElement(initial, {
            onClick: (ev: MouseEvent) => {
                ev.preventDefault();
                ev.stopPropagation();
                setConf(true);
            }
        });
    } else {
        return <>
            {cloneElement(accept, {
                onClick: (ev: any) => {
                    setConf(false);
                    onClick(ev);
                }
            })}
            {cloneElement(reject, {
                onClick: (ev: MouseEvent) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    setConf(false);
                }
            })}
        </>;
    }
}
