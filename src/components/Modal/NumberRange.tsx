import React from 'react'

type Props = {
  setShowNumberRangeModal: React.Dispatch<React.SetStateAction<string>>;
  startingNumber: number | undefined;
  endingNumber: number | undefined;
  setStartingNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  setEndingNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const NumberRangeModal = ({setShowNumberRangeModal, startingNumber, endingNumber, setStartingNumber, setEndingNumber}: Props) => {
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
        <div className="relative p-8 border shadow-lg rounded-md bg-white">
        <div className="absolute right-0 top-0 h-8 w-8">

        <button onClick={() => setShowNumberRangeModal("")} >
              <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
            </button>
            </div>
            
            <div>
              <span>              
                <input
                type="number"
                placeholder="Starting Number"
                value={startingNumber}
                onChange={(e) => setStartingNumber(e.target.valueAsNumber)}
                className="p-4 m-1 w-50 h-12 rounded-md border-2 border-black-2"
              />
              -
              <input
                type="number"
                placeholder="Ending Number"
                value={endingNumber}
                onChange={(e) => setEndingNumber(e.target.valueAsNumber)}
                className="p-4 m-1 w-50 h-12 rounded-md border-2 border-black-2"
              /></span>
            </div>

          </div>
        </div>
  )
}

export default NumberRangeModal