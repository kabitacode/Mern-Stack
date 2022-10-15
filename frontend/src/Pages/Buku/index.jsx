import React, { useState, useEffect } from 'react'
import TabelBuku from '../../components/TabelBuku'
import axios from 'axios';

export default function Buku() {
    const [formMode, setFormMode] = useState(false)
    const [data, setData] = useState([])
    const [inputForm, setInputForm] = useState()

    useEffect(() => {
      retrieveData()
    
      return () => {
      }
    }, [])

    const retrieveData = async () => {
        axios.get("http://localhost:4000/book")
        .then((res) => {
            setData(res.data)
        }).catch((e) => {console.log(e.response.data);})
    } 

    const submitForm = async (e) => {
        e.preventDevault()
        axios.post("http://localhost/4000/book/add", inputForm)
        .then((res) => {
            alert("Data Berhasil Ditambahkan!")
        }).catch((e) => {
            console.log(e.response);
        })
    }
    

    const showForm = () => {
        setFormMode(!formMode)
    }

    const showEditForm = () => {
        setFormMode(!formMode)
    }

    return (
        <div className='container'>
            <button onClick={showForm} className="btn btn-sm mt-3 btn-primary my-2">
                Tambah Buku
            </button>
            <div id="forms" className='card py-2 my-3 bg-secondary'>
                        <div className="card-body">
                            <form className='justify-content-center d-flex flex-column align-items-center'>
                                <h4>Form Buku</h4>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Judul</label>
                                    <input type="text" className="form-control mx-2" name='judul' onChange={(e) => {
                                        setInputForm({...inputForm, judul: e.target.value})
                                    }}/>
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' onChange={(e) => {
                                        setInputForm({...inputForm, pengarang: e.target.value})
                                    }}/>
                                </div>
                                <button type="submit" className="btn btn-primary col-6">Submit</button>
                            </form> 
                        </div>
                    </div>
            {/* {
                formMode && (
                    <div id="form" className='card py-2 my-3 bg-secondary'>
                        <div className="card-body">
                            <form onSubmit={submitForm} className='justify-content-center d-flex flex-column align-items-center'>
                                <h4>Form Buku</h4>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Judul</label>
                                    <input type="text" className="form-control mx-2" name='judul' onChange={(e) => {
                                        setInputForm({...inputForm, judul: e.target.value})
                                    }}/>
                                </div>
                                <div className="col-6 mb-5">
                                    <label className="form-label">Pengarang</label>
                                    <input type="text" className="form-control mx-2" name='pengarang' onChange={(e) => {
                                        setInputForm({...inputForm, pengarang: e.target.value})
                                    }}/>
                                </div>
                                <button type="submit" className="btn btn-primary col-6">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            } */}
            <TabelBuku showEdit={showEditForm} books={data}/>
        </div>
    )
}