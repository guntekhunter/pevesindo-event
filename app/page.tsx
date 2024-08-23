"use client"
import axios from "axios";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [data, setData] = useState({
    nama:"",
    alamat: "",
    pernah: "",
    hp: "",
    kota: ""
  })

  const sendData = async() => {
    const res = await axios.post("/api/send", data)
    console.log(res)
  }
  return (
    <div>
      <div>
        <label htmlFor="">Nama</label>
        <input type="text" onChange={(e) => setData(prevData => ({ 
           ...prevData, 
           nama: e.target.value 
        }))}/>
      </div>
      <div>
        <label htmlFor="">Alamat</label>
        <input type="text" onChange={(e) => setData(prevData => ({ 
           ...prevData, 
           alamat: e.target.value 
        }))}/>
      </div>
      <div>
        <label htmlFor="">Pernah</label>
        <input type="text" onChange={(e) => setData(prevData => ({ 
           ...prevData, 
           pernah: e.target.value 
        }))}/>
      </div>
      <div>
        <label htmlFor="">Hp</label>
        <input type="text" onChange={(e) => setData(prevData => ({ 
           ...prevData, 
           hp: e.target.value 
        }))}/>
      </div>
      <div>
        <label htmlFor="">Kota</label>
        <input type="text" onChange={(e) => setData(prevData => ({ 
           ...prevData, 
           kota: e.target.value 
        }))}/>
      </div>
      <button onClick={sendData}>
        Kirim
      </button>
    </div>
  );
}
