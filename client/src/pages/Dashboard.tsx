import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContractInfo {
  id: string;
  name: string;
  symbol: string;
  description: string;
}

interface BoxProps {
  contract: ContractInfo;
}

const Box: React.FC<BoxProps> = ({ contract }) => (
  <div className="bg-blue-100 p-6 m-4 rounded-lg shadow-md w-80 h-64 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold mb-2 text-blue-800">{contract.name}</h2>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">ID:</span> {contract.id}</p>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Symbol:</span> {contract.symbol}</p>
    </div>
    <p className="text-sm text-gray-700 overflow-auto flex-grow">{contract.description}</p>
  </div>
);

interface BoxesProps {
  contracts: ContractInfo[];
}

const Boxes: React.FC<BoxesProps> = ({ contracts }) => (
  <div className="flex flex-wrap justify-center">
    {contracts.map((contract) => (
      <Box key={contract.id} contract={contract} />
    ))}
  </div>
);

// Example usage


const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Overview');
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };
  const contractsData: ContractInfo[] = [
    {
      id: "CT001",
      name: "Ethereum",
      symbol: "ETH",
      description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform."
    },
    {
      id: "CT002",
      name: "Bitcoin",
      symbol: "BTC",
      description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without intermediaries."
    },
    {
      id: "CT003",
      name: "Cardano",
      symbol: "ADA",
      description: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake."
    },
    {
      id: "CT003",
      name: "Cardano",
      symbol: "ADA",
      description: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake."
    }
  ];

  const DeployData: ContractInfo[] = [
    {
      id: "CT001",
      name: "Ethereum",
      symbol: "ETH",
      description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform."
    },
    {
      id: "CT002",
      name: "Bitcoin",
      symbol: "BTC",
      description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without intermediaries."
    },
    {
      id: "CT003",
      name: "Cardano",
      symbol: "ADA",
      description: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake."
    },
    {
      id: "CT003",
      name: "Cardano",
      symbol: "ADA",
      description: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake."
    }
  ];

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="h-16 flex items-center justify-center font-bold text-2xl bg-gray-900">
          Dashboard
        </div>
        <nav className="mt-10">
          <ul>
            {['Overview', 'Smart Contracts', 'Deploy', 'Analytics'].map((item) => (
              <li
                key={item}
                className={`px-6 py-3 cursor-pointer hover:bg-gray-700 ${
                  activePage === item ? 'bg-gray-700' : ''
                }`}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">{activePage}</h1>

          {/* Overview Page Content */}
          {activePage === 'Overview' && (
            <div>
              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Total Contracts</h2>
                  <p className="mt-4 text-3xl">12</p>
                </div>
                <div className="p-6 bg-green-500 text-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Active Deployments</h2>
                  <p className="mt-4 text-3xl">5</p>
                </div>
                <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">Pending Deployments</h2>
                  <p className="mt-4 text-3xl">3</p>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                <ul className="space-y-4">
                  <li className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="font-semibold">Contract #A12345 deployed successfully.</p>
                    <p className="text-gray-600">2 hours ago</p>
                  </li>
                  <li className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="font-semibold">Contract #B67890 scheduled for deployment.</p>
                    <p className="text-gray-600">1 day ago</p>
                  </li>
                  <li className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="font-semibold">Contract #C12345 failed deployment.</p>
                    <p className="text-gray-600">2 days ago</p>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300" onClick={() => navigate('/contract-config')}>
                  Create New Contract
                </button>
              </div>
            </div>
          )}
          {
            activePage == 'Smart Contracts'&& (
              <div className="container mx-auto p-4">
             
              <Boxes contracts={contractsData} />
            </div>
            )
          }
          {
            activePage == 'Deploy'&& (
              <div className="container mx-auto p-4">
             
              <Boxes contracts={DeployData} />
            </div>
            )
          }

          {/* Placeholder content for other pages */}
          {activePage == 'Analytics' && (
            <p className="text-gray-600">This is the {activePage} page.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
