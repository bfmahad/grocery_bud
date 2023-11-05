import React, { useEffect } from "react";

const Alert = ({ removeAlert, type, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, [removeAlert]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
