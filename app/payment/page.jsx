"use client"
import React, { useState } from "react";
import { SigningArchwayClient } from "@archwayhq/arch3.js";

const REGISTRY_CONTRACT = "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0";

const Blockchain = {
  chainId: "archway-1",
  chainName: "Archway",
  rpc: "https://rpc.mainnet.archway.io",
  stakeCurrency: { coinDenom: "ARCH", coinMinimalDenom: "aarch", coinDecimals: 6 },
  bech32Config: {
    bech32PrefixAccAddr: "archway",
    bech32PrefixAccPub: "archwaypub",
    bech32PrefixValAddr: "archwayvaloper",
    bech32PrefixValPub: "archwayvaloperpub",
    bech32PrefixConsAddr: "archwayvalcons",
    bech32PrefixConsPub: "archwayvalconspub",
  },
  currencies: [{ coinDenom: "ARCH", coinMinimalDenom: "aarch", coinDecimals: 18 }],
  feeCurrencies: [
    {
      coinDenom: "ARCH",
      coinMinimalDenom: "aarch",
      coinDecimals: 18,
      gasPriceStep: { low: 0, average: 0.1, high: 0.2 },
    },
  ],
  features: ["cosmwasm"],
};

async function getClient() {
  await globalThis.keplr.experimentalSuggestChain(Blockchain);
  await globalThis.keplr.enable(Blockchain.chainId);
  globalThis.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
  const signer = await globalThis.getOfflineSignerAuto(Blockchain.chainId);
  const client = await SigningArchwayClient.connectWithSigner(Blockchain.rpc, signer);
  return client;
}

async function resolveRecord(name) {
  if (!name) return { error: "Name is required." };

  try {
    let client = await getClient();
    let entrypoint = {
      resolve_record: {
        name: name,
      },
    };
    let query = await client.queryClient.wasm.queryContractSmart(REGISTRY_CONTRACT, entrypoint);
    return {
      address: query.address,
      resolvedRecord: query,
      error: null, // Ensure error is null if no error occurred
    };
  } catch (error) {
    console.error("Error resolving record:", error);
    return {
      error: error.message || "Error resolving record.",
    };
  }
}

function ProfilePage() {
  const [name, setName] = useState("");
  const [resolvedRecord, setResolvedRecord] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    const result = await resolveRecord(name);
    setResolvedRecord(result);
  };

  const handlePayDirectly = async () => {
    if (resolvedRecord && resolvedRecord.address) {
      try {
        const client = await getClient();   
        const signer = await globalThis.getOfflineSignerAuto(Blockchain.chainId);
        const amount = "1000000"; // Example amount (adjust as needed)
        const denom = "aarch"; // Token denomination (ARCH in this case)
        const memo = "Payment from React App"; // Memo for the transaction
        const address1 = "archway168vtarpntv99ca6cf4edaes5wmgw5haymszmmm"

        const result = await client.sendTokens(signer, address1, amount, denom, memo);
        console.log("Transaction result:", result);

        // Handle success message
        setMessage("Transaction successful!");
      } catch (error) {
        console.error("Error sending tokens:", error);

        // Handle failure message
        setMessage(error.message || "Transaction failed. Please try again.");
      }
    } else {
      setMessage("Please resolve a record before attempting to pay.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Search Wallet Address</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter ID (e.g., kamal.arch)"
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded transition duration-300"
        >
          Search
        </button>
        {resolvedRecord && (
          <div className="mt-6">
            {resolvedRecord.error ? (
              <p className="text-red-500">Error: {resolvedRecord.error}</p>
            ) : (
              <>
                <p className="text-gray-500 dark:text-gray-400">Address: {resolvedRecord.address}</p>
                <button
                  onClick={handlePayDirectly}
                  className="mt-4 bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded transition duration-300"
                >
                  Pay Directly
                </button>
                {message && (
                  <p className="mt-2 text-sm text-gray-500">{message}</p>
                )}
              </>
            )}
          </div>    
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
