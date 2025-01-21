"use client";

import React, { useEffect, useState } from 'react'

interface Props {
  userID: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ChangePasswordModal = ({setNewPassword, userID}: Props) => {

  const[passwordLengthCheck, setPasswordLengthCheck] = useState(false);
  const[passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const[passwordHasLowercase, setPasswordHasLowercase] = useState(false);
  const[passwordHasNumber, setPasswordHasNumber] = useState(false);
  const[passwordHasSpecialChar, setPasswordHasSpecialChar] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  
  const [firstPassword, setFirstPassword] = useState("")
  const [matchPassword, setMatchPassword] = useState("")

  var checkUppercase = new RegExp('[A-Z]');
  var checkLowercase = new RegExp('[a-z]');
  var checkDigit = new RegExp('[0-9]');
  var checkPasswordLength = new RegExp('.{8}');
  var checkSpecialChar = new RegExp('[^a-zA-Z0-9]');


  useEffect(() => {
    const hasUppercase = checkUppercase.test(firstPassword);
    const hasLowercase = checkLowercase.test(firstPassword);
    const hasNumber = checkDigit.test(firstPassword);
    const hasSpecialChar = checkSpecialChar.test(firstPassword);
    const isLengthValid = checkPasswordLength.test(firstPassword);

    setPasswordHasUppercase(hasUppercase);
    setPasswordHasLowercase(hasLowercase);
    setPasswordHasNumber(hasNumber);
    setPasswordLengthCheck(isLengthValid);
    setPasswordHasSpecialChar(hasSpecialChar);

    const isStrong = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLengthValid;
    setPasswordStrong(isStrong);

    console.log("First Password:", firstPassword);
    console.log("Strong Password:", isStrong);
}, [firstPassword]);

useEffect(() => {
    const isMatching = firstPassword === matchPassword;
    const isPasswordRequired = !firstPassword;
    const isConfirmRequired = !matchPassword;

    setConfirmPasswordMatch(isMatching);
    setPasswordRequired(isPasswordRequired);
    setConfirmPasswordRequired(isConfirmRequired);

    const newPassword = firstPassword && matchPassword && isMatching && passwordStrong
        ? matchPassword
        : undefined;

    setNewPassword(newPassword);

    console.log("First Password:", firstPassword);
    console.log("Match Password:", matchPassword);
    console.log("Strong Password:", passwordStrong);
    console.log("Password Match:", isMatching);
    console.log("newpass: ", newPassword)
}, [matchPassword, firstPassword, passwordStrong]);

  
    return (

            <div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >Type New Password</label>
                    

              <div className="w-full max-w-sm min-w-[200px] mt-4">
                <div className="relative mt-2">
                  <div className="absolute top-2 left-0 flex items-center pl-3">
                  </div>
                  <input
                    type="password"
                    value={firstPassword}
                    onChange={(e) =>
                    {
                      setFirstPassword(e.target.value)
                    }
                    }
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                  </div>

                  {passwordRequired && (
                    <div><span className="text-red-500 text-sm mt-1">This field is required</span></div>
                  )}

                </div>
              </div>

              <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >Confirm New Password</label>

              <div className="w-full max-w-sm min-w-[200px] mt-4">
                <div className="relative mt-2">
                  <div className="absolute top-2 left-0 flex items-center pl-3">
                  </div>
                  <input
                    type="password"
                    value={matchPassword}
                    onChange={(e) =>
                    {
                      setMatchPassword(e.target.value)
                    }
                    }
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                  </div>
                  {confirmPasswordRequired && (
                    <span className="text-red-500 text-sm mt-1">This field is required</span>
                  )}
                  {!confirmPasswordMatch && (
                    <span className="text-red-500 text-sm mt-1"><br/>The passwords do not match</span>
                  )}
                </div>
              </div>
                  
                  <div>
                  <span>Make sure that your password has:</span>

                  <ul className="list-disc px-5">

                  <li>{passwordLengthCheck ?(
                   <span className="text-green-500 text-sm mt-1">A minimum of 8 characters</span>
                  ):<span className="text-red-500 text-sm mt-1">A minimum of 8 characters</span>
                  }</li> 
                  <li>{passwordHasUppercase ?(
                   <span className="text-green-500 text-sm mt-1">Contains an uppercase letter</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains an uppercase letter</span>
                  }</li>
                  <li>{passwordHasLowercase ?(
                   <span className="text-green-500 text-sm mt-1">Contains an lowecase letter</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains an lowecase letter</span>
                  }</li>
                  <li>{passwordHasNumber ?(
                   <span className="text-green-500 text-sm mt-1">Contains a number</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains a number</span>
                  }</li> 
                  <li>{passwordHasSpecialChar ?(
                   <span className="text-green-500 text-sm mt-1">Contains a special character</span>
                  ):<span className="text-red-500 text-sm mt-1">Contains a special character</span>
                  }</li>
                  </ul>
                </div>
            </div>

      );
}

export default ChangePasswordModal