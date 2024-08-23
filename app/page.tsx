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
  const [data, setData] = useState({
    nama: "",
    alamat: "",
    pernah: "",
    hp: "",
    kota: "",
  });

  const [required, setRequired] = useState<string[]>([]);
  const [finish, setFinish] = useState(false)
  const [imageUrls, setImageUrls] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState(true);


  const route = useRouter()

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


  const handleUploadSuccess = (results: any) => {
    const newUrl = results.info.secure_url;
    setImageUrls((prevUrls) => prevUrls ? `${prevUrls}, ${newUrl}` : newUrl);
  };

  useEffect(() => {
    localStorage.setItem("image", imageUrls)
  }, [imageUrls])

  const handleSend = () => {
    if (imageUrls) {
      route.push("/form")
    } else {
      setIsUploaded(false);
    }
  }
  return (
    <div className="w-full flex justify-around pt-[2rem]">
      <div className="w-[80%] space-y-[1rem]">
        <h1 className="font-bold">Selamat Datang!!</h1>
        <p>Follow akun media sosial kami terlebih dahulu</p>
        <div className="grid grid-cols-1 gap-[1rem]">
          <a href="https://www.youtube.com/watch?v=v_sFc5KCom4" rel="noopener noreferrer" target="_blank">
            <Button onClick={(e: any) => route.push("")}>Instagram</Button>
          </a>
          <a href="https://www.youtube.com/watch?v=v_sFc5KCom4" rel="noopener noreferrer" target="_blank">
            <Button onClick={(e: any) => route.push("")}>Youtube</Button>
          </a>
          <a href="https://www.youtube.com/watch?v=v_sFc5KCom4" rel="noopener noreferrer" target="_blank">
            <Button onClick={(e: any) => route.push("")}>Tiktok</Button>
          </a>
        </div>
        <div>
          <p>Upload Bukti Screenshoot</p>
          <div className="w-full h-[11.3rem] rounded-[1rem] border-dashed border-[2px] flex items-center justify-center relative mt-[1rem]">
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
                        <FaCheckCircle />
                      ) : (
                        <p>Upload</p>
                      )
                    }
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <Button onClick={handleSend} className={`${imageUrls ? "" : "bg-gray-300"}`}>Ommaleka</Button>
      </div>
    </div >
  );
}
