/**
 * @param {object} req - Request data from form, to find existing one on database
 * @param collection - Collection from database where request needs to know if it's a unique value
 */
async function exists(body, collection) {
    console.log(collection)
    if (body && collection) {
        if (body.length === 0) return false;
        const exist = await collection.find(body).toArray();
        console.log(exist);
        // length exceeds 0 if message exists
        if (exist.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    return false
}

module.exports = exists;