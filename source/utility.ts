export function uniqueID() {
    return (Date.now() + parseInt((Math.random() + '').slice(2))).toString(36);
}
