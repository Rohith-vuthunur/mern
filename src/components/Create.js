import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const [name,setname] = useState("")
    const [age,setage] = useState(0 )
    const [email,setemail] = useState("")
    const [error,seterror] = useState("")
    console.log(name,email,age)
    const navigate = useNavigate()
    const handledata = async(e)=>{
        e.preventDefault()
        const userdata = {name,email,age} 
        const response = await fetch("http://localhost:4000/api",{
            method:"POST",
            body : JSON.stringify(userdata),
            headers:{
                "Content-Type":"application/json",
            },

        })
        const result = await response.json()
        if(!response.ok){
            seterror(result.error)
            console.log(result.error)
        }
        if(response.ok){
            console.log(result)
            navigate('/all')
        }

    }
    return (
        <>
            {error && <div className="alert alert-danger" role="alert">
          {error}
        </div>}

            <div className="container-fluid mx-3">
                <h3 className="text-center">Enter the Data</h3>
                <form onSubmit={handledata}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Name</label>
                        <input type="text" className="form-control" id="user"  onChange={(e)=>{setname(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setemail(e.target.value)}} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" onChange={(e)=>{setage(e.target.value)}} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
