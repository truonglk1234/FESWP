
import React from "react";
import "./ScheduleSetupPage.css";

const ScheduleCard = ({ schedule }) => {
    return (
        <div className="schedule-card">
            <div className="schedule-card-header">
                <span className="badge">
                    📅 {schedule.type} - {schedule.dayOfWeek}
                </span>
            </div>

            <div className="schedule-card-body">
                <p>⏰ {schedule.startTime} - {schedule.endTime}</p>
                <p>💵 {schedule.price?.toLocaleString()} đ / {schedule.durationMinutes} phút</p>
                {schedule.note && (
                    <p className="note">📝 {schedule.note}</p>
                )}
                <span className={`status ${schedule.isAvailable ? "available" : "not-available"}`}>
                    {schedule.isAvailable ? "Có thể đặt lịch" : "Đã kín"}
                </span>
            </div>
        </div>
    );
};

export default ScheduleCard;
