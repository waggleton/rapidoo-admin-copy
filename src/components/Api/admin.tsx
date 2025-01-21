"use client";

import { useState } from "react";
import Link from "next/link";
const ADMIN_BASE_URL = 'http://127.0.0.1:8000/v1/admin/';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { signIn, getSession, signOut } from 'next-auth/react';
import { NextResponse } from "next/server";


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

interface Trips {
  index : number;
  itrip_id : number;
  order_id : number;
  booked_by : string;
  booking_no : number;
  pickup_address : string;
  dropoff_address : string;
  cs_lat : number;
  cs_long : number;
  rider_lat : number;
  rider_long : number;
  distance : number;
  tripjob_date : string;
  time_request : string;
  time_end : string;
  store : string;
  provider : number;
  customer : string;
  fare : number;
  type : string;
  transaction_type : string;
  pickup_status : string;
  dropoff_status : string;
  status: string;
}


interface AdminDashboardProps {
  initialAdminData: Admin[]; 
}

interface Transaction {
  id: number;
  account_id: number;
  rider_account_id: number;
  reference_id: string;
  coupon: string;
  distance: number;
  sender_details: string;
  receiver_details: string;
  pickup_address: string;
  dropoff_address: string;
  multiple_dropoff: boolean;
  rebate: number;
  processing_fee: number;
  discount: number;
  transaction_amount: number;
  total_amount: number;
  tip: number;
  notes: string;
  vehicle_type: string;
  payment_method: string;
  sender_payment: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  rider_earned: number;
  rapidoo_earned: number;
  original_pickup_address: string;
  original_dropoff_address: string;
}

export const fetchTransactionsnData = async (setTransactionsData: React.Dispatch<React.SetStateAction<Transaction[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "transactions");
    const data = await response.json();
    setTransactionsData(data); 
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
  } finally {
    setLoading(false);
  }
};


export const fetchAdminData = async (setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "admin_dashboard");
    const data = await response.json();
    setAdminData(data); 
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
  } finally {
    setLoading(false);
  }
};

export const fetchTripsData = async (setTripsData: React.Dispatch<React.SetStateAction<Trips[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "trips");
    const data = await response.json();
    setTripsData(data); 
  } catch (error) {
    console.error("Failed to fetch admin data:", error);
  } finally {
    setLoading(false);
  }
};



export async function getServerSideProps() {
    const response = await fetch(ADMIN_BASE_URL + "admin_dashboard");
    const initialAdminData = await response.json();
  
    return {
      props: {
        initialAdminData,
      },
    };
  }


export const updateAdminStatus = async (adminId: number, newStatus: string, setAdminData: React.Dispatch<React.SetStateAction<Admin[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await fetch(ADMIN_BASE_URL + "update_admin/"+ adminId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin status");
    }

    const updatedAdmin = await response.json();
    console.log("Admin updated successfully:", updatedAdmin);

  
    setAdminData((prevData) =>
      prevData.map((admin) =>
        admin.id === adminId ? { ...admin, status: newStatus } : admin
      )
    );
  } catch (error) {
    console.error("Error updating admin:", error);
  } finally {
    setLoading(false);
  }
};

export const updateUserMobile = async (adminId: number, mobileNumber: string) => {
  try {
    const response = await fetch(ADMIN_BASE_URL + "update_mobile/"+ adminId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobileNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin status");
    }

    const updatedAdmin = await response.json();
    console.log("Admin updated successfully:", updatedAdmin);

  


  } catch (error) {
    console.error("Error updating admin:", error);
  } finally {

  }
};

export const AttemptLogIn = async (email: string, password: string, setAlertVisibility: React.Dispatch<React.SetStateAction<boolean>>, setEmail: React.Dispatch<React.SetStateAction<string>>, setPassword: React.Dispatch<React.SetStateAction<string>>, setEmailRequired: React.Dispatch<React.SetStateAction<boolean>>, setPasswordRequired: React.Dispatch<React.SetStateAction<boolean>>) => {
  
  console.log(email);
  console.log(password);

  const response = await fetch(ADMIN_BASE_URL + "login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: email,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    let valid = true;

    if (!email) {
      setEmailRequired(true);
      valid = false;
    } else {
      setEmailRequired(false);
    }

    if (!password) {
      setPasswordRequired(true);
      valid = false;
    } else {
      setPasswordRequired(false);
    }

    if (data.message === "login success") {
      Cookies.set("token", data.token);
      Cookies.set("user_name", data.name);
      Cookies.set("user_email", email)
      setAlertVisibility(false);
      window.location.href = "/#";
    }
    else if (data.message === "username and password combination not found" && !email && password){
      setAlertVisibility(true);
    }
    else if (data.message === "username and password combination not found" && !password && email){
      setAlertVisibility(true);
    }
    else if (data.message === "username and password combination not found" && !email && !password){
      setAlertVisibility(false);
    }
    else if (data.message === "username and password combination not found" && email && password){
      setAlertVisibility(true);
    }
    else{
      console.log("D:")
    }

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }


}


export const GoogleSignIn = async (userEmail : string) => {
  const response = await fetch(ADMIN_BASE_URL + "login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    if (data.message === "login success") {
      Cookies.set("token", data.token);
      Cookies.set("user_name", data.name);
      Cookies.set("user_email", userEmail);
      Cookies.set("user_id", data.id);

      NextResponse.redirect(new URL('/Dashboard'));

    }

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }
}
export const AttemptRegister = async(setNameRequired : React.Dispatch<React.SetStateAction<boolean>>, setEmailRequired : React.Dispatch<React.SetStateAction<boolean>>, setPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setPasswordStrong : React.Dispatch<React.SetStateAction<boolean>>, setConfirmPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setMatchPasswordRequired : React.Dispatch<React.SetStateAction<boolean>>, setShowRegisteredAlert : React.Dispatch<React.SetStateAction<boolean>>,  nameRequired : boolean, emailRequired : boolean, passwordRequired : boolean, confirmPasswordRequired : boolean, confirmMatchPasswordRequired : boolean, email : string, name: string, firstPassword: string, matchPassword: string) => {

  const user_email = email;
  const user_name = name;
  const first_password = firstPassword;
  const match_password = matchPassword;

  console.log(email);
  console.log(name);
  console.log(firstPassword);
  console.log(matchPassword);


  if (!email) {
    setEmailRequired(true);
  } else {
    setEmailRequired(false);
  }

  if (!name) {
    setNameRequired(true);
  } else {
    setNameRequired(false);
  }

  if (!firstPassword) {
    setPasswordRequired(true);
  } else {
    setPasswordRequired(false);
    var password_strength = checkPasswordStrength(first_password);
    if (password_strength == "password_strong"){
      setPasswordStrong(false);
    }
    else {
      setPasswordStrong(true);
    }
  }

  if (!matchPassword) {
    setConfirmPasswordRequired(true);
  } else {
    
    if(first_password != match_password){
      setPasswordRequired(false);
      setConfirmPasswordRequired(false);
      setMatchPasswordRequired(true);
    }
    else{
      setMatchPasswordRequired(false);
    }
  
    setConfirmPasswordRequired(false);
  }


  if(nameRequired == false && emailRequired == false && confirmMatchPasswordRequired == false){

  const response = await fetch(ADMIN_BASE_URL + "register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: match_password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    if (data.message == "already registered"){
      setShowRegisteredAlert(true);
    }
    else if (data.message === "registered"){

      Cookies.set("token", data.token);
      Cookies.set("user_name", name);
      Cookies.set("user_email", email);
      Cookies.set("user_id", data.id); 
      window.location.href = "/#";

    }
    else{

      console.log("Message:", data.message);

    }
    

  }
  else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }
  }

}

function checkPasswordStrength(password: string) {
  var checkUppercase = new RegExp('[A-Z]');
  var checkLowercase = new RegExp('[a-z]');
  var checkDigit = new RegExp('[0-9]');
  var checkPasswordLength = new RegExp('.{8}');
  var checkSpecialChar = new RegExp('[^a-zA-Z0-9]');

  if(checkUppercase.test(password) && checkLowercase.test(password) && checkDigit.test(password) && checkSpecialChar.test(password) && checkPasswordLength.test(password)){
    return "password_strong"
  }
  else{
    return "password_weak"
}
}

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    
    Cookies.remove('token');
    Cookies.remove('user_name');
    Cookies.remove('user_email');

    signOut();
   
    router.push('/auth/signin');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    >
      <svg
        className="fill-current"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
          fill=""
        />
        <path
          d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
          fill=""
        />
      </svg>
      <span className="text-primary">Log Out</span>
    </button>
  );
}


export const gmailSignIn = async (email: string ) => {
  try {
    const response = await fetch(ADMIN_BASE_URL + "google_signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();

    if (response.ok) {

      if (data.message == "email found"){
        return true
      }
      else if (data.message == "email not found"){
        return false
      }

    } else {
      console.error("API login failed");
    }
  } catch (error) {
    console.error("An error occurred while posting login data:", error);
  }
  
};

export const setProfileImage = async (profileImageDir : string, id : string) => {
  const response = await fetch(ADMIN_BASE_URL + "set_profile_image", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      profile_image: profileImageDir
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }
}

export const getProfileImage = async (id: string): Promise<string> => {
  const response = await fetch(ADMIN_BASE_URL + "get_profile_image", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    const profileDir = data.profile_image;

    return profileDir

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);

    return "missing"
  }
}

export const getAdminStatus = async (id: string): Promise<string> => {
  const response = await fetch(ADMIN_BASE_URL + "get_status", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    const userStatus = data.status;

    return userStatus

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);

    return "missing"
  }
}

export const updateProfile = async (name: string | undefined, userID: string, password: string | undefined, success: React.Dispatch<React.SetStateAction<boolean>>, setUserName: React.Dispatch<React.SetStateAction<string | undefined>>) => {

  const id = userID;

  console.log(name, id, password)
  const response = await fetch(ADMIN_BASE_URL + "update_profile", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    if (data.message == "successfully updated profile"){
      success(true)
      Cookies.set("user_name", name || "");
      setUserName(name)
    }
    else{
      success(false)
    }

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }


}


export const updatePassword = async (password: string, userID: string) => {

  const response = await fetch(ADMIN_BASE_URL + "update_password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userID,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

  } else {
    const errorData = await response.json();
    
    console.error("Error message:", errorData.message);
  }


}

export const checkPasswordMatch = async (password : string, id : string, setPasswordMatch: React.Dispatch<React.SetStateAction<boolean>>, setPasswordMatchAlert: React.Dispatch<React.SetStateAction<boolean>>) => {
  const response = await fetch(ADMIN_BASE_URL + "check_password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
  
    console.log("Message:", data.message);

    if (data.message == "password match"){
      setPasswordMatch(true)
      setPasswordMatchAlert(false)
    }
    else{
      setPasswordMatch(false)
      setPasswordMatchAlert(true)
    }

  } else {
    const errorData = await response.json();

    setPasswordMatch(false)
    console.error("Error message:", errorData.message);
  }
}