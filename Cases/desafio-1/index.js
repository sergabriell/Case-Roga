/**
 * 
 * @param {string | string[]} path 
 * @param {object} data 
 * @returns unknowm
 */

const get = (path, data) => {

    const firstPath = path.split('.')[0];
    const nextPath = path.split('.').slice(1).join('.');

    const arrayRegex = /([a-zA-Z_]{1,})\[([0-9]{1,})\]/;
    const matchesArray = firstPath.match(arrayRegex);


    if (data[firstPath]) {
        return get(nextPath, data[firstPath]);
    }

    if (matchesArray) {
        if (data[matchesArray[1]]) {
            return get(
                nextPath,
                data[matchesArray[1]][Number(matchesArray[2])]
            );
        }
    }

    if (!path) {
        return console.log(data);
    }

    return console.log(undefined);
}

get('a.b.d[1].e', { a: { b: { c: 1, d: [1, { e: 2 }] } } });