import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ConsultantProfile.css';

const ConsultantProfile = () => {
    const { id } = useParams();
    const [doc, setDoc] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get(`http://localhost:8080/api/public/consultants/${id}`);
            setDoc(res.data);
        };
        fetchProfile();
    }, [id]);

    if (!doc) return <p>Đang tải...</p>;

    return (
        <div className="cp-container">
            <div className="cp-header">
                <h2>Thông tin tư vấn viên</h2>
                <p>Hồ sơ chi tiết của tư vấn viên</p>
            </div>

            <div className="cp-grid">
                <div className="cp-item">
                    <label>Họ và tên đầy đủ</label>
                    <p>{doc.fullName}</p>
                </div>

                <div className="cp-item">
                    <label>Giới tính</label>
                    <p>{doc.gender ? 'Nam' : 'Nữ'}</p>
                </div>

                <div className="cp-item">
                    <label>Ngày sinh</label>
                    <p>{doc.dateOfBirth}</p>
                </div>

                <div className="cp-item">
                    <label>Số điện thoại</label>
                    <p>{doc.phone}</p>
                </div>

                <div className="cp-item">
                    <label>Email</label>
                    <p>{doc.email}</p>
                </div>

                <div className="cp-item cp-full">
                    <label>Địa chỉ</label>
                    <p>{doc.address}</p>
                </div>

                <div className="cp-item">
                    <label>Chuyên ngành</label>
                    <p>{doc.specialty}</p>
                </div>

                <div className="cp-item">
                    <label>Kinh nghiệm (năm)</label>
                    <p>{doc.experienceYears}</p>
                </div>

                <div className="cp-item">
                    <label>Phí tư vấn</label>
                    <p>{doc.consultationFee?.toLocaleString()} đ</p>
                </div>

                <div className="cp-item">
                    <label>Mô tả</label>
                    <p>{doc.description}</p>
                </div>

                <div className="cp-item">
                    <label>Học vấn</label>
                    <p>{doc.education}</p>
                </div>

                <div className="cp-item">
                    <label>Chứng chỉ</label>
                    <p>{doc.certifications}</p>
                </div>

                <div className="cp-item cp-full cp-avatar">
                    <label>Ảnh đại diện</label>
                    <img
                        src={
                            doc.avatarUrl
                                ? doc.avatarUrl
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.fullName)}`
                        }
                        alt="Avatar"
                    />
                </div>
            </div>


        </div>
    );
};

export default ConsultantProfile;
