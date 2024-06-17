"use client";
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
  if (!name) return;
  let client = await getClient();
  try {
    let entrypoint = {
      resolve_record: {
        name: name,
      },
    };
    let query = await client.queryClient.wasm.queryContractSmart(REGISTRY_CONTRACT, entrypoint);
    return query;
  } catch (e) {
    return { error: e };
  }
}

function ProfilePage() {
  const [name, setName] = useState("");
  const [resolvedRecord, setResolvedRecord] = useState(null);

  const handleSearch = async () => {
    const result = await resolveRecord(name);
    setResolvedRecord(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className=" rounded-lg shadow-lg p-6">
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
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 border-4 border-indigo-500/100"
        >
          Search
        </button>
        {resolvedRecord && (
          <div className="mt-6">
            {resolvedRecord.error ? (
              <p className="text-red-500">Error: {resolvedRecord.error.message}</p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Address: {resolvedRecord.address}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
