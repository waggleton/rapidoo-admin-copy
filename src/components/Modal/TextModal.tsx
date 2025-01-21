import React, { useState } from 'react';

type Props = {
  setShowTextModal: React.Dispatch<React.SetStateAction<number | null>>;
  text: string;
  is_multiple: boolean;
};

const TextModal = ({ text, is_multiple, setShowTextModal }: Props) => {
  const [showImageModal, setShowImageModal] = useState<string | null>(null);

  const extractDropoffDetails = (dropoff_details: string, multiple_dropoff: boolean) => {
    const dropoffDetails = JSON.parse(dropoff_details).dropoff;

    const description = dropoffDetails.description;
    const address = dropoffDetails.address;
    const latitude = dropoffDetails.latitude;
    const longitude = dropoffDetails.longitude;
    const isMultipleDrop = dropoffDetails.isMultipleDrop;
    const dropoff_image = dropoffDetails.dropoff_image?.replace('-accelerate', '');

    if (!multiple_dropoff) {
      return [
        {
          description,
          address,
          latitude,
          longitude,
          dropoff_image,
        },
      ];
    }

    if (multiple_dropoff) {
      const multipleDropoffs = JSON.parse(isMultipleDrop);
      return multipleDropoffs.map((dropoff: any) => ({
        id: dropoff.id,
        description: dropoff.multipleName,
        address: dropoff.multipleAddress,
        latitude: dropoff.multipleLatitude,
        longitude: dropoff.multipleLongitude,
        dropoff_image: dropoff.dropoff_image?.replace('-accelerate', ''),
      }));
    }

    return [];
  };

  const dropoffDetails = extractDropoffDetails(text, is_multiple);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 border shadow-lg rounded-md bg-white">
        <div className="absolute right-0 top-0 h-8 w-8">
          <button onClick={() => setShowTextModal(null)}>
            <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {dropoffDetails.map((dropoff: { description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; address: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; latitude: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; longitude: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; dropoff_image: any; }, index: React.Key | null | undefined) => (
            <div key={index} className="mb-4">
              <p>Description: {dropoff.description}</p>
              <p>Address: {dropoff.address}</p>
              <p>Latitude: {dropoff.latitude}</p>
              <p>Longitude: {dropoff.longitude}</p>
              <button
                className="btn btn-sm border border-black-2" 
                onClick={() => setShowImageModal(dropoff.dropoff_image || 'missing image')}
              >
                View Image
              </button>
            </div>
          ))}
        </div>
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="relative p-8 bg-white rounded-md shadow-lg">
            <div className="absolute right-0 top-0 h-8 w-8">
              <button onClick={() => setShowImageModal(null)}>
                <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
              </button>
            </div>

            {showImageModal === 'missing image' && 'missing image'}
            {showImageModal !== 'missing image' && (
              <img
                src={showImageModal}
                className="max-h-[475px] max-w-[900px]"
                alt="Dropoff"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextModal;
