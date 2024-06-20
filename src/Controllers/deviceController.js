exports.deviceFlow = async (req, res) => {
    try {
        console.log("your device page is successfully listed");
        return res.status(200).send({ message: "your device page is successfully listed"});
    } catch (err) {
        console.log("Something went wrong");
        return res.status(500).send({ message: "Something went wrong" });
    }

}