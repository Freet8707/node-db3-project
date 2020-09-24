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

const findSteps = async (schemeID) => {

    const steps = await db('steps as s')
        .innerJoin('schemes as sc', 'sc.id', 's.scheme_id')
        .select('sc.scheme_name as scheme name', 's.step_number as step number', 's.instructions')
        .where('s.scheme_id', schemeID)
        .orderBy('s.step_number');

    return steps
}

module.exports = {
    find,
    findById,
    findSteps
}