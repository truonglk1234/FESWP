import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleSetupPage.css";

const ScheduleCard = ({ schedule }) => (
    <div className="schedule-card">
        <div className="schedule-card-header">
            <span className="badge">
                📅 {schedule.type} - {schedule.dayOfWeek}
            </span>
        </div>
        <div className="schedule-card-body">
            <p>⏰ {schedule.startTime?.substring(11, 16)} - {schedule.endTime?.substring(11, 16)}</p>
            <p>💵 {schedule.price?.toLocaleString()} đ / {schedule.durationMinutes} phút</p>
            {schedule.note && <p className="note">📝 {schedule.note}</p>}
            <span className={`status ${schedule.isAvailable ? "available" : "not-available"}`}>
                {schedule.isAvailable ? "Có thể đặt lịch" : "Đã kín"}
            </span>
        </div>
    </div>
);

const ScheduleSetupPage = () => {
    const consultantId = 1;

    const [schedules, setSchedules] = useState([]);

    const getSchedulesByConsultant = async (consultantId) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/auth/schedules/consultant/${consultantId}`
            );
            if (res.status === 204) return [];
            return res.data;
        } catch (err) {
            console.error("Lỗi khi lấy lịch:", err);
            return [];
        }
    };

    const loadSchedules = async () => {
        const data = await getSchedulesByConsultant(consultantId);
        setSchedules(data);
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    return (
        <div className="schedule-wrapper">
            <div className="header">
                <h2>📅 Lịch hẹn làm việc</h2>
                {/* ❌ Đã bỏ nút Thêm lịch mới */}
            </div>

            <div className="schedule-grid">
                {schedules.length > 0 ? (
                    schedules.map((s) => <ScheduleCard key={s.id} schedule={s} />)
                ) : (
                    <p>⚠️ Chưa có lịch nào.</p>
                )}
            </div>
        </div>
    );
};

export default ScheduleSetupPage;
