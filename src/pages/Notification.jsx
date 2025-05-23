import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotificationsApi, markNotificationReadApi } from '../services/allApis';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationReadApi(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <>
          <div className="container-fluid pt-2" style={{ height: '600px' }}>
      <div className="m-4">
        <Link to="/dash" className="btn btn-outline-secondary rounded-circle">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 p-3">
        <h4>Notifications</h4>
      </div>

      <div className="bg-white shadow border rounded p-4">
        {notifications.length === 0 ? (
          <p className="text-muted">No notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="d-flex justify-content-between border-bottom pb-3 mb-3"
            >
              <div>
                <p className="mb-1">{notification.message}</p>
                <small className="text-muted">
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
              </div>
              {!notification.isRead && (
                <button
                  className="btn"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  <i className="fa-solid fa-circle fa-2xs text-primary"></i>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>

    </>
  )
}

export default Notification