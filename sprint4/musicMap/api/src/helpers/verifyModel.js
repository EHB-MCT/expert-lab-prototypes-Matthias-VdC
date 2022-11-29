export default function verifyModel(body, model) {
    try {
        const modelArray = Object.entries(model);
        // console.log('comparing body and model', body, modelArray);
        let matches = true;
        modelArray.forEach(e => {
            if (body.hasOwnProperty(e[0])) {
            } else {
                matches = false;
                return;
            }
        });

        if (matches) {
            console.log('model correct');
            return false;
        } else {
            console.log('model not matching');
            return true;
        }
    }
    catch (err) {
        console.log(err);
        return true;
    }
}
