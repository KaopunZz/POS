'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import config from "@/app/config"
import MyModal from "../components/MyModal"

export default function Page() {
    const [foodTypeId, setFoodTypeId] = useState(0);
    const [foodTypes, setFoodTypes] = useState([]);
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [id, setId] = useState(0);
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [myFile, setMyFile] = useState<File | null>(null);

    useEffect(() => {
        fetchDataFoodTypes();
    }, [])

    const fetchDataFoodTypes = async () => {
        try {
            const res = await axios.get(config.apiServer + '/api/foodType/list');

            if (res.data.results.length > 0) {
                setFoodTypes(res.data.results);
                setFoodTypeId(res.data.results[0].id);
            }
        } catch (e: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message,
            });
        }
    };

    const handleSelectedFile = (e: any) => {
        if (e.target.files.length > 0) {
            setMyFile(e.target.files[0]);
        }
    }

    const handleSave = async () => {
        try {
            const img = await handleUpload();
            const payload = {
                foodTypeId: foodTypeId,
                name: name,
                remark: remark,
                price: price,
                img: img,
                id: id
            }

            const res = await axios.post(config.apiServer + '/api/food/create', payload);

            if (res.data.message === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    timer: 1500
                });

                document.getElementById('modalFood_btnClose')?.click();
            }
        } catch (e: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message,
            });
        }
    }

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', myFile as Blob);

            const res = await axios.post(config.apiServer + '/api/food/upload', formData);
            setImg(res.data.img);
        } catch (e: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message,
            });
        }
    }

    return (
        <>
            <div className="mt-3 card">
                <div className="card-header">อาหาร</div>
                <div className="card-body">
                    <button className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalFood"
                    >
                        <i className="fas fa-plus me-2"></i>
                        เพิ่มรายการ
                    </button>
                </div>
            </div>

            <MyModal id="modalFood" title="อาหาร">
                <div>ประเภทอาหาร</div>
                <select className="form-select" onChange={(e) => setFoodTypeId(parseInt(e.target.value))}>
                    {foodTypes.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <div className="mt-3">ภาพ</div>
                <input type="file" className="form-control" value={img} onChange={e => handleSelectedFile(e)} />

                <div className="mt-3">ชื่ออาหาร</div>
                <input className="form-control" onChange={(e) => setName(e.target.value)} value={name} />

                <div className="mt-3">หมายเหตุ</div>
                <input className="form-control" onChange={(e) => setRemark(e.target.value)} value={remark} />

                <div className="mt-3">ราคา</div>
                <input className="form-control" onChange={(e) => setPrice(parseInt(e.target.value))} value={price} />

                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    <i className="fas fa-check me-2"></i>
                    บันทึก
                </button>
            </MyModal>
        </>
    )
}