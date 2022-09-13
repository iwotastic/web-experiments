export function toRVarname(name) {
    return name.indexOf(" ") === -1 ? name : ("`" + name + "`");
}

export function allFilled(...vars) {
    return [...vars].every(v => v.trim() !== "")
}
