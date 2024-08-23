"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface RespondType {
  status: string;
  // Add other properties of `respond` if they exist
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [respond, setRespond] = useState<RespondType | null>(null)
  const [data, setData] = useState({
    nama: "",
    alamat: "",
    pernah: "",
    hp: "",
    kota: "",
  });

  const [required, setRequired] = useState<string[]>([]);
  const [finish, setFinish] = useState(false)

  const sendData = async () => {
    setLoading(true);
    // Initialize an array to keep track of which fields are empty
    const newRequired: string[] = [];

    // Check each field and add the field name to newRequired if it is empty
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        newRequired.push(key);
      }
    }

    // Update the required state with the names of the empty fields
    setRequired(newRequired);

    // If there are any empty fields, stop further execution
    if (newRequired.length > 0) {
      setLoading(false);

      return;
    } else {
      try {
        const res = await axios.post("/api/send", data);
        console.log(res.data.status);
        if (res.data.status) {
          setFinish(true)
        }
        setRespond(res.data.status)
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  console.log(localStorage.getItem("image"))

  return (
    <div className="w-full flex justify-around pt-[2rem]">
      <div className="w-[80%] space-y-[1rem]">
        <section>
          kasdk
        </section>
        {
          finish ? (
            <div>
              Selamat Anda Mendapatkannyami botol!!
            </div>
          ) : (
            <section className="space-y-[1rem]">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-[0.2rem]">
                  <p>Nama</p>
                  <input
                    required
                    className="w-full p-[.5rem] rounded-md border border-gray-200 "
                    type="text"
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        nama: e.target.value,
                      }))
                    }
                  />
                  {
                    required.includes("nama") && (
                      <p className="text-[.5rem] text-red-600">Silahkan Isi Nama</p>
                    )
                  }

                </div>
                <div className="block space-y-[0.2rem]">
                  <p>Alamat</p>
                  <input
                    required
                    className="w-full p-[.5rem] rounded-md border border-gray-200 "
                    type="text"
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        alamat: e.target.value,
                      }))
                    }
                  />
                  {
                    required.includes("alamat") && (
                      <p className="text-[.5rem] text-red-600">Silahkan Isi Alamat</p>
                    )
                  }
                </div>
                <div className="block space-y-[0.2rem]">
                  <p>Hp</p>
                  <input
                    required
                    className="w-full p-[.5rem] rounded-md border border-gray-200 "
                    type="text"
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        hp: e.target.value,
                      }))
                    }
                  />
                  {
                    required.includes("hp") && (
                      <p className="text-[.5rem] text-red-600">Silahkan Isi No Hp</p>
                    )
                  }
                </div>
                <div className="block space-y-[0.2rem]">
                  <p>Kota</p>
                  <input
                    required
                    className="w-full p-[.5rem] rounded-md border border-gray-200 "
                    type="text"
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        kota: e.target.value,
                      }))
                    }
                  />
                  {
                    required.includes("kota") && (
                      <p className="text-[.5rem] text-red-600">Silahkan Isi Kota</p>
                    )
                  }
                </div>
                <div className="block space-y-[0.2rem]">
                  <p>Pernah Mendengar Tentang Pevesindo?</p>
                  <select
                    className="w-full p-[.5rem] rounded-md border border-gray-200"
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        pernah: e.target.value,
                      }))
                    }
                  >
                    <option value="">---</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                  {
                    required.includes("kota") && (
                      <p className="text-[.5rem] text-red-600">Silahkan Isi Kota</p>
                    )
                  }
                </div>
              </div>
              <button onClick={sendData} className="bg-[#F6D232] w-full py-[1rem] rounded-md flex justify-center">
                {!loading ? (
                  <p>Kirim</p>
                ) : (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </button>
            </section>

          )
        }
      </div>
    </div>
  );
}
