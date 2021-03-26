import { receiveMessageOnPort } from "node:worker_threads";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";

export function saveScroll([ scroll, setScroll ] : [ number, (scroll: number) => void]) {
    const ref = useRef<any>();
    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = scroll;
        }
        return () => {
            if (ref.current) {
                setScroll(ref.current.scrollTop);
            }
        }
    }, []);
    return ref;

}