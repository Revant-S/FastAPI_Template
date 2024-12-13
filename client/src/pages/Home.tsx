import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home: React.FC = () => {
  const [account, setAccount] = useState<string>();
  const [total, setTotal ] = useState(0);
  const [active, setactive] = useState(0)
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const navigate = useNavigate()

  const connect = async () => {
    console.log('here')
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      
      console.log(accounts)
      navigate('/dashboard')

    } catch (err) {
        
      console.warn("failed to connect..", err);
    }
  };

  axios.post("http://127.0.0.1:8000",account).then((response:any) => {
    console.log(response.data); // Posts by user with ID 1
  })
  .catch((error: any) => {
    console.error('Error fetching data:', error);
  });
    

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            No-Code Smart Contracts
          </h1>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-500">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-500">
              About
            </a>
            <a className="text-gray-600 hover:text-blue-500 hover:cursor-pointer" onClick={connect}>
              Connect to Wallet
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Build Smart Contracts Without Writing Code
          </h2>
          <p className="mt-4 text-lg">
            Our platform empowers anyone to create blockchain-based smart contracts without technical knowledge.
            No programming skills required.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-blue-500 rounded-full shadow-md font-semibold hover:bg-gray-200 transition-all duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold">No Coding Required</h4>
              <p className="mt-4 text-gray-600">
                Use our drag-and-drop interface to create smart contracts with ease.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold">Blockchain Security</h4>
              <p className="mt-4 text-gray-600">
                Deploy contracts to a secure and decentralized blockchain network.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold">Secure and Reliable</h4>
              <p className="mt-4 text-gray-600">
              Built-in security features to ensure your smart contracts are safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
