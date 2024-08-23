"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "./component/Button";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary";
import { FaCheckCircle } from "react-icons/fa";


interface RespondType {
  status: string;
  // Add other properties of `respond` if they exist
}

export default function Home() {
  const [imageUrlUploaded, setImageUrlUploaded] = useState("");
  const [loading, setLoading] = useState(false);
  const [respond, setRespond] = useState<RespondType | null>(null)
  const [send, setSend] = useState(true)
  const [data, setData] = useState({
    nama: "",
    alamat: "",
    pernah: "",
    hp: "",
    kota: "",
    gambar: "",
  });

  const [required, setRequired] = useState<string[]>([]);
  const [finish, setFinish] = useState(false)
  const [imageUrls, setImageUrls] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState(true);


  const route = useRouter()


  const handleUploadSuccess = (results: any) => {
    const newUrl = results.info.secure_url;
    setImageUrls((prevUrls) => prevUrls ? `${prevUrls}, ${newUrl}` : newUrl);
    setData((prevData) => ({
      ...prevData,
      gambar: prevData.gambar ? `${prevData.gambar}, ${newUrl}` : newUrl,
    }));
  }

  const handleSend = () => {
    setSend(false)
  }

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

  useEffect(() => {
    if (imageUrls) {
      const gambar = imageUrls
      console.log("ini gambar", gambar)
      setData((prevData) => ({
        ...prevData,
        gambar: gambar,
      }))
    }
  }, [imageUrls])

  console.log(imageUrls)
  console.log(data)

  if (send) {
    return (
      <div className="w-full flex justify-around pt-[1.4rem] bg-[#282525] pb-[2rem] h-[100vh]">
        <div className="w-[90%] space-y-[1rem]">
          <div className="w-full">
            <Image src="/romy.png" alt="" height={5000} width={5000} />
          </div>
          <div className="rounded-md p-[1rem] bg-[#201E1F] shadow-md space-y-[1.5rem] py-[2rem]">
            <h1 className="text-white text-center text-[.7rem] font-semibold ">MEDIA SOSIAL</h1>
            <div className="grid grid-cols-3">
              <a href="https://www.youtube.com/@admincsopevesindo3421" rel="noopener noreferrer" target="_blank">
                <div className="text-center space-y-[.5rem] text-[.7rem] text-white font-medium">
                  <div className="w-full justify-around flex">
                    <Image src="/youtube.png" alt="" height={1000} width={1000} className="w-[2rem]" />
                  </div>
                  <p>YOUTUBE</p>
                </div>
              </a>
              <a href="https://www.instagram.com/pevesindo.official?igsh=ZTk1YnRsNmZyZ3h0" rel="noopener noreferrer" target="_blank">
                <div className="text-center space-y-[.5rem] text-[.7rem] text-white font-medium">
                  <div className="w-full justify-around flex">
                    <Image src="/instagram.png" alt="" height={1000} width={1000} className="w-[2rem]" />
                  </div>
                  <p>INSTAGRAM</p>
                </div>
              </a>
              <a href="https://www.tiktok.com/@pevesindo?_t=8p6cmdkHXjV&_r=1" rel="noopener noreferrer" target="_blank">
                <div className="text-center space-y-[.5rem] text-[.7rem] text-white font-medium">
                  <div className="w-full justify-around flex">
                    <Image src="/tiktok.png" alt="" height={1000} width={1000} className="w-[2rem]" />
                  </div>
                  <p>TIKTOK</p>
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="w-full h-[11.3rem] text-white rounded-[1rem] flex items-center justify-center relative mt-[1rem] bg-[#201E1F]">
              <CldUploadWidget
                uploadPreset="pevesindo"
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => {
                  return (
                    <button
                      className={`button ${required.includes("hight") ? "text-red-400" : ""
                        }`}
                      onClick={() => open()}
                    >
                      {
                        imageUrls ? (
                          <div className="w-[2rem]">
                            <FaCheckCircle />
                          </div>

                        ) : (
                          <p className="text-[#F6D232]">Upload</p>
                        )
                      }
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>
          <Button onClick={handleSend} className={`${imageUrls ? "" : "bg-gray-300"}`}>Kirim</Button>
        </div>
      </div >
    );
  } else {
    return (
      <div className="w-full flex justify-around bg-[#282525] h-[100vh] py-[1.3rem] ">
        <div className="w-[90%] space-y-[1rem] bg-[#201E1F] h-full px-[1rem] rounded-md">
          {
            finish ? (
              <div className="py-[1.3rem] text-center space-y-[4rem]">
                <div>
                  <h1 className="text-[#F6D232] font-bold">TERIMAKASIH</h1>
                  <p className="text-white text-[.8rem]">
                    Telah Mengisi Link Dari Pevesindo
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <Image src="/botol.png" alt="" width={1000} height={1000} className="w-[10rem]" />
                </div>
                <p className="text-white text-[.8rem]">
                  Silahkan mengambil merchandise ini di tim kami yang ada di stand
                </p>
              </div>
            ) : (
              <section className="space-y-[1rem]">
                <div className="grid grid-cols-1 gap-3 py-[1rem] text-[#B5B5B5]">
                  <div className="space-y-[0.2rem] ">
                    <p>Nama</p>
                    <input
                      required
                      className="w-full p-[.5rem] rounded-md bg-[#312D2E] shadow-md"
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
                      className="w-full p-[.5rem] rounded-md bg-[#312D2E] shadow-md"
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
                      className="w-full p-[.5rem] rounded-md bg-[#312D2E] shadow-md"
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
                      className="w-full p-[.5rem] rounded-md bg-[#312D2E] shadow-md"
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
                      className="w-full p-[.5rem] rounded-md bg-[#312D2E] shadow-md"
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
    )
  }
}
