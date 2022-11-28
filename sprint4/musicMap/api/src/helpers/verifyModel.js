export default function verifyModel(body, model) {
    try {
        const modelArray = Object.entries(model);
        // console.log('comparing body and model', body, modelArray);
        let matches = true;
        modelArray.forEach(e => {
            if (body.hasOwnProperty(e[0])) {
                console.log(e[0]);
            } else {
                matches = false;
                return;
            }
        });
        console.log(matches);

        if (matches) {
            console.log('model correct');
            return true;
        } else {
            console.log('model not matching');
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
}
