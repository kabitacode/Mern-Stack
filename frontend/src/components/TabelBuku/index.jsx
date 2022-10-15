import React from 'react'

export default function TabelBuku({ showEdit, books, requestToDelete }) {

    const editData = (i) => {
        showEdit(i)
    }

    const deleteData = (i) => {
        requestToDelete(i)
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Judul</th>
                        <th scope="col">Pengarang</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.judul}</td>
                                    <td>{item.pengarang}</td>
                                    <td>
                                        <button onClick={() => editData(item)} className="btn btn-warning mx-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteData(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}