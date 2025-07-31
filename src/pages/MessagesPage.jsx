import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Messages from "../components/messages/Messages";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const MessagesPage = () => {
  const { user } = useAuth();

  if (!["Customer", "Consultant"].includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Messages />
      <Footer />
    </>
  );
};

export default MessagesPage;
