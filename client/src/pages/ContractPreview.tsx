import React, { useState } from 'react';

const ContractPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('basic'); // Track which tab is active
  const [contractName, setContractName] = useState<string>('');
  const [contractSymbol, setContractSymbol] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Contract Preview</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200'} transition-all duration-200`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Setup
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'code' ? 'bg-blue-500 text-white' : 'bg-gray-200'} transition-all duration-200`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'} transition-all duration-200`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      {/* Content Box */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {/* Basic Setup */}
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Basic Setup</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="contractName" className="block font-medium">
                  Contract Name
                </label>
                <input
                  type="text"
                  id="contractName"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Contract Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="contractSymbol" className="block font-medium">
                  Symbol
                </label>
                <input
                  type="text"
                  id="contractSymbol"
                  value={contractSymbol}
                  onChange={(e) => setContractSymbol(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Contract Symbol"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Smart Contract Code</h2>
            <div className="bg-gray-100 p-4 rounded-lg border">
              <pre className="text-sm text-gray-700">
                {`// Solidity Contract Example 
pragma solidity ^0.8.0;

contract ExampleToken {
    string public name = "${contractName}";
    string public symbol = "${contractSymbol}";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    // Example code for contract...
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contract Preview</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <p className="text-lg font-semibold">Contract Name: {contractName || 'N/A'}</p>
                <p className="text-lg font-semibold">Symbol: {contractSymbol || 'N/A'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-blue-100 rounded-lg text-center shadow">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-gray-600">Mints</p>
                </div>
                <div className="p-4 bg-red-100 rounded-lg text-center shadow">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-gray-600">Burns</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deploy Button */}
      <button
        className="mt-10 px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all duration-300"
        onClick={() => alert('Contract Deployed!')}
      >
        Deploy
      </button>
    </div>
  );
};

export default ContractPreview;
