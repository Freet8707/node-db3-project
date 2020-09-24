const db = require('../config');

const find = async () => {

    const posts = await db('schemes as s')
        .select("s.scheme_name", "s.id as scheme_id");

    return posts
}

const findById = async (schemeID) => {

    const scheme = await db('schemes as s')
        .select('s.scheme_name', 's.id as scheme_id')
        .where('s.id', schemeID);

    return scheme[0];
}

module.exports = {
    find,
    findById
}