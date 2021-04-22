
export * from './generateNames';


type CheckMap = {
    [key: string]: boolean|CheckMap|string;
}

export function extractFrom(ob: any, check: boolean|CheckMap|string) {
    return extract(check)(ob);
}

export function extract(check: boolean|CheckMap|string) {
    return (ob: any) => {
        if (check === true || typeof check === 'string') {
            return ob;
        } else if (check === false) {
            return undefined;
        }
        let keys = Object.keys(ob);
        let res: any = {};
        for (let key of keys) {
            if (key in check) {
                let resKey = (typeof check[key] === 'string')?check[key] as string:key;
                res[resKey] = extractFrom(ob[key], check[key]);
            }
        }
        return res;
    }
}