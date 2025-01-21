"use client";

import { useEffect, useState } from "react";
import { fetchTransactionsnData } from "../Api/admin";
import TableTransactionsInner from "./TableTransactionsInner";

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



const TableTransactions = () => {

  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]); // Initialize as an empty array
  const [fullTransactionsData, setFullTransactionsData] = useState<Transaction[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' } | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);  // for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5);  // items per page

  const [currentTransactions, setCurrentTransactions] = useState(transactionsData)

  const indexOfLastTrip = currentPage * rowsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;

  const [accountIDSearchText, setAccountIDSearchText] = useState("")
  const [riderAccountIDSearchText, setRiderAccountIDSearchText] = useState("")
  const [refIDSearchText, setRefIDSearchText] = useState("")
  const [couponSearchText, setCouponSearchText] = useState("")
  const [distanceSearchText, setDistanceSearchText] = useState("")
  const [senderSearchText, setSenderSearchText] = useState("")
  const [recieverSearchText, setRecieverSearchText] = useState("")
  const [pickupadrSearchText, setPickupAdrSearchText] = useState("")
  const [dropoffadrSearchText, setDropoffAdrSearchText] = useState("")
  const [multiDropSearchText, setMultiDropAdrSearchText] = useState("")
  const [rebateSearchText, setRebateSearchText] = useState("")
  const [processingFeeTextSearchText, setProcessingFeeSearchText] = useState("")
  const [discountSearchText, setDiscountSearchText] = useState("")
  const [transAmountSearchText, setTransAmountSearchText] = useState("")
  const [transAmountStartNumber, setTransAmountStartNumber] = useState<number | undefined>(undefined)
  const [transAmountEndNumber, setTransAmountEndNumber] = useState<number | undefined>(undefined)
  const [totalAmountSearchText, setTotalAmountSearchText] = useState("")
  const [totalAmountStartNumber, setTotalAmountStartNumber] = useState<number | undefined>(undefined)
  const [totalAmountEndNumber, setTotalAmountEndNumber] = useState<number | undefined>(undefined)
  const [tipSearchText, setTipSearchText] = useState("")
  const [tipStartNumber, setTipStartNumber] = useState<number | undefined>(undefined)
  const [tipEndNumber, setTipEndNumber] = useState<number | undefined>(undefined)
  const [notesSearchText, setNotesSearchText] = useState("")
  const [vehicleTypeSearchText, setVehicleTypeSearchText] = useState("")
  const [paymentSearchText, setPaymentSearchText] = useState("")
  const [senderPaySearchText, setSenderPaySearchText] = useState("")
  const [statusSearchText, setStatusSearchText] = useState("")
  const [createdAtSearchText, setCreatedAtSearchText] = useState("")
  const [createdAtFromDate, setCreatedAtFromDate] = useState("")
  const [createdAtToDate, setCreatedAtToDate] = useState("")
  const [updatedAtSearchText, setUpdatedAtSearchText] = useState("")
  const [updatedAtFromDate, setUpdatedAtFromDate] = useState("")
  const [updatedAtToDate, setUpdatedAtToDate] = useState("")
  const [customerNameSearchText, setCustomerNameSearchText] = useState("")
  const [riderEarnedSearchText, setRiderEarnedSearchText] = useState("")
  const [rapidooEarnedSearchText, setRapidooEarnedSearchText] = useState("")
  const [ogPickupAdrSearchText, setOgPickupAdrSearchText] = useState("")
  const [ogDropoffAdrSearchText, setOgDropoffAdrSearchText] = useState("")


// Helper function to handle null and undefined values
const safeToString = (value: string | number | boolean) => (value ?? '').toString();

const parseDate = (dateStr: string): Date => {
  let date: Date;

  if (dateStr.includes('T')) {
    // If the date string already includes 'T', we just parse it as is and set time to midnight
    date = new Date(dateStr);
    date.setHours(0, 0, 0, 0); // Ensure time is set to midnight
  } else {
    // If the date string doesn't include 'T', append 'T00:00:00' to set the time to midnight
    date = new Date(dateStr + 'T00:00:00');
  }

  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

const handleSort = (key: keyof Transaction) => {
  setSortConfig((prevConfig) => {
    if (prevConfig && prevConfig.key === key) {
      // Toggle sort direction
      return {
        key,
        direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
      };
    }
    // Set new sort key and default to ascending
    return { key, direction: 'asc' };
  });
};



const filteredTransactions = transactionsData.filter((transaction) => {
  const matchesSearchText =
    safeToString(transaction.account_id).includes(accountIDSearchText) &&
    safeToString(transaction.rider_account_id).includes(riderAccountIDSearchText) &&
    safeToString(transaction.reference_id).includes(refIDSearchText) &&
    safeToString(transaction.coupon).includes(couponSearchText) &&
    safeToString(transaction.distance).includes(distanceSearchText) &&
    safeToString(transaction.sender_details).includes(senderSearchText) &&
    safeToString(transaction.receiver_details).includes(recieverSearchText) &&
    safeToString(transaction.pickup_address).includes(pickupadrSearchText) &&
    safeToString(transaction.dropoff_address).includes(dropoffadrSearchText) &&
    safeToString(transaction.multiple_dropoff).includes(multiDropSearchText) &&
    safeToString(transaction.rebate).includes(rebateSearchText) &&
    safeToString(transaction.processing_fee).includes(processingFeeTextSearchText) &&
    safeToString(transaction.discount).includes(discountSearchText) &&
    safeToString(transaction.transaction_amount).includes(transAmountSearchText) &&
    safeToString(transaction.tip).includes(tipSearchText) &&
    safeToString(transaction.notes).includes(notesSearchText) &&
    safeToString(transaction.vehicle_type).includes(vehicleTypeSearchText) &&
    safeToString(transaction.payment_method).includes(paymentSearchText) &&
    safeToString(transaction.sender_payment).includes(senderPaySearchText) &&
    safeToString(transaction.status).includes(statusSearchText) &&
    safeToString(transaction.customer_name).includes(customerNameSearchText) &&
    safeToString(transaction.rider_earned).includes(riderEarnedSearchText) &&
    safeToString(transaction.rapidoo_earned).includes(rapidooEarnedSearchText) &&
    safeToString(transaction.original_pickup_address).includes(ogPickupAdrSearchText) &&
    safeToString(transaction.original_dropoff_address).includes(ogDropoffAdrSearchText);

  let matchesTransactionAmountRange = true;
  if (transAmountStartNumber && transAmountEndNumber){
    const total_amount = transaction.transaction_amount;
    matchesTransactionAmountRange = transAmountStartNumber <= total_amount && total_amount <= transAmountEndNumber;
  }

  let matchesTotalAmountRange = true;
  if (totalAmountStartNumber && totalAmountEndNumber){
    const total_amount = transaction.total_amount;
    matchesTotalAmountRange = totalAmountStartNumber <= total_amount && total_amount <= totalAmountEndNumber;
  }

  let matchesTipRange = true;
  if (tipStartNumber && tipEndNumber){
    const total_amount = transaction.tip;
    matchesTipRange = tipStartNumber <= total_amount && total_amount <= tipEndNumber;
  }

  let matchesCreatedAtDateRange = true;
  if (createdAtFromDate && createdAtToDate) {
    const tripDate = parseDate(transaction.created_at);
    const startDate = parseDate(createdAtFromDate);
    const endDate = parseDate(createdAtToDate);
    matchesCreatedAtDateRange = tripDate >= startDate && tripDate <= endDate;
  }

  let matchesUpdatedAtDateRange = true;
  if (updatedAtFromDate && updatedAtToDate) {
    const tripDate = parseDate(transaction.updated_at);
    const startDate = parseDate(updatedAtFromDate);
    const endDate = parseDate(updatedAtToDate);
    matchesUpdatedAtDateRange = tripDate >= startDate && tripDate <= endDate;
  }

  return matchesSearchText && matchesTransactionAmountRange && matchesTotalAmountRange && matchesTipRange && matchesCreatedAtDateRange && matchesUpdatedAtDateRange;
});

const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

const sortedTransactions = [...filteredTransactions].sort((a, b) => {
  if (!sortConfig) {
    // Default sorting by Transaction.id
    return b.id - a.id;
  }

  const { key, direction } = sortConfig;
  const order = direction === 'asc' ? 1 : -1;

  if (a[key] < b[key]) return -1 * order;
  if (a[key] > b[key]) return 1 * order;
  return 0;
});


  useEffect(() => {
    fetchTransactionsnData(setTransactionsData, setLoading);
    fetchTransactionsnData(setFullTransactionsData, setLoading); 
  }, []);
  

  useEffect(() => {setCurrentPage(1)}, 
  [
    sortConfig,
    accountIDSearchText,
    riderAccountIDSearchText,
    refIDSearchText,
    couponSearchText,
    distanceSearchText,
    senderSearchText,
    recieverSearchText,
    pickupadrSearchText,
    dropoffadrSearchText,
    multiDropSearchText,
    rebateSearchText,
    processingFeeTextSearchText,
    discountSearchText,
    transAmountSearchText,
    transAmountStartNumber,
    transAmountEndNumber,
    totalAmountSearchText,
    totalAmountStartNumber,
    totalAmountEndNumber,
    tipSearchText,
    tipStartNumber,
    tipEndNumber,
    notesSearchText,
    vehicleTypeSearchText,
    paymentSearchText,
    senderPaySearchText,
    statusSearchText,
    createdAtSearchText,
    createdAtFromDate,
    createdAtToDate,
    updatedAtSearchText,
    updatedAtFromDate,
    updatedAtToDate,
    customerNameSearchText,
    riderEarnedSearchText,
    rapidooEarnedSearchText,
    ogPickupAdrSearchText,
    ogDropoffAdrSearchText,])

  useEffect(() => {
    
    setCurrentTransactions(sortedTransactions.slice(indexOfFirstTrip, indexOfLastTrip));
      
    
  }, [
    loading,
    rowsPerPage,
    currentPage,
    sortConfig,
    accountIDSearchText,
    riderAccountIDSearchText,
    refIDSearchText,
    couponSearchText,
    distanceSearchText,
    senderSearchText,
    recieverSearchText,
    pickupadrSearchText,
    dropoffadrSearchText,
    multiDropSearchText,
    rebateSearchText,
    processingFeeTextSearchText,
    discountSearchText,
    transAmountSearchText,
    transAmountStartNumber,
    transAmountEndNumber,
    totalAmountSearchText,
    totalAmountStartNumber,
    totalAmountEndNumber,
    tipSearchText,
    tipStartNumber,
    tipEndNumber,
    notesSearchText,
    vehicleTypeSearchText,
    paymentSearchText,
    senderPaySearchText,
    statusSearchText,
    createdAtSearchText,
    createdAtFromDate,
    createdAtToDate,
    updatedAtSearchText,
    updatedAtFromDate,
    updatedAtToDate,
    customerNameSearchText,
    riderEarnedSearchText,
    rapidooEarnedSearchText,
    ogPickupAdrSearchText,
    ogDropoffAdrSearchText,])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-[900px]">
                  {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-4">
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
      </div> */}

      <div tabIndex={0} onClick={() => {
                setSortConfig(null)  
                setAccountIDSearchText("")
                setRiderAccountIDSearchText("")
                setRefIDSearchText("")
                setCouponSearchText("")
                setDistanceSearchText("")
                setSenderSearchText("")
                setRecieverSearchText("")
                setPickupAdrSearchText("")
                setDropoffAdrSearchText("")
                setMultiDropAdrSearchText("")
                setRebateSearchText("")
                setProcessingFeeSearchText("")
                setDiscountSearchText("")
                setTransAmountSearchText("")
                setTransAmountStartNumber(undefined)
                setTransAmountEndNumber(undefined)
                setTotalAmountSearchText("")
                setTotalAmountStartNumber(undefined)
                setTotalAmountEndNumber(undefined)
                setTipSearchText("")
                setTipStartNumber(undefined)
                setTipEndNumber(undefined)
                setNotesSearchText("")
                setVehicleTypeSearchText("")
                setPaymentSearchText("")
                setSenderPaySearchText("")
                setStatusSearchText("")
                setCreatedAtFromDate("")
                setCreatedAtToDate("")
                setUpdatedAtFromDate("")
                setUpdatedAtToDate("")
                setCustomerNameSearchText("")
                setRiderEarnedSearchText("")
                setRapidooEarnedSearchText("")
                setOgPickupAdrSearchText("")
                setOgDropoffAdrSearchText("")
                setCurrentPage(1)
                }} role="button" className="btn m-1 w-35 h-10 bg-yellow-200 border-2 border-black-2">
                Reset
              </div>

              <div className="dropdown absolute right-10">
                <b>Rows Per Page:</b>
                <div tabIndex={0} role="button" className="btn m-1 w-20 h-10 bg-gray-300 border-2 border-black-2">
                <span>{rowsPerPage}</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M12 15.5l-6-6h12l-6 6z" 
                        clipRule="evenodd"
                    />
                </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-25 p-2 shadow">
                <li><a onClick={() => {setRowsPerPage(5)
                  setCurrentPage(1)
                }}>5</a></li>      
                <li><a onClick={() => {setRowsPerPage(10)
                  setCurrentPage(1)
                }}>10</a></li>
                <li><a onClick={() => {setRowsPerPage(15)
                  setCurrentPage(1)
                }}>15</a></li>         
                <li><a onClick={() => {setRowsPerPage(20)
                  setCurrentPage(1)
                }}>20</a></li>
                <li><a onClick={() => {setRowsPerPage(25)
                  setCurrentPage(1)
                }}>25</a></li>
                <li><a onClick={() => {setRowsPerPage(30)
                  setCurrentPage(1)
                }}>30</a></li>
                <li><a onClick={() => {setRowsPerPage(35)
                  setCurrentPage(1)
                }}>35</a></li>
                <li><a onClick={() => {setRowsPerPage(40)
                  setCurrentPage(1)
                }}>40</a></li>
                <li><a onClick={() => {setRowsPerPage(45)
                  setCurrentPage(1)
                }}>45</a></li>
                <li><a onClick={() => {setRowsPerPage(50)
                  setCurrentPage(1)
                }}>50</a></li>

                  </ul>          
              </div>
      <TableTransactionsInner
      fullTransactionsData={fullTransactionsData}
      currentTransactions={currentTransactions}
      sortConfig={sortConfig}
      accountIDSearchText={accountIDSearchText}
      riderAccountIDSearchText={riderAccountIDSearchText}
      refIDSearchText={refIDSearchText}
      couponSearchText={couponSearchText}
      distanceSearchText={distanceSearchText}
      senderSearchText={senderSearchText}
      recieverSearchText={recieverSearchText}
      pickupadrSearchText={pickupadrSearchText}
      dropoffadrSearchText={dropoffadrSearchText}
      multiDropSearchText={multiDropSearchText}
      rebateSearchText={rebateSearchText}
      processingFeeTextSearchText={processingFeeTextSearchText}
      discountSearchText={discountSearchText}
      transAmountSearchText={transAmountSearchText}
      transAmountStartNumber = {transAmountStartNumber}
      transAmountEndNumber = {transAmountEndNumber}
      totalAmountSearchText={totalAmountSearchText}
      totalAmountStartNumber={totalAmountStartNumber}
      totalAmountEndNumber={totalAmountEndNumber}
      tipSearchText={tipSearchText}
      tipStartNumber = {tipStartNumber}
      tipEndNumber = {tipEndNumber}
      notesSearchText={notesSearchText}
      vehicleTypeSearchText={vehicleTypeSearchText}
      paymentSearchText={paymentSearchText}
      senderPaySearchText={senderPaySearchText}
      statusSearchText={statusSearchText}
      createdAtSearchText={createdAtSearchText}
      createdAtFromDate={createdAtFromDate}
      createdAtToDate={createdAtToDate}
      updatedAtFromDate={updatedAtFromDate}
      updatedAtToDate={updatedAtToDate}
      updatedAtSearchText={updatedAtSearchText}
      customerNameSearchText={customerNameSearchText}
      riderEarnedSearchText={riderEarnedSearchText}
      rapidooEarnedSearchText={rapidooEarnedSearchText}
      ogPickupAdrSearchText={ogPickupAdrSearchText}
      ogDropoffAdrSearchText={ogDropoffAdrSearchText}
      handleSort={handleSort}
      setAccountIDSearchText={setAccountIDSearchText}
      setRiderAccountIDSearchText={setRiderAccountIDSearchText}
      setRefIDSearchText={setRefIDSearchText}
      setCouponSearchText={setCouponSearchText}
      setDistanceSearchText={setDistanceSearchText}
      setSenderSearchText={setSenderSearchText}
      setRecieverSearchText={setRecieverSearchText}
      setPickupAdrSearchText={setPickupAdrSearchText}
      setDropoffAdrSearchText={setDropoffAdrSearchText}
      setMultiDropAdrSearchText={setMultiDropAdrSearchText}
      setRebateSearchText={setRebateSearchText}
      setProcessingFeeSearchText={setProcessingFeeSearchText}
      setDiscountSearchText={setDiscountSearchText}
      setTransAmountSearchText={setTransAmountSearchText}
      setTransAmountStartNumber={setTransAmountStartNumber}
      setTransAmountEndNumber={setTransAmountEndNumber}
      setTotalAmountSearchText={setTotalAmountSearchText}
      setTotalAmountStartNumber={setTotalAmountStartNumber}
      setTotalAmountEndNumber={setTotalAmountEndNumber}
      setTipSearchText={setTipSearchText}
      setTipStartNumber={setTipStartNumber}
      setTipEndNumber={setTipEndNumber}
      setNotesSearchText={setNotesSearchText}
      setVehicleTypeSearchText={setVehicleTypeSearchText}
      setPaymentSearchText={setPaymentSearchText}
      setSenderPaySearchText={setSenderPaySearchText}
      setStatusSearchText={setStatusSearchText}
      setCreatedAtSearchText={setCreatedAtSearchText}
      setCreatedAtFromDate={setCreatedAtFromDate}
      setCreatedAtToDate={setCreatedAtToDate}
      setUpdatedAtSearchText={setUpdatedAtSearchText}
      setUpdatedAtFromDate={setUpdatedAtFromDate}
      setUpdatedAtToDate={setUpdatedAtToDate}
      setCustomerNameSearchText={setCustomerNameSearchText}
      setRiderEarnedSearchText={setRiderEarnedSearchText}
      setRapidooEarnedSearchText={setRapidooEarnedSearchText}
      setOgPickupAdrSearchText={setOgPickupAdrSearchText}
      setOgDropoffAdrSearchText={setOgDropoffAdrSearchText}


        />


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
          Page <input type="number" value={currentPage} onChange={(e) => setCurrentPage(e.target.valueAsNumber)} className="max-w-10 border-2 border-black-2 text-center no-spinner rounded-md" /> of {totalPages}
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

export default TableTransactions;
