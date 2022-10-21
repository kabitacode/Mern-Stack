import React, { useState, useEffect } from 'react'
import { useForm } from '../../utils/useForm';
import Tabel from '../../components/Tabel'
import axios from 'axios';


const Home = () => {
    const [formMode, setFormMode] = useState<string>("");
    const [data, setData] = useState([]);
    const [juduls, setJuduls] = useState<string>("");
    const [pengarangs, setPengarang] = useState<string>("");
    const [ids, setIds] = useState<string>("");


    useEffect(() => {
        _get()

        return () => {

        }
    }, [data])


    const _get = async () => {
        axios.get("http://localhost:4000/book")
            .then((res) => {
                setData(res.data)
            }).catch((e) => { console.log(e.response.data); })
    }

    async function submitForm(e: any) {
        e.preventDefault()
        console.log(juduls, pengarangs);


        if (formMode === "create") {

            const formData = new URLSearchParams()
            formData.append("judul", juduls)
            formData.append("pengarang", pengarangs)

            await axios({
                method: 'POST',
                data: formData,
                url: 'http://localhost:4000/book',
            })
                .then((res) => {
                    alert("Data Berhasil Ditambahkan!")
                    setJuduls("")
                    setPengarang("")
                    setFormMode("")
                    _get()

                }).catch((e) => {
                    console.log(e.response);
                })
        }

        if (formMode === "edit") {

            const formData = new URLSearchParams()
            formData.append("judul", juduls)
            formData.append("pengarang", pengarangs)

            await axios({
                method: 'PUT',
                data: formData,
                url: 'http://localhost:4000/book/update/' + ids,
            })
                .then((res) => {
                    alert("Data Berhasil Di Update!")
                    setJuduls("")
                    setPengarang("")
                    setIds("")
                    setFormMode("")
                    _get()
                }).catch((e) => {
                    console.log(e.response);
                })
        }
    }

    const requestToDelete = async (i: any) => {
        await axios.delete("http://localhost:4000/book/delete/" + i._id)
        .then((res) => {
            alert("Data Berhasil Di Hapus!")
            _get()
        }).catch((e) => {
            console.log(e.response);
        })
    }

    const showForm = () => {
        setFormMode("create")
    }

    const showEditForm = (i: any) => {
        setFormMode("edit")
        setJuduls(i.judul)
        setPengarang(i.pengarang)
        setIds(i._id)
    }

    const onChangeJudul = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJuduls(e.target.value)
    }

    const onChangePengarang = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPengarang(e.target.value)
    }

    return (
        <div className='container'>
            <button onClick={showForm} className="btn btn-sm mt-3 btn-primary my-2">
                Tambah Buku
            </button>

            {
                formMode === "create" && (
                    <div id="form" className='card py-2 my-3 bg-secondary'>
                        <div className="card-body">
                            <form onSubmit={submitForm} className='justify-content-center d-flex flex-column align-items-center'>
                                <h4>Form Buku</h4>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Judul</label>
                                    <input type="text" className="form-control mx-2" name='judul' value={juduls} onChange={onChangeJudul} required />
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' value={pengarangs} onChange={onChangePengarang} required />
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
                                    <input type="text" className="form-control mx-2" name='judul' value={juduls} onChange={onChangeJudul} />
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' value={pengarangs} onChange={onChangePengarang} />
                                </div>
                                <button type="submit" className="btn btn-primary col-6">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }

            <Tabel showEdit={showEditForm} books={data} requestToDelete={requestToDelete} />
        </div>
    )
}

export default Home