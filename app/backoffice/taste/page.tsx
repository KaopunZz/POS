'use client';

import MyModal from "../components/MyModal";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "@/app/config";
import Swal from "sweetalert2";

export default function Page() {
    const [foodTypes, setFoodTypes] = useState([]);
    const [foodTypeId, setFoodTypeId] = useState(0);
    const [name, setName] = useState('');
    const [remark, setRemark] = useState('');
    const [tastes, setTastes] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        fetchData();
        fetchDataFoodTypes();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiServer + '/api/taste/list');
            setTastes(res.data.results);
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: e.message
            })
        }
    }

    const handleSave = async () => {
        try {
            const payload = {
                foodTypeId: foodTypeId,
                name: name,
                remark: remark,
                id: id
            }

            if (id === 0) {
                await axios.post(config.apiServer + '/api/taste/create', payload);
            } else {
                await axios.put(config.apiServer + '/api/taste/update', payload);
                setId(0);
            }

            fetchData();

            document.getElementById('modalTaste_btnClose')?.click();
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: e.message
            })
        }
    }

    const fetchDataFoodTypes = async () => {
        try {
            const res = await axios.get(config.apiServer + '/api/foodType/list');

            if (res.data.results.length > 0) {
                setFoodTypes(res.data.results);
                setFoodTypeId(res.data.results[0].id);
            }
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: e.message
            })
        }
    }

    const handleClearForm = () => {
        setId(0);
        setName('');
        setRemark('');
    }

    const handleRemove = async (item: any) => {
        try {
            const button = await Swal.fire({
                title: 'ลบข้อมูล',
                text: 'คุณต้องการลบข้อมูลนี้',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            })

            if (button.isConfirmed) {
                await axios.delete(config.apiServer + '/api/taste/remove/' + item.id);
                fetchData();
            }
        } catch (e: any) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            });
        }
    }

    const edit = (item: any) => {
        setId(item.id);
        setName(item.name);
        setRemark(item.remark);
        setFoodTypeId(item.foodTypeId);
    }

    return <>
        <div className="card mt-3">
            <div className="card-header">รสชาติอาหาร</div>
            <div className="card-body">
                <button className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTaste"
                    onClick={handleClearForm}
                >
                    <i className="fa fa-plus me-2"></i>
                    เพิ่มรายการ
                </button>

                <table className="mt-3 table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '200px' }}>ประเภทอาหาร</th>
                            <th style={{ width: '100px' }}>ชื่อ</th>
                            <th>หมายเหตุ</th>
                            <th style={{ width: '110px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tastes.map((item: any) =>
                            <tr key={item.id}>
                                <td>{item.FoodType.name}</td>
                                <td>{item.name}</td>
                                <td>{item.remark}</td>
                                <td className="text-center">
                                    <button className="btn btn-primary me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalTaste"
                                        onClick={e => edit(item)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button className="btn btn-danger" onClick={e => handleRemove(item)}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <MyModal id="modalTaste" title="รสชาติอาหาร">
                    <div>ประเภทอาหาร</div>
                    <select className="form-control" value={foodTypeId} onChange={e => setFoodTypeId(parseInt(e.target.value))}>
                        {foodTypes.map((item: any) =>
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        )}
                    </select>

                    <div className="mt-3">ชื่อ</div>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />

                    <div className="mt-3">หมายเหตุ</div>
                    <input type="text" className="form-control" value={remark} onChange={e => setRemark(e.target.value)} />

                    <button className="mt-3 btn btn-primary" onClick={handleSave}>
                        <i className="fa fa-check me-2"></i>
                        บันทึก
                    </button>
                </MyModal>
            </div>
        </div>
    </>
}