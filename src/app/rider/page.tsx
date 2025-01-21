// Use 'use client' directive for the client component
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableRider from "@/components/Tables/TableRider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchAdminData } from "@/components/Api/admin";


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

const CustomerPage = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]);; // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData(setAdminData, setLoading); // Use the imported function
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Riders" />

      <div className="max-h-screen">
        <TableRider initialAdminData={adminData} />
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
