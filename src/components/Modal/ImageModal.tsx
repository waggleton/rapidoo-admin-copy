import React from 'react'

type Props = {
  showImageModal: React.Dispatch<React.SetStateAction<number | null>>;
  image_dir: string;
}

const ImageModal = ({showImageModal,image_dir}: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
        <div className="relative p-8 border shadow-lg rounded-md bg-white">
        <div className="absolute right-0 top-0 h-8 w-8">
            
            <button onClick={() => showImageModal(null)} >
                    <img src="/images/icon/cross-svgrepo-com.svg" alt="Close" />
            </button>
            </div>

          {image_dir === 'missing image' && "missing image" }
          {image_dir !== 'missing image' &&<img src={image_dir} className='max-h-[475px] max-w-[900px]'/>}
          
          </div>
        </div>
  )
}

export default ImageModal