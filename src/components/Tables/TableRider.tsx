"use client";

import { useState } from "react";
import Link from "next/link"
import { updateAdminStatus, updateUserMobile } from "../Api/admin";
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

interface AdminDashboardProps {
  initialAdminData: Admin[]; // Changed from adminData to initialAdminData
}

const TableRider: React.FC<AdminDashboardProps> = ({ initialAdminData }) => {
  const [adminData, setAdminData] = useState<Admin[]>(initialAdminData); // Set local state
  const [loading, setLoading] = useState(false);
  const [mobileUpdateModal, setMobileUpdateModal] = useState<number | null>(null);

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

  return (
    <div className="max-h-screen max-w-[900px] overflow-x-auto dark:bg-black-2 bg-white">
      
      <div
        className="grid min-w-max grid-cols-12 rounded-sm bg-gray-3 dark:bg-meta-4"
        style={{
          gridTemplateColumns:
            "38px 113px 150px 75px 75px 80px 75px 113px 75px 113px 75px 75px",
            
        }}
      >
        <div className="truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">
          <button className="btn btn-square btn-xs bg-black-2 dark:bg-white" onClick={() => toggleCheckboxes(!setCheckbox)}>
          </button>
          </h5>
        </div>
        <div className="truncate whitespace-normal p-2">
          <h5 className="text-m font-medium uppercase">Provider Name</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Email</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Vehicle Count</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Signup Date</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Mobile</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Wallet Balance</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Document(s)</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Manage Services</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">View/Edit Availability</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Status</h5>
        </div>
        <div className="truncate whitespace-normal p-2 text-center">
          <h5 className="text-m font-medium uppercase">Action</h5>
        </div>
      </div>

      {adminData.map((admin, key) => (
        <div
          className={`grid grid-cols-3 sm:grid-cols-12  ${
            key === adminData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
          }`}
          key={admin.id}
          style={{
            gridTemplateColumns:
              "38px 113px 150px 75px 75px 80px 75px 113px 75px 113px 75px 75px",
          }}
        >
          <div className="flex items-center justify-center truncate whitespace-normal p-2">
            <input type="checkbox" className="checkbox checkbox-primary" id={`checkbox-${admin.id}`} />
          </div>
          <div className="g flex items-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">
              {admin.last_name}, {admin.first_name} {admin.middle_name}
            </p>
          </div>
          <div className="flex items-center justify-center whitespace-normal break-all p-2">
            <p className="text-xs text-black dark:text-white">{admin.email}</p>
          </div>
          <div className="flex items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">{admin.vehicle_count}</p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">
              {new Date(admin.signup_date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center justify-center truncate whitespace-normal p-2">
            <p className="text-xs text-black dark:text-white">
              (+63) {admin.mobile}
              <br />
              <button className="btn btn-sm" onClick={() => setMobileUpdateModal(admin.id)}>Update Mobile</button>
              {mobileUpdateModal === admin.id && <UpdateMobileBox admin_id = {admin.id} setMobileUpdateModal = {setMobileUpdateModal} setAdminData= {setAdminData} setLoading = {setLoading}  />}
            </p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">P {admin.wallet_ballance}</p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">
              {admin.documents}
              <br />
              <button className="btn btn-circle" />
            </p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">
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
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">
              {admin.availability}
              <br />
              <Link href="">Edit Availability</Link>
            </p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center truncate whitespace-normal p-2">
            <p className="text-xs">{admin.status}</p>
          </div>
          <div className="flex items-center text-black dark:text-white justify-center whitespace-normal p-2">
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-transparent text-white" onClick={toggleDropdown}>
              <p className="text-xs text-black dark:text-white">...</p>
              </div>
              {dropdownVisible &&
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gray-400 rounded-box z-[1] w-25 p-2 shadow"
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
          </div>
        </div>
      ))}
    </div>
  );
};
export default TableRider;
