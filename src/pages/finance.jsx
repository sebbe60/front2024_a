import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthState } from "../store/slices/authSlice";
import { BACKEND_URL } from "../utils";
import { Dialog, Transition } from '@headlessui/react';
import Payment from "../pages/p/Payment";


const FinanceDashboard = () => {
  const router = useRouter();
  //const { isAuthenticated, user } = useContext(AuthContext);
  const authStatus = useSelector(selectAuthState);

  if (!authStatus) {
    router.push("/login");
  }

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false)

  const closeModal=()=> {
    setIsOpen(false)
  }

  const openModal=()=> {
    setIsOpen(true)
  }


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // replace with your authorization header
          },
        });
        setBalance(response.data.balance);
        console.log(response.data.balance);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchBalance();
  }, []);

  return (
    <>
      <div class="bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10 mt-20">
        <div className="flex justify-center">
          <div>
            <h2 class="text-lg font-bold mb-4">Account Balance</h2>
            {loading && (
              <div class="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <p class="text-gray-600 mb-4">
              Current Balance: <span className="font-bold">${balance}</span>
            </p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row justify-center">
          <button
            onClick={openModal}
            class="  bg-green-500 hover:bg-green-600  text-white py-2 px-4 rounded-lg mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          >
            Deposit fund to your account
          </button>

          <Link
            href="/withdrawal"
            class=" bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
          >
            Withdraw fund
          </Link>
        </div>
      </div>

      
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="sm:w-[600px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  
                  <Payment modalClose={closeModal} />

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


    </>
  );
};
export default FinanceDashboard;
