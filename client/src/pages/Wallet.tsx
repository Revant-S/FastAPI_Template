import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

 export const Wallet = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    console.log('here')
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      
      console.log(accounts)
    } catch (err) {
        
      console.warn("failed to connect..", err);
    }
  };
  return (
    <div className="App">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};