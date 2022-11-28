/**
 * @param {object} jsonData - Request data from form, to find existing one on database
 * @returns True or False depending on if the object matches the given template
 */
export default function checkSongcollectionField(jsonData) {
    const contains = [
        "artist",
        "song",
        "preciseLocation",
        "location",
    ];

    return contains.every(prop => jsonData.hasOwnProperty(prop));
}
