"use client";

import { useEffect, useState } from "react";
import { fetchTripsData } from "../Api/admin";
import { fetchAdminData } from "@/components/Api/admin";
import React from 'react';
// import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import { DatePicker } from "@nextui-org/date-picker";
import TableTripsInner from "./TableTripsInner";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from "moment";




interface Trips {
  index: number;
  itrip_id: number;
  order_id: number;
  booked_by: string;
  booking_no: number;
  pickup_address: string;
  dropoff_address: string;
  cs_lat: number;
  cs_long: number;
  rider_lat: number;
  rider_long: number;
  distance: number;
  tripjob_date: string;
  time_request: string;
  time_end: string;
  store: string;
  provider: number; 
  customer: string;
  fare: number;
  type: string;
  transaction_type: string;
  pickup_status: string;
  dropoff_status: string;
  status: string;
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



const TableTrips = () => {
  const [tripsData, setTripsData] = useState<Trips[]>([]);
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true)

  const [currentPage, setCurrentPage] = useState(1);  // for pagination
  const [rowsPerPage] = useState(2);  // items per page

  const [currentTrips, setCurrentTrips] = useState(tripsData)

  const [lowestDate, setLowestDate] = useState<Date | number>(0);
  const [highestDate, setHighestDate] = useState<Date | number>(0);

  const [fromDate, setFromDate] = useState(""); 
  const [toDate, setToDate] = useState("");

  const [providerSearchText, setProviderSearchText] = useState("");
  const [customerSearchText, setCustomerSearchText] = useState("");

  const [fromDate_original, setFromDate_original] = useState<any>(null); 
  const [toDate_original, setToDate_original] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [customer, setCustomer] = useState("");

  const [showFromDate, setShowFromDate] = useState("");
  const [showToDate, setShowToDate] = useState("");

  const [validDate, setValidDate] = useState(false);
  const [providerSearchEmpty, setProviderSearchEmpty] = useState(true);
  const [customerSearchEmpty, setCustomerSearchEmpty] = useState(true);

  const checkDateValid = () => {
    if (fromDate_original < toDate_original){
      setValidDate(false);
    }
    else{
      setValidDate(true);
    }
  }

    // Utility function to convert "mm-dd-yyyy" to a Date object
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);  // Months are 0-indexed in JS
  };

  useEffect(() => {
    fetchTripsData(setTripsData, setLoading);
  }, []);

  useEffect(() => {
    fetchAdminData(setAdminData, setLoading); // Use the imported function
  }, []);

  useEffect(() => 
    {if (!loading && firstLoad){
      setCurrentTrips(filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip));
      setFirstLoad(false);
  }})

  useEffect(() => {
    checkDateValid()
  }, [fromDate_original,toDate_original])

  useEffect(() => {
    if (providerSearchText === ""){
      setProviderSearchEmpty(true);
    }
    else{
      setProviderSearchEmpty(false);
    }
  }, [providerSearchText])

  useEffect(() => {
    if (customerSearchText === ""){
      setCustomerSearchEmpty(true);
    }
    else{
      setCustomerSearchEmpty(false);
    }
  }, [customerSearchText])

  useEffect(() => {
    if (!loading && tripsData.length > 0) {
      const dates = tripsData.map((trip) => trip.tripjob_date);
  
      // Find the minimum and maximum dates
      const minDate = new Date(Math.min(...dates.map(date => new Date(date).getTime())));
      const maxDate = new Date(Math.max(...dates.map(date => new Date(date).getTime())));
  
      // Update the state with Date objects
      setLowestDate(minDate);
      setHighestDate(maxDate);

      setFromDate_original(lowestDate);
      setToDate_original(highestDate);

      console.log(lowestDate);
      console.log(highestDate)
    }
  }, [tripsData, loading]);

  useEffect(() => {
    console.log("fromDate has been updated:", fromDate);
  }, [fromDate]); 
  

  if (loading) return <div>Loading...</div>;





  const handleFromDate = (date: any) => {
    setFromDate_original(date);
    setFromDate(date.format('YYYY-MM-DD'));
    setShowFromDate(date.format('YYYY-MM-DD'))
    console.log(fromDate);
  };
  

  const handleToDate = (date: any) => {
    setToDate_original(date);
    setToDate(date.format('YYYY-MM-DD'));
    setShowToDate(date.format('YYYY-MM-DD'));
    console.log(toDate);
  };

  // Filter trips based on search text and date range
  const filteredTrips = tripsData.filter((trip) => {
    const matchesSearchText =
      trip.itrip_id.toString().includes(searchText) ||
      trip.order_id.toString().includes(searchText) ||
      trip.booking_no.toString().includes(searchText);
  
    let matchesDateRange = true;
    if (fromDate && toDate) {
      const tripDate = parseDate(trip.tripjob_date);
      const startDate = parseDate(fromDate);
      const endDate = parseDate(toDate);
      matchesDateRange = tripDate >= startDate && tripDate <= endDate;
    }
  
    const matchesStatus = status ? trip.status.toString().includes(status) : true;
    const matchesProvider = provider
      ? (adminData.find(admin => admin.id === trip.provider)?.first_name + " " + adminData.find(admin => admin.id === trip.provider)?.last_name).includes(provider)
      : true;
    const matchesCustomer = customer ? trip.customer.includes(customer) : true;
  
    return matchesSearchText && matchesDateRange && matchesStatus && matchesProvider && matchesCustomer;
  });

  const filteredProviders = tripsData.filter((trip) => {
    const provider_name = adminData.find(admin => admin.id === trip.provider)?.first_name + " " + 
                          adminData.find(admin => admin.id === trip.provider)?.last_name || "Unknown";
    const matchesSearchText =
    provider_name.toString().toLowerCase().includes(providerSearchText.toLowerCase());

      return matchesSearchText
  });

  const filteredCustomers = tripsData.filter((trip) => {
    const matchesSearchText =
      trip.customer.toString().toLowerCase().includes(customerSearchText.toLowerCase());

      return matchesSearchText
  });

  const indexOfLastTrip = currentPage * rowsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;

  


  const totalPages = Math.ceil(filteredTrips.length / rowsPerPage);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const indexOfLastTrip = page * rowsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;

    setCurrentTrips(filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip));
  };

  let inputProps = {
    placeholder: 'N/A',
    disabled: true,
    onMouseLeave: () => alert('You went to the input but it was disabled')
};

  return (
    <div className="max-h-screen max-w-[900px] dark:bg-boxdark-2 dark:text-bodydark">
<table>
        <thead>
          {validDate && <div className="bg-red-400 p-2  text-white border rounded-box">Invalid Date Range</div>}
          <tr>
            <th>
              <div>From Date</div>
              <Datetime value={fromDate_original} initialValue={"YYYY-MM-DD"} onChange={(e) => handleFromDate(e)} timeFormat={false} inputProps={{ readOnly: true, value: showFromDate, placeholder: "YYYY-MM-DD", style: { width: '135px', height: '46px', fontSize: '16px', borderRadius: '5px', border: `2px solid ${validDate ? 'red' : 'black'}` } }} className="border-black-2"/>
            </th>
            <th>
            <div>To Date</div>
              <Datetime value={fromDate_original} initialValue={"YYYY-MM-DD"} onChange={(e) => handleToDate(e)} timeFormat={false} inputProps={{ readOnly: true, value: showToDate, placeholder: "YYYY-MM-DD", style: { width: '135px', height: '46px', fontSize: '16px', borderRadius: '5px', border: `2px solid ${validDate ? 'red' : 'black'}` } }} className="border-black-2"/>
            </th>
            <th className="align-bottom  border-black-2">
              <input
                type="text"
                placeholder="Trip/Job Number"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-4 m-1 w-50 h-12 rounded-md border-2 border-black-2"
              />
            </th>
            <th>
              <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 bg-gray-300 border-2 border-black-2">
                  {status === "" ? "All Status" : <span>{status}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li key="all_status_button" ><a onClick={() => setStatus("")}>All Status</a></li>
                  <li key="arrived_at_store_button"><a onClick={() => setStatus("Arrived_At_Store")}>Arrived at Store</a></li>
                  <li key="on_going_delivery_button" ><a onClick={() => setStatus("On_Going_Delivery")}>On Going Delivery</a></li>
                  <li key="arrived_at_customer_button" ><a onClick={() => setStatus("Arrived_at_Customer")}>Arrived At Customer</a></li>
                  <li key="finished_button" ><a onClick={() => setStatus("Finished")}>Finished</a></li>
                  <li key="cancelled_button" ><a onClick={() => setStatus("Cancelled")}>Cancelled</a></li>
                </ul>
              </div>
            </th>
            <th>
            <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10 bg-gray-300 border-2 border-black-2">
                {provider === "" ? "All Providers" : <span>{provider}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border-black-2">
                  <li key="search_provider_text" >
                  <input
                    type="text"
                    value={providerSearchText}
                    onChange={(e) => setProviderSearchText(e.target.value)}
                    className="bg-gray-300"
                    placeholder="Search"
                    />
                    {!providerSearchEmpty && 
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-2 py-1 rounded-full"
                      onClick={() => {setProviderSearchText("") 
                      setProvider("")}}
                    >
                        X
                      </button>}
                  </li>
                  {/* <li key={index} ><a onClick={() => setProvider("")}>All Providers</a></li> */}
                {filteredProviders.map((trips, key) => (
                  
                  <li key={key} ><a onClick={() => {setProvider(
                    adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                    adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown")
                    setProviderSearchText(adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                    adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown")}}>
                    {
                    adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                    adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown"
                    }</a></li>
                  
                  ))}
                </ul>
              </div>
            </th>
            <th>
            <div className="dropdown pt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-35 h-10 bg-gray-300 border-2 border-black-2">
                {customer === "" ? "All Customers" : <span>{customer}</span>}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li key="search_customer_text" >
                  <input
                    type="text"
                    value={customerSearchText}
                    onChange={(e) => setCustomerSearchText(e.target.value)}
                    className="bg-gray-300"
                    placeholder="Search"
                    />
                    {!customerSearchEmpty && 
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-2 py-1 rounded-full"
                      onClick={() => {setCustomerSearchText("")
                      setCustomer("")}}
                    >
                        X
                      </button>}
                  </li>
                {/* <li key={index} ><a onClick={() => setCustomer("")}>All Customers</a></li> */}
                {filteredCustomers.map((trips, key) => (
                  
                  <li key={key} ><a onClick={() => {setCustomer(trips.customer) 
                  setCustomerSearchText(trips.customer)}}>{trips.customer}</a></li>
                  
                  ))}
                  </ul>          
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div tabIndex={0} 
                    role="button"  
                    onClick={() => handlePageChange(1)} 
                    className="btn m-1 w-35 h-10 bg-green-200 border-2 border-black-2" >
                Search
              </div>
            </td>
            <td>
              <div tabIndex={0} onClick={() => {  
                setFromDate_original(new Date(lowestDate))
                setToDate_original(new Date(highestDate))
                setFromDate("")
                setToDate("")
                setShowFromDate("YYYY-MM-DD")
                setShowToDate("YYYY-MM-DD")
                setSearchText("")
                setStatus("")
                setProvider("")
                setCustomer("")
                setFirstLoad(true)
                }} role="button" className="btn m-1 w-35 h-10 bg-yellow-200 border-2 border-black-2">
                Reset
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Render TableTripsInner with required props */}
      <TableTripsInner currentTrips={currentTrips} adminData={adminData} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 text-black-2 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 rounded-md border-2 border-black-2 text-black-2 dark:border-gray-200 dark:text-gray-200"
        >
          Next
        </button>
      </div>

    </div>
    
  );
};

export default TableTrips;
