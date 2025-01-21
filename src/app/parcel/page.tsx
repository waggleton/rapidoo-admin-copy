import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableTransactions from '@/components/Tables/TableTransactions'
import React from 'react'

const ParcelPage = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Parcel Transactions" />

    <div className="max-h-max pb-17">
      <TableTransactions />
    </div>
  </DefaultLayout>
  )
}

export default ParcelPage