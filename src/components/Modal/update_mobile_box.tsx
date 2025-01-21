"use client";

import Link from 'next/link';
import React, { useState } from 'react'

import Alert_Error from "@/components/Alerts/Alert_Error";

import { updateUserMobile } from '../Api/admin';

type Props = {
  admin_id : number;
  setMobileUpdateModal: React.Dispatch<React.SetStateAction<number | null>>;
  setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>; 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Admin {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  vehicle_count: number;
  signup_date: string;
  mobile: string;
  wallet_ballance: number;
  documents: string;
  status: string;
  services: string;
  availability: string;
}

// setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>
const UpdateMobileBox = ({admin_id, setMobileUpdateModal, setAdminData, setLoading} : Props) => {

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false)

  const handleMobileNumber = () => {
    console.log("Current mobile number:", mobileNumber);

    checkValidNumber();

  };

  const checkValidNumber = () => {

    var check_non_digit = new RegExp('[^0-9]');
    var check_number_length = new RegExp('^.{10}$');
    var check_first_number = new RegExp('^[9]');

    // var check_first_number_0 = new RegExp('^[0]');

    // if (check_first_number_0.test(mobileNumber)){
    //   setMobileNumber(mobileNumber.replace(check_first_number_0, ''))
    //   var check_number_length = new RegExp('^.{11}$');
    // }

    if (!check_non_digit.test(mobileNumber) && check_number_length.test(mobileNumber) && check_first_number.test(mobileNumber)){
      console.log("number valid");
      console.log(admin_id + mobileNumber)
      setShowAlert(false);
      updateUserMobile(admin_id, mobileNumber);

      setLoading(true);
      setAdminData((prevData) =>
        prevData.map((admin) =>
          admin.id === admin_id ? { ...admin, mobile: mobileNumber } : admin
        )
      );


      setMobileUpdateModal(null)

    }
    else{
      setShowAlert(true);
    }

  }
  
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="absolute right-0 top-0 h-8 w-8">
            
            <button onClick={() => setMobileUpdateModal(null)} >
                    <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
                    </button>
            </div>

            <div className="text-center">
              <br/>
              <span className="text-xl font-bold text-gray-900">Update Mobile Number</span>

              {/* <div className="mt-2 px-7 py-3">
                <form>
                  <input type="text" name="mobile_number" 
                    value={mobileNumber} 
                    onChange={(e) => 
                    setMobileNumber(e.target.value)} 
                    className="bg-gray-100 py-2 px-6 text-center  border-2 border-blue-400">

                  </input>
                </form>
              </div> */}

              <div className="w-full max-w-sm min-w-[200px] mt-4">
                <div className="relative mt-2">
                  <div className="absolute top-2 left-0 flex items-center pl-3">
                    <div
                      className="h-full text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none"
                    >
                      <span>+63</span>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </div>
                    <div className="h-6 border-l border-slate-200 ml-2"></div>
                  </div>
                  <input
                    type="tel"
                    className="h-10 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="912-345-6789"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength= {10}
                    value={mobileNumber} 
                    onChange={(e) => 
                    setMobileNumber(e.target.value)} 
                  />
                </div>
              </div>
              <div>
              {showAlert && <span className="text-red-500 text-sm mt-1">Number is invalid.</span>}
              </div>

              <div className="flex justify-center mt-4">
    
                {/* Navigates back to the base URL - closing the modal */}
                <button
              onClick={() => handleMobileNumber()}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Update
                </button>
    
              </div>
            </div>
          </div>
        </div>
      );
}

export default UpdateMobileBox