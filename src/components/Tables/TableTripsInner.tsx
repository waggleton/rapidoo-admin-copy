import React, { useState } from "react";
import ImageModal from "../Modal/ImageModal";

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

interface TableTripsInnerProps {
  currentTrips: Trips[];
  adminData: Admin[];
}

const TableTripsInner: React.FC<TableTripsInnerProps> = ({ currentTrips, adminData }) => {

  const [pickupImageModal, showPickupImageModal] = useState<number | null>(null);
  const [dropoffImageModal, showDropoffImageModal] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto max-w-[105ch] border border-black-2">
    <table className="table dark:bg-black-2 bg-white rounded-none ">
      <thead>
        <tr className="bg-gray-400 text-black-2">
          <th className="truncate whitespace-normal p-2">iTripId</th>
          <th className="truncate whitespace-normal p-2">OrderId</th>
          <th className="truncate whitespace-normal p-2">Booked By</th>
          <th className="truncate whitespace-normal p-2">Booking No</th>
          <th className="truncate whitespace-normal p-2">Address</th>
          <th className="truncate whitespace-normal p-2">CS Lat/Lng/Rider LatLng</th>
          <th className="truncate whitespace-normal p-2">Trip/Job</th>
          <th className="truncate whitespace-normal p-2">Time Request</th>
          <th className="truncate whitespace-normal p-2">Time End</th>
          <th className="truncate whitespace-normal p-2">Store</th>
          <th className="truncate whitespace-normal p-2">Provider</th>
          <th className="truncate whitespace-normal p-2">Customer</th>
          <th className="truncate whitespace-normal p-2">Fare</th>
          <th className="truncate whitespace-normal p-2">Type</th>
          <th className="truncate whitespace-normal p-2">Transaction Type</th>
          <th className="truncate whitespace-normal p-2">Proof</th>
          <th className="truncate whitespace-normal p-2">Trip Status</th>
        </tr>
      </thead>
      <tbody>
        {currentTrips.map((trips, key) => (
          <tr className="bg-gray-300 dark:bg-black-2 text-black-2 dark:text-gray-200" key={key}>
            <td className="p-2">{trips.itrip_id}</td>
            <td className="p-2">{trips.order_id}</td>
            <td className="p-2">{trips.booked_by}</td>
            <td className="p-2">{trips.booking_no}</td>
            <td className="p-2">{trips.pickup_address} - {trips.dropoff_address}</td>
            <td className="p-2">
              CS LatLng: <br />
              {trips.cs_lat}, {trips.cs_long} <br />
              <button className="btn btn-sm border border-black-2">View Reverse Geocoding</button><br />
              <br />
              Rider LatLng: <br />
              {trips.rider_lat}, {trips.rider_long}
              <button className="btn btn-sm border border-black-2 ">View Reverse Geocoding</button><br />
              <br />
              Distance: {trips.distance} KM
            </td>
            <td className="p-2">{trips.tripjob_date}</td>
            <td className="p-2">{trips.time_request}</td>
            <td className="p-2">{trips.time_end}</td>
            <td className="p-2">{trips.store}</td>
            <td className="p-2">
              {
                adminData.find(admin => admin.id === trips.provider)?.first_name + " " + 
                adminData.find(admin => admin.id === trips.provider)?.last_name || "Unknown"
              }
            </td>
            <td className="p-2">{trips.customer}</td>
            <td className="p-2">{trips.fare}</td>
            <td className="p-2">{trips.type}</td>
            <td className="p-2">{trips.transaction_type}</td>
            <td className="p-2">
              <button className="btn btn-sm border border-black-2" 
              onClick={() => showPickupImageModal(trips.index)}>View Pickup</button>

              {pickupImageModal === trips.index && <ImageModal showImageModal={showPickupImageModal} image_dir={trips.pickup_status} /> }
                <br />
              <button className="btn btn-sm border border-black-2" onClick={() => showDropoffImageModal(trips.index)}>View Dropoff</button>
              {dropoffImageModal === trips.index && <ImageModal showImageModal={showDropoffImageModal} image_dir={trips.dropoff_status} /> }
            </td>
            <td className="p-2">{trips.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableTripsInner;
