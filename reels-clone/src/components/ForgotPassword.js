import React, { useState } from "react";
import { auth } from "../firebase";

const ForgotPassword = () => {
  const [resetPassEmail, setResetPassEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetBtnClick = async () => {
    await auth.sendPasswordResetEmail(resetPassEmail);
    setLoading(true);
  };

  return (
    <div>
      <input
        type="text"
        value={resetPassEmail}
        onChange={(e) => setResetPassEmail(e.target.value)}
      />
      <button onClick={handleResetBtnClick} disabled={loading}>
        {!loading ? "Send Reset Link" : "Please check you email for reset link"}
      </button>
    </div>
  );
};

export default ForgotPassword;
