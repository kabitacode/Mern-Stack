import React from 'react'

export default function TabelBuku({ showEdit, books }) {

    const editData = () => {
        showEdit()
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
                                        <button onClick={() => editData(index)} className="btn btn-warning mx-2">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
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