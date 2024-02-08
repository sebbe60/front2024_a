import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../utils";

import ContractItem from "../components/contractItem";
import { FaFilter, FaSearch } from "react-icons/fa";
const mock_contract_data = [
  {
    employer_name:"Jima Dube",
    id:1,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"ACCEPTED",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  },
  {
    employer_name:"Jima Dube",
    id:6,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"CANCELLED",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  },
  {
    employer_name:"Jima Dube",
    id:2,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"PENDING",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  },
  {
    employer_name:"Jima Dube",
    id:3,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"ACCEPTED",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  },
  {
    employer_name:"Jima Dube",
    id:4,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"ACCEPTED",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  },
  {
    employer_name:"Jima Dube",
    id:5,
    freelancer_name:"Minase D",
    employer_profile_image_url:"/home/bg.jpg",
    frelancer_profile_image_url:'/home/bg.jpg',
    contract_status:"PENDING",
    contract_title:"Lease",
    contract_details:"Lease for one month ownership. Lease for one month ownership."
  }
]
const MyContracts = () => {
  const { query } = useRouter();
  const router = useRouter();
  //const { id } = query;
  console.log(query.id);
  //const idVal = id.split("=");
  const projectId = query.id;
  const [deliverables, setDeliverables] = useState([]);
  const [milestoneEscrowAccounts, setMilestoneEscrowAccounts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [contracts, setContracts] = useState([]);
  const [filteredContract, setFilteredContracts] = useState([]);
  const [activeTab, setActiveTab] = useState("milestoneEscrowAccounts");
  const [refresh, setRefresh] = useState(false);
  const [editeContract, setEditContract] = useState(false);
  const [contractPopup, setContractPopup] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("ACCEPTED");
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };
  /*   const openPopup = () => {
    setRateUser(true);
  }; */
  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(`${BACKEND_URL}/users_contract`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
      // setContracts(response.data.contracts);
      setContracts(mock_contract_data);
      setFilteredContracts(
        // response.data.contracts.filter(
        //   (contract) => contract.contract_status === currentStatus
        // )
        mock_contract_data.filter(
          (contract) => contract.contract_status === currentStatus
        )
      );
    };
    fetchData();
    //handleTabChange()
  }, [refresh]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      label: "Accepted",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "ACCEPTED"
      ),
    },
    {
      label: "Pending",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "PENDING"
      ),
    },
    {
      label: "Cancelled",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "CANCELLED"
      ),
    },
  ];

  const handleTabChange = (index) => {
    if (index === 0) {
      setCurrentStatus("ACCEPTED");
    }
    if (index === 1) {
      setCurrentStatus("PENDING");
    }
    if (index === 2) {
      setCurrentStatus("CANCELLED");
    }
    setActiveTabIndex(index);
    const filteredContracts = tabs[index].contracts;
    setFilteredContracts(filteredContracts);
  };
  const acceptContract = (contractId) => {
    // make a POST request to your Flask backend to accept the contract
    console.log("accepted contract", contractId);
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "ACCEPTED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Contract Accepted and project created!");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectContract = (contractId) => {
    // make a POST request to your Flask backend to reject the contract
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "CANCELLED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Contract rejected! ");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="mt-20 bg-slate-100">
        <div className="flex bg-white p-4 mb-10">
          <div>
            <p className="text-4xl font-semibold text-gray-600">Contracts</p>
            <p className="text-slate-400">You have 123 contructs</p>
          </div>
        </div>
        <div>
        <div className="p-10">
          {/* Search and filter */}
          <div className="w-1/3 flex justify-between items-center m-2">
          <div class="">
          <div class="relative border border-slate-300 rounded-2xl flex w-full flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1" />

                      <button
                        class="relative z-[2] flex items-center rounded-r  px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="h-5 w-5">
                          <path
                            fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clip-rule="evenodd" />
                        </svg> */}
                        <FaSearch size={20} color="black" />
                      </button>
                    </div>
                  </div>



                  <div className="flex py-2 px-3 justify-center items-center gap-2 bg-black text-white rounded-2xl">
                    <FaFilter />
                    <p>Filters</p>
                  </div>
              </div>
        {/* <div className="flex space-x-4 my-4 justify-center">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`py-2 px-4 rounded-md focus:outline-none ${
                activeTabIndex === i ? "bg-gray-200" : ""
              }`}
              onClick={() => handleTabChange(i)}
            >
              {tab.label}
            </button>
          ))}
        </div> */}

        <div>
          <div className="">
            <div className="flex justify-between  space-x-12 w-full p-2 overflow-x-aut">
            <span>Contact ID</span>
            <div className="w-1/3 flex justify-between">
              <span>
              Contractee
              </span>
              <span>Doc</span>
            </div>
            <span className="w-1/3">Type</span>
            <span className="w-1/3">Message</span>
            <span>Price</span>
            <span className="w-1/4">Status</span>
            </div>
            {filteredContract.map((contract) => (
              <div
                key={contract.id}
                className="mb-3"
              >
                <ContractItem
                  contract={contract}
                  rejectContract={rejectContract}
                  acceptContract={acceptContract}
                  setContractPopup={setContractPopup}
                  closePopup={closePopup}
                  openPopup={openPopup}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default MyContracts;
