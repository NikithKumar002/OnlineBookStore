console.log("In Controller, processing the request");
const testUserController = async (req, res) => {
    try {
        console.log("Test API is successfully");
        res.status(200).send({
            success: true,
            message: "Test API succeeded!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Test API Failed!",
            error
        });
    }
};

module.exports = { testUserController };