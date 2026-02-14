const mongoose = require("mongoose");

const sharedSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed }
});

const SharedData = mongoose.model("sharedDataUnitTests", sharedSchema);

// Write/update a value
async function setSharedKeyValue(key, value) {
    await SharedData.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
    );
}

// Read a single variable
async function getSharedKeyValue(key) {
    const doc = await SharedData.findOne({ key });
    return doc ? doc.value : null;
}

// Read all test variables
async function getAllSharedKeyValues() {
    const docs = await SharedData.find({});
    const output = {};
    docs.forEach(d => output[d.key] = d.value);
    return output;
}

// Reset shared collection
async function resetSharedValues() {
    await SharedData.deleteMany({});
}

module.exports = {
    setSharedKeyValue,
    getSharedKeyValue,
    getAllSharedKeyValues,
    resetSharedValues
};
