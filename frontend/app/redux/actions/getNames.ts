
export async function getNames(count = 1) {
    let names = await (await fetch("/names?count=" + count)).text();
    return { type: "FETCH_NAMES", payload: JSON.parse(names) };
}



