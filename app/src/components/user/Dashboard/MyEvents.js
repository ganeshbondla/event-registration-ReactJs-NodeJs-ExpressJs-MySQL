import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const MyEvents = () => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState();
  const [listOfMyEvents, setListOfMyEvents] = useState([]);
  const token = localStorage.getItem("token");

  const [showPayStatusToUser, setShowPayStatusToUser] = useState("");

  //paymentStates
  const [payAmount, setPayAmount] = useState(10);
  const [payDesc, setpayDesc] = useState("");
  const [payOrderId, setPayOrderId] = useState("");
  const [payUserName, setPayUserName] = useState("");
  const [payUserMobile, setPayUserMobile] = useState("");
  const [payUserEmail, setPayUserEmail] = useState("");
  const [payOrderCreated, setPayOrderCreated] = useState(false);
  const [userBookingOrderId, setUserBookingOrderId] = useState("");

  const [razorpayPaymentId, setRazorpayPaymentId] = useState("");
  const [razorpaySignture, setRazorpaySignture] = useState("");
  const [razorPaymentStatus, setRazorPaymentStatus] = useState(false);

  const makeStatesEmpty = () => {
    setpayDesc("");
    setPayAmount("");
    setPayOrderId("");
    setPayUserName("");
    setPayUserMobile("");
    setPayUserEmail("");
    setPayOrderCreated(false);
    setRazorpayPaymentId("");
    setRazorpaySignture("");
    setRazorPaymentStatus(false);
  };

  const proceedPayNow = (amt, uname, uemail, umobile, eid, bid, ename) => {
    setPayUserName(uname);
    setPayUserMobile(umobile);
    setPayUserEmail(uemail);
    setUserBookingOrderId(bid);
    setpayDesc("#" + eid + "-" + ename);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        nani_header_key: token,
      },
      body: JSON.stringify({
        amount: amt,
        event_id: eid,
      }),
    };
    fetch("http://localhost:3095/payment/order/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setPayOrderId(res.order_status.order_id);
          setPayAmount(res.order_status.order_amount);
          setPayOrderCreated(true);
        } else {
          setPayOrderCreated(false);
          console.log("Failed to get order id");
        }
      });
  };

  const onPaymentFailed = (code, desc, orderId, paymentId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: desc,
        order_id: orderId,
        payment_id: paymentId,
        code: code,
      }),
    };
    fetch("http://localhost:3095/payment/failed/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setShowPayStatusToUser(
            res.failed.code + " : " + res.failed.description
          );
          makeStatesEmpty();
        } else {
          alert(res.message);
          console.log("Failed to verify");
        }
      });
  };

  const processPayment = (e) => {
    setPayOrderCreated(false);
    var options = {
      key: "rzp_test_R4kknQnYEf3jkT",
      amount: payAmount,
      currency: "INR",
      name: "Nani Events",
      description: payDesc,
      image: "https://ganeshbondla.in/assets/img/1632853244076.jpg",
      order_id: payOrderId,
      handler: function (response) {
        setRazorpayPaymentId(response.razorpay_payment_id);
        setPayOrderId(response.razorpay_order_id);
        setRazorpaySignture(response.razorpay_signature);
        setRazorPaymentStatus(true);
      },
      prefill: {
        name: payUserName,
        email: payUserEmail,
        contact: payUserMobile,
      },
      notes: {
        order_id: 123456,
        product_name: "Biryani",
      },
      theme: {
        color: "#ffffff",
      },
    };
    var rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      onPaymentFailed(
        response.error.code,
        response.error.description,
        response.error.metadata.order_id,
        response.error.metadata.payment_id
      );
    });
    rzp.open();
  };

  if (payOrderCreated) {
    processPayment();
  }

  if (razorPaymentStatus) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": razorpaySignture,
      },
      body: JSON.stringify({
        order_id: payOrderId,
        payment_id: razorpayPaymentId,
        user_order_id: userBookingOrderId,
      }),
    };
    fetch("http://localhost:3095/payment/verify/", options)
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setPayOrderCreated(false);
          makeStatesEmpty();
          window.location.reload(false);
        } else {
          alert(res.message);
          console.log("Failed to get order id");
        }
      });
  }

  useEffect(() => {
    if (token !== null || undefined) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          nani_header_key: token,
        },
      };
      fetch("http://localhost:3095/user/auth/", options)
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) {
            setUserAuth(res.success);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (userAuth) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          nani_header_key: token,
        },
      };
      fetch("http://localhost:3095/user/events/", options)
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) {
            setListOfMyEvents(res.bookingResults);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
  }, [navigate, token, userAuth]);

  const listOfBookingView = listOfMyEvents.map((event, i) => {
    return (
      <div className="col-md-6 p-2 mb-2" key={i}>
        <div className="border border-primary rounded p-3 shadow-sm">
          <h3>{event.eventDetails[0].event_name}</h3>
          <p>{event.eventDetails[0].event_description}</p>
          <hr />
          <div className="row">
            <div className="col text-left">
              <b>{event.eventDetails[0].event_date}</b>
            </div>
            <div className="col text-right">
              {event.status === 0 ? (
                <button
                  className="btn btn-info"
                  onClick={() =>
                    proceedPayNow(
                      event.eventDetails[0].event_amount,
                      event.userDetails[0].user_name,
                      event.userDetails[0].user_email,
                      event.userDetails[0].user_mobile,
                      event.eventDetails[0].event_id,
                      event.booking_id,
                      event.eventDetails[0].event_name
                    )
                  }
                >
                  Pending Payment, PayNow
                </button>
              ) : (
                <button className="btn btn-success">Booking Confirmed</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div className="container mt-3 pt-3">
        <h1>My Events</h1>
        {showPayStatusToUser !== "" || null ? showPayStatusToUser : ""}
        <div className="row p-2">{listOfBookingView}</div>
      </div>
    </>
  );
};

export default MyEvents;
