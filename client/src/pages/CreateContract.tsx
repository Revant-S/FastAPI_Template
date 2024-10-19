import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContract: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');


  const navigate = useNavigate();

  const availableFeatures = ['Token Minting', 'NFT Support', 'Staking', 'Voting', 'Ownership Transfer'];
  const availableDomains = ['Documents, Voting', 'Parcels, Shipping', 'Packages, Products','Housing, Hospitability','Files','Processes']
  const handleDrop = (feature: string) => {
    if (!selectedFeatures.includes(feature)) {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Create Your Smart Contract</h1>
      <div className='flex flex-row gap-16'> 
      <div className="flex flex-col items-center mb-10">
      <h2 className="text-2xl font-semibold mb-4">Select Domain</h2>
      <div className="w-64 max-h-[308px] overflow-y-scroll scrollbar-thin  p-4 bg-white shadow rounded-lg">
      
            <h3 className="text-xl font-bold mb-4">Available Domains</h3>
            <div className="space-y-2">
              {availableDomains.map((feature) => (
                <div key={feature} className="flex items-center">
                <input
                type="checkbox"
                id={`option-${feature}`}
                checked={selectedDomain === feature}
                onChange={() => setSelectedDomain(feature)}
                className='width'
               
            
              />
               <label
              htmlFor={`option-${feature}`}
              className={'flex items-center p-2 border rounded cursor-pointer w-60'}
            >
              
              {feature}
            </label>
              
              
               </div>
              ))}
            </div>
          </div>
          </div>
      {/* Drag and Drop Feature Selection */}
      <div className="flex flex-col items-center mb-10">
        
        <h2 className="text-2xl font-semibold mb-4">Select Features</h2>
        <div className="flex space-x-4">
          {/* Available Features */}
          <div className="w-64 p-4 bg-white shadow rounded-lg overflow-y-scroll scrollbar-thin">
            <h3 className="text-xl font-bold mb-4">Available Features</h3>
            <ul className="space-y-2">
              {availableFeatures.map((feature) => (
                <li
                  key={feature}
                  className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('feature', feature)}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Drop Area */}
          <div
            className="w-64 h-84 p-4 bg-white shadow rounded-lg flex flex-col items-center justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e.dataTransfer.getData('feature'))}
          >
            {selectedFeatures.length === 0 ? (
              <p className="text-gray-500">Drag and drop features here</p>
            ) : (
              <ul className="space-y-2 w-full">
                {selectedFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition"
                    onClick={() => handleRemoveFeature(feature)}
                  >
                    {feature} <span className="text-sm">(Click to remove)</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Generative AI Input */}
      <div className="w-full max-w-lg mb-10">
        <input
          type="text"
          placeholder="Enter additional feature/detail"
          className="w-full p-4 text-lg text-sky-400 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          
        />
      </div>

      {/* Next Button */}
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
        onClick={() => navigate('/contract-preview')} // Replace with actual path
      >
        Next
      </button>
    </div>
  );
};

export default CreateContract;
