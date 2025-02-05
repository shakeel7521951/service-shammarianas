import { useEffect, useState } from "react";

const Purchases = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) return;

      try {
        const response = await fetch(
          `http://localhost:2000/api/cart/check-payment?session_id=${sessionId}`
        );

        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Error checking payment:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Checking payment status...</p>
      ) : (
        <p>Payment Status: {status}</p>
      )}
    </div>
  );
};

export default Purchases;
