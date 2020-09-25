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

    return scheme;
}

const findSteps = async (schemeID) => {

    const steps = await db('steps as s')
        .innerJoin('schemes as sc', 'sc.id', 's.scheme_id')
        .select('sc.scheme_name as scheme name', 's.step_number as step number', 's.instructions')
        .where('s.scheme_id', schemeID)
        .orderBy('s.step_number');

    return steps
}

const addStep = async (step, schemeID) => {
    const newStep = {...step, scheme_id: schemeID};

    const stepAdd = await db('steps as s')
        .insert(newStep);

    return stepAdd;
}

const update = async (scheme, ID) => {
    const updateScheme = await db('schemes as s')
        .update(scheme)
        .where('s.id', ID);

    return updateScheme

}

const remove = async (schemeID) => {

    const removeScheme = await db('schemes as s')
        .delete()
        .where('s.id', schemeID)

    return removeScheme
}

module.exports = {
    find,
    findById,
    findSteps,
    addStep,
    update,
    remove
}