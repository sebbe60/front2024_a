import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { BACKEND_URL } from "../../utils";

function Payment({modalClose}) {
  const [amount, setAmount] = useState("30");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [readyToPay, setReadyToPay] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const appearance3 = {
    theme: "stripe",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "2px",
      colorPrimary: "#f360a6",
      colorIconTabSelected: "#fff",
      spacingGridRow: "16px",
    },
    rules: {
      ".Tab, .Input, .Block, .CheckboxInput, .CodeInput": {
        boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
      },
      ".Block": {
        borderColor: "transparent",
      },
      ".BlockDivider": {
        backgroundColor: "#ebebeb",
      },
      ".Tab, .Tab:hover, .Tab:focus": {
        border: "0",
      },
      ".Tab--selected, .Tab--selected:hover": {
        backgroundColor: "#2446A4",
        color: "#fff",
      },
    },
  };
  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51IzMfQFKLJLnm31NSXBmGQGqnTxoo6Kxx53qmBdguFmweGBDemJnrSzpOpdHBcsOi7RcSYUBblmLktNTKY8olKan00CQu7CLrK"
      )
    );
  }, []);
  const updateAmount = (e) => {
    setAmount(e.target.value);
  };
  const MoveToPayView = () => {
    setReadyToPay(true);
  };

  const handleDeposit = () => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/depo`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (result) => {
      var { client_secret } = await result.json();
      setClientSecret(client_secret);
      setLoading(false);
      setReadyToPay(true);
    });
  };

  return (
    <>
      {!readyToPay && (
        <div className="bg-white p-10 w-full background-shadow-md rounded-xl">
          <div className="border-b pb-4 font-bold text-md my-2">
            <h2 className="capitalize">make a payment to increase the balance in your account.</h2>
          </div>

          <div className="my-2">
          <label className="block text-gray-700">Enter Amount</label>
            <input
              type="text"
              name="amount"
              value={amount}
              placeholder="$"
              onChange={updateAmount}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex justify-between my-3">
            <p className="text-gray-700">Payment due</p>
            <span>${amount}.00</span>
          </div>
          <div className="flex justify-end">
            <button 
            type="button"
            className="bg-gray-300 px-6 py-2 rounded mr-4"
            onClick={modalClose}
            >
              Close
            </button>
            <button
              type="button"
              className="bg-[#3A6EE4] text-white font-bold px-2 py-2 rounded"
              onClick={handleDeposit}
            >
          
            {loading ? (
              <>
                <div className="flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="">Loading...</span>
                </div>
              </>
            ) : (
              `Confirm and pay $${amount} USD`
            )}
          </button>
          </div>
        </div>
      )}
      {clientSecret && stripePromise && readyToPay && (
      <div className="bg-white rounded-xl py-4">
          <div className="p-8">
            <button className="flex items-center gap-2" onClick={()=> setReadyToPay(false)}>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
              </span> <span>Back</span>
            </button>

            <p className="mt-2">Complete Your Payment Details for a Seamless Transaction</p>
            <h2 className="mt-4 ml-6 text-gray-500">Pay Out</h2>
            <h1 className="mt-2 ml-6 text-5xl">${amount}</h1>
          </div>
          
        <div className="p-8 border-t-2 border-gray-200">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance3 }}
            >
              <CheckoutForm amount={amount} />
            </Elements>
          
        </div>
      </div>
      )}
    </>
  );
}

export default Payment;
