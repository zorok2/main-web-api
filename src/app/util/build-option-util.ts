export let buildQueryOption = (options) => {
    let query = `?`;
    let params = [];
    Object.keys(options).forEach(key => {
        params.push(`${key}=${options[key]}`)
    })
    query += params.join("&")
    return query;
}