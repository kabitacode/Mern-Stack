import BukuModel from '../model/index.js';

export const getBuku = async (req, res) => {
    BukuModel.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json(error.message))
}

export const deleteBuku = async (req, res) => {
    BukuModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Buku Berhasil Dihapus"))
    .catch((error) => res.status(400).json(error.message))
}

export const updateBuku = async (req, res) => {
    BukuModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json(error.message))
}

export const addBuku = async (req, res) => {
    BukuModel.create(req.body)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json(error.message))
}