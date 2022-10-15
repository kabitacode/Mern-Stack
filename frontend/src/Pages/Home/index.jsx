import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return(
        <div className="container mt-3 w-75 ">
            <h1 className="text-center">
                Selamat Datang!
            </h1>
            <Link to={"/manajemen-buku"} className="btn btn-sm btn-primary my-2">
                Tambah Buku
            </Link>

            {/* Input form */}
            <div id="form">
                
            </div>
        </div>
    )
}

export default Home