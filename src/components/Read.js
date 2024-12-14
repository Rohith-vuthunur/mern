import { useEffect, useState } from "react"
import React from 'react'
import { Link } from "react-router-dom"

export default function Read() {
  const [error, seterror] = useState("")
  const [data, setdata] = useState()
  const handledel=async (id)=>{
    const response = await fetch(`http://localhost:4000/api/${id}`,{
      method:"DELETE",
    })
    const res = await response.json()
    if(!response.ok){
      console.log(res?.error)
      seterror(res?.error)
    }
    if(response.ok){
      seterror("data removed successfully")
      console.log("deleted successfully")
      setTimeout(()=>{
        seterror("")
        getdata()

      },1000)
    }

  }
  const handleedit=()=>{


  }
  const getdata = async () => {
    const response = await fetch('http://localhost:4000/api/')
    const result = await response.json()
    if (!response.ok) {
      console.log(error)
      seterror(result?.error)
    }
    if (response.ok) {
      setdata(result)
      console.log(result)
      // return data
    }
  }
  useEffect(()=>{
    getdata()
  },[])
  return (

    <>
      {error && <div className="alert alert-danger">
        {error}
      </div>}
              <h2 className="text-center"> Show all data</h2>
        <div className="row">
      
          {data?.map((elem)=>(
              <div className="col-3"  key={elem._id}>
              <div className="container my-2">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    {/* <h5 className="card-title">Data</h5> */}
                    <h6 className="card-subtitle mb-2 ">{elem.email}</h6>
                    <p className="card-text">{elem.age}</p>
                    <a href="#" className="card-link" onClick={()=>handledel(elem._id)}>Delete</a>
                    <Link className="card-link" to={`/${elem._id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
      
        </div>

    </>
  )
}
