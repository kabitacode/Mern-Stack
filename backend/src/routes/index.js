const routes = require("express").Router()
const BukuModel = require("../model/index.js")

routes.route("/").get((req, res) => {
    BukuModel.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json(error.message))
})

routes.route("/delete/:id").delete((req, res) => {
    BukuModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Buku Berhasil Dihapus"))
    .catch((error) => res.status(400).json(error.message))
})
routes.route("/update/:id").put((req, res) => {
    BukuModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json(error.message))
})

routes.route("/").post(async (req, res) => {
    const data = new BukuModel({
        judul: req.body.judul,
        pengarang: req.body.pengarang,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
        console.log(req.body);
    }
})

module.exports = routes