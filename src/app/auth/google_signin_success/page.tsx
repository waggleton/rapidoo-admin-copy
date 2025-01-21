"use client";

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';



const GoogleRedirect = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {

    setUserEmail(searchParams.get('email') as string);
    setUserName(searchParams.get('user') as string);
    setUserID(searchParams.get('id') as string);

    Cookies.set('user_name', userName);
    Cookies.set('user_email', userEmail);
    Cookies.set('user_id', userID);
  
});

  return (
    <>
    
    {Cookies.set("token", "tokener")}
    {window.location.href = "/Dashboard"}
    </>
  )
}

export default GoogleRedirect