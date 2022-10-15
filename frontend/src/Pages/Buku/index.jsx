import React, { useState, useEffect } from 'react'
import TabelBuku from '../../components/TabelBuku'
import axios from 'axios';

export default function Buku() {
    const [formMode, setFormMode] = useState(false)
    const [data, setData] = useState([])
    const [judul, setJudul] = useState("")
    const [pengarang, setPengarang] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        retrieveData()

        return () => {
        }
    }, [])

    const retrieveData = async () => {
        axios.get("http://localhost:4000/book")
            .then((res) => {
                setData(res.data)
            }).catch((e) => { console.log(e.response.data); })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (formMode === "create") {

            const formData = new URLSearchParams()
            formData.append("judul", judul)
            formData.append("pengarang", pengarang)

            await axios({
                method: 'POST',
                data: formData,
                url: 'http://localhost:4000/book',
            })
                .then((res) => {
                    alert("Data Berhasil Ditambahkan!")
                    setJudul("")
                    setPengarang("")
                    retrieveData()
                }).catch((e) => {
                    console.log(e.response);
                })
        }

        if (formMode === "edit") {

            const formData = new URLSearchParams()
            formData.append("judul", judul)
            formData.append("pengarang", pengarang)

            await axios({
                method: 'PUT',
                data: formData,
                url: 'http://localhost:4000/book/update/' + id,
            })
                .then((res) => {
                    alert("Data Berhasil Di Update!")
                    setJudul("")
                    setPengarang("")
                    setId(null)
                    retrieveData()
                }).catch((e) => {
                    console.log(e.response);
                })
        }
    }

    const deleteData = async (i) => {
        await axios.delete("http://localhost:4000/book/delete/" + i._id)
            .then((res) => {
                alert("Data Berhasil Di Hapus!")
                retrieveData()
            }).catch((e) => {
                console.log(e.response);
            })
    }

    const showForm = () => {
        setFormMode("create")
    }

    const showEditForm = (i) => {
        setFormMode("edit")
        setJudul(i.judul)
        setPengarang(i.pengarang)
        setId(i._id)
    }

    return (
        <div className='container'>
            <button onClick={showForm} className="btn btn-sm mt-3 btn-primary my-2">
                Tambah Buku
            </button>
            {
                formMode == "create" && (
                    <div id="form" className='card py-2 my-3 bg-secondary'>
                        <div className="card-body">
                            <form onSubmit={submitForm} className='justify-content-center d-flex flex-column align-items-center'>
                                <h4>Form Buku</h4>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Judul</label>
                                    <input type="text" className="form-control mx-2" name='judul' value={judul} onChange={(e) => setJudul(e.target.value)} />
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' value={pengarang} onChange={(e) => setPengarang(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary col-6">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }

{
                formMode == "edit" && (
                    <div id="form" className='card py-2 my-3 bg-secondary'>
                        <div className="card-body">
                            <form onSubmit={submitForm} className='justify-content-center d-flex flex-column align-items-center'>
                                <h4>Form Buku</h4>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Judul</label>
                                    <input type="text" className="form-control mx-2" name='judul' value={judul} onChange={(e) => setJudul(e.target.value)} />
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' value={pengarang} onChange={(e) => setPengarang(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary col-6">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
            <TabelBuku showEdit={showEditForm} books={data} requestToDelete={deleteData}/>
        </div>
    )
}