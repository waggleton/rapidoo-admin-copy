import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTrips from "@/components/Tables/TableTripsOuter";

const TripsPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Trips" />

      <div className="max-h-max pb-17">
        <TableTrips />
      </div>
    </DefaultLayout>
  );
};

export default TripsPage;
