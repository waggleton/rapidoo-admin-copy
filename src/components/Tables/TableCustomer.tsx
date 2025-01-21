"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import { fetchAdminData, updateAdminStatus, updateUserMobile } from "../Api/admin";
import UpdateMobileBox from "../Modal/update_mobile_box";

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


const TableCustomer = () => {
  const [mobileUpdateModal, setMobileUpdateModal] = useState<number | null>(null);;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const [setCheckbox, setToggleCheckbox] = useState(false);


  const toggleCheckboxes = (checkAll: boolean) => {
    // Select all checkboxes with the class 'checkbox'
    setToggleCheckbox(!setCheckbox)
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.checkbox');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkAll; // Set each checkbox's 'checked' state based on 'checkAll'
    });
  };

  const [adminData, setAdminData] = useState<Admin[]>([]);; // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData(setAdminData, setLoading); // Use the imported function
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-h-screen max-w-[900px] overflow-x-auto dark:bg-black-2 bg-white">

    <table className="table dark:bg-black-2 bg-white rounded-none">
      
      {/* <div
        className="grid min-w-max grid-cols-12 rounded-sm bg-gray-3 dark:bg-meta-4"
        style={{
          gridTemplateColumns:
            "38px 113px 150px 75px 75px 80px 75px 113px 75px 113px 75px 75px",
            
        }}
      > */}

        <tr>
        <th>
        <label className="truncate whitespace-normal p-2">
          <button className="btn btn-square btn-xs" onClick={() => toggleCheckboxes(!setCheckbox)}>
          </button>
        </label>
        </th>
        <th className="truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Provider Name</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Email</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Vehicle Count</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Signup Date</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Mobile</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Wallet Balance</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Document(s)</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Manage Services</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Availability</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Status</h5>
        </th>
        <th className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Action</h5>
        </th>
      </tr>

      {adminData.map((admin, key) => (

        <tr key={key}>
          
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <input type="checkbox" className="checkbox checkbox-primary" id={`checkbox-${admin.id}`} />
          </td>
          <td className="g  items-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">
              {admin.last_name}, {admin.first_name} {admin.middle_name}
            </p>
          </td>
          <td className=" items-center justify-center whitespace-normal break-all p-2">
            <p className="text-xs text-black dark:text-white">{admin.email}</p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">{admin.vehicle_count}</p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-3">
              {new Date(admin.signup_date).toLocaleDateString()}
            </p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">
              (+63) {admin.mobile}
              <br />
              <button className="btn btn-sm" onClick={() => setMobileUpdateModal(admin.id)}>Update Mobile</button>
              {mobileUpdateModal === admin.id && <UpdateMobileBox admin_id = {admin.id} setMobileUpdateModal = {setMobileUpdateModal} setAdminData= {setAdminData} setLoading = {setLoading}  />}
            </p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-5">P {admin.wallet_ballance}</p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-5">
              {admin.documents}
              <br />
              <button className="btn btn-circle" />
            </p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-5">
              {admin.services}
              <br />
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-5">
              {admin.availability}
              <br />
              <Link href="">Edit Availability</Link>
            </p>
          </td>
          <td className=" items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-meta-5">{admin.status}</p>
          </td>
          <td className=" items-center justify-center whitespace-normal p-2">
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-transparent text-white" onClick={toggleDropdown}>
                ...
              </div>
              {dropdownVisible &&
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {/* Handle status update based on selection */}
                <li>
                  <a
                    onClick={() => {updateAdminStatus(admin.id, "active", setAdminData, setLoading) 
                      setDropdownVisible(false)}}
                    className={loading ? "disabled" : ""}
                  >
                    active
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      updateAdminStatus(admin.id, "inactive", setAdminData, setLoading)
                      setDropdownVisible(false) }}
                    className={loading ? "disabled" : ""}
                  >
                    inactive
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {updateAdminStatus(admin.id, "delete", setAdminData, setLoading) 
                      setDropdownVisible(false)}}
                    className={loading ? "disabled" : ""}
                  >
                    delete
                  </a>
                </li>
              </ul>
              }
              </div>
            </td>
        </tr>
      ))}
      
      </table>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/admin_dashboard");
  const initialAdminData = await res.json();

  return {
    props: {
      initialAdminData,
    },
  };
}

export default TableCustomer;
