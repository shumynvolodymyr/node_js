module.exports = {
    carNormalizator: (carToNormalize) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => delete carToNormalize[field]);

        return carToNormalize;
    }
};
