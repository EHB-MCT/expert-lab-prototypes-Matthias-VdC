/**
 * @param {object} req - Request data from form, to find existing one on database
 * @param collection - Collection from database where request needs to know if it's a unique value
 * @param fields - Fields to be checked
 */
export default async function exists(body, collection, fields) {
    return new Promise(async (resolve, reject) => {
        let existing = [];
        for (let e of fields) {
            if (body[e]) {
                if (await collection.findOne({ [e]: body[e] })) {
                    // pushes all values that exist already
                    existing.push(e);
                }
            }
        }
        if (existing.length === 0) { existing = false; }
        return resolve(await existing);
    });
}
