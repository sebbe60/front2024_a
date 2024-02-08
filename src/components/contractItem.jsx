import { FaArrowDown, FaEdit, FaFile, FaTelegram } from "react-icons/fa";
import ContractForm from "../pages/createcontract";
import EditContractForm from "../pages/editcotract";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import Image from "next/image";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const ContractItem = (props) => {
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [contractPopup, setContractPopup] = useState(false);
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };

  return (
    <>
     {/* <div>
       <div className="grid grid-cols-7">
           <span>Grid1</span>
           <span>Grid2</span>
           <span>Grid3</span>
           <span>Grid4</span>
           <span>Grid5</span>
           <span>Grid6</span>
           <span>Grid7</span>
       </div>
     </div> */}

     <div className="flex justify-between  border bg-white rounded-xl space-x-12 w-full p-2 overflow-x-auto">
        {/* Checkbox and id number */}
        <div className="flex justify-between items-center self-start gap-3">
          <input type="checkbox" />
          <div className="flex justify-between items-center">
            <FaFile />
            <p>id</p>
          </div>
        </div>
        {/* employer photo and name and Doc */}
        <div className="w-1/3">
        <div className="flex justify-between items-center gap-14 w-full">
          <div className="flex justify-between  items-center gap-3">
          <div className='rounded-full border-2 border-white w-[30px] h-[30px]'>
              <Image src='/home/loginImage.jpg' width={50} height={100} className='w-full h-full object-fill rounded-full'/>
          </div>
          <p>Jima Dube</p>
          </div>
          <p className="self-start">5</p>
        </div>

       {contractPopup && <div className="flex-col mt-4 items-center">
           <div className="flex justify-between text-center mt-2">
            <div className="flex justify-between">
            <span className="p-3 bg-green-300 rounded-full"></span>
            <p>Lease Contract</p>
            </div>
            <FaEdit />
            </div>
           <hr className="text-md"/>
           <div className="flex justify-between text-center mt-2">
            <div className="flex justify-between">
            <span className="p-3 bg-green-300 rounded-full"></span>
            <p>Lease Contract</p>
            </div>
            <FaEdit />
            </div>
           <hr/>
           <div className="flex justify-between text-center mt-2">
            <div className="flex justify-between">
            <span className="p-3 bg-green-300 rounded-full"></span>
            <p>Lease Contract</p>
            </div>
            <FaEdit />
            </div>
           <hr/>
           <div className="flex justify-between text-center mt-2">
            <div className="flex justify-between">
            <span className="p-3 bg-green-300 rounded-full"></span>
            <p>Lease Contract</p>
            </div>
            <FaEdit />
            </div>
        </div>}
        </div>
        {/* Type */}
        <div className="w-1/3">
          <p>Lease</p>
          {contractPopup && <div className="mt-4 w-2/3">
            <p>Lease is the type of the contract. Lease is the type of the contract</p>
          </div>}
        </div>
        {/* Messages */}
        <div className="w-1/3">
          <p>12</p>
          {contractPopup &&
            <div className="p-3 bg-gray-200 rounded mt-4 w-3/4">
              <p>Mark</p>
              <p>The clouse that you added looks find.Can we move forwared?</p>
            </div>
          }
        </div>
        {/* Price */}
        <div>
          <p>4565</p>
        </div>
        {/* Status */}
        <div className="w-1/4">
        <div className="flex items-center self-start">
          <span className="bg-green-300 rounded-3xl py-1 px-2">Accepted</span>
          <div className="flex items-center text-3xl transition-transform cursor-pointer">
            {contractPopup ? <RiArrowDropUpLine onClick={() => closePopup()} /> : <RiArrowDropDownLine onClick={() => openPopup()}/>}
          </div>
        </div>
       { contractPopup &&<div className="mt-3">
           <div className=" flex p-1 justify-around items-center w-full bg-black rounded-3xl text-white my-2">
            <FaFile />
            <p>Add Document</p>
           </div>
           <div className=" flex p-1 justify-around items-center w-full bg-black rounded-3xl text-white my-2">
            <FaTelegram />
            <p>Send message</p>
           </div>
           <div className=" flex p-1 justify-around items-center w-full bg-black rounded-3xl text-white my-2">
            <FaFile  />
            <p>Add Document</p>
           </div>
        </div>}
        </div>
        {/* dropdown and pickup */}
        
     </div>
      {/* <div className="flex flex-col text-center items-center my-2 p-1 border-2">
        <p
          className={` rounded w-26 p-1 my-1 ${
            props.contract.contract_status == "ACCEPTED" ? "bg-green-200" : ""
          }${
            props.contract.contract_status == "CANCELLED" ? "bg-red-200" : ""
          }${
            props.contract.contract_status == "PENDING" ? "bg-yellow-200" : ""
          }`}
        >
          <span>Contract status:</span>{" "}
          <psan className="ml-2 text-lower">
            {props.contract.contract_status}
          </psan>
        </p>
        <div className="flex justify-center">
          {" "}
          {isEmployer && (
            <img
              src={props.contract.freelancer_profile_image_url}
              className="w-20 h-20 rounded-full"
            />
          )}
          {isFreelancer && (
            <img
              src={props.contract.employer_profile_image_url}
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        {isEmployer && (
          <p className="p-1 my-1 font-bold">
            {" "}
            {props.contract.freelancer_name}
          </p>
        )}
        {isFreelancer && (
          <p className="p-1 my-1 font-bold"> {props.contract.employer_name}</p>
        )}

        {props.contract.contract_status == "PENDING" && isEmployer && (
          <div className="flex justify-center ">
            <button
              className="p-2 bg-green-600 text-white mr-2 rounded px-1  w-24  sm:mr-2 mb-1"
              onClick={() => {
                props.rejectContract(props.contract.id);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-primary hover:bg-primary text-white font-bold px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => {
                openPopup();
              }}
            >
              Edit
            </button>
          </div>
        )}
        {props.contract.contract_status == "PENDING" && isFreelancer && (
          <div className="flex justify-center my-2">
            <button
              className="p-2 bg-green-600 text-white mr-2  px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => props.acceptContract(props.contract.id)}
            >
              Accept
            </button>
            <button
              className="p-2 bg-red-600 text-white  px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => props.rejectContract(props.contract.id)}
            >
              Reject
            </button>
          </div>
        )}
        <div className="bg-gray-100 p-4 rounded mt-4">
          {" "}
          <p className="p-1 my-1 font-bold">
            Contract title {props.contract.contract_title}
          </p>
          <p className="p-1 my-1">
            Contact details {props.contract.contract_details}
          </p>
        </div>
      </div> */}

      <>
        {/* {contractPopup && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <EditContractForm
                  closePopup={closePopup}
                  contractTitle="Edit Cotract"
                  contractId={props.contract.id}
                  contractButtonText="Update"
                ></EditContractForm>
              </div>
            </div>
          </div>
        )} */}
      </>
    </>
  );
};

export default ContractItem;
