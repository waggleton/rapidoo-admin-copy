// Use 'use client' directive for the client component
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCustomer from "@/components/Tables/TableCustomer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchAdminData } from "@/components/Api/admin";


const CustomerPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer" />

      <div className="max-h-screen">
        <TableCustomer />
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
