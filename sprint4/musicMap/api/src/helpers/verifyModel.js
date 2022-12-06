export default function verifyModel(body, model) {
    try {
        const modelArray = Object.entries(model);
        let matches = true;
        modelArray.forEach(e => {
            if (body.hasOwnProperty(e[0])) {
            } else {
                matches = false;
                return;
            }
        });

        if (matches) {
            // model correct
            return false;
        } else {
            // model not matching
            return true;
        }
    }
    catch (err) {
        console.log(err);
        return true;
    }
}
