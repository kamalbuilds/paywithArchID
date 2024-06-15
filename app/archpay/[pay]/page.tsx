// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Buffer } from "buffer";
import { SigningArchwayClient } from "@archwayhq/arch3.js";
import BigNumber from "bignumber.js";

const REGISTRY_CONTRACT = "archway1lr8rstt40s697hqpedv2nvt27f4cuccqwvly9gnvuszxmcevrlns60xw4r";

const TestnetBlockchain = {
  chainId: "constantine-3",
  chainName: "Archway Testnet",
  rpc: "https://rpc.constantine.archway.io",
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
  blockExplorer: "https://www.mintscan.io/archway-testnet",
};

async function getClient() {
  try {
    await window.keplr.experimentalSuggestChain(TestnetBlockchain);
    await window.keplr.enable(TestnetBlockchain.chainId);
    window.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
    const signer = await window.getOfflineSignerAuto(TestnetBlockchain.chainId);
    const client = await SigningArchwayClient.connectWithSigner(TestnetBlockchain.rpc, signer);
    return client;
  } catch (error) {
    throw new Error("Failed to initialize Keplr or get client: " + error.message);
  }
}

async function resolveRecord(name) {
  if (!name) return { error: "Name is required." };

  try {
    const client = await getClient();
    const entrypoint = {
      resolve_record: {
        name: name,
      },
    };
    const query = await client.queryClient.wasm.queryContractSmart(REGISTRY_CONTRACT, entrypoint);
    return {
      address: query.address,
      resolvedRecord: query,
      error: null,
    };
  } catch (error) {
    console.error("Error resolving record:", error);
    return {
      error: error.message || "Error resolving record.",
    };
  }
}

export default function PaymentPage() {
  const [paymentData, setPaymentData] = useState(null);
  const params = useParams();
  const paymentInfo = params.pay;

  useEffect(() => {
    const initKeplr = async () => {
      if (!window.getOfflineSignerAuto || !window.keplr) {
        alert("Please install Keplr extension");
      } else {
        if (window.keplr.experimentalSuggestChain) {
          try {
            await window.keplr.experimentalSuggestChain(TestnetBlockchain);
            window.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
          } catch {
            alert("Failed to suggest the chain");
          }
        } else {
          alert("Please use the recent version of Keplr extension");
        }
      }
    };

    initKeplr();
  }, []);

  useEffect(() => {
    if (paymentInfo) {
      try {
        const decodedData = JSON.parse(Buffer.from(decodeURIComponent(paymentInfo), "base64").toString("utf-8"));
        setPaymentData(decodedData);
      } catch (error) {
        console.error("Failed to decode payment info:", error);
      }
    }
  }, [paymentInfo]);

  const handlePayment = async () => {
    if (!paymentData) {
      console.error("No payment data available.");
      return;
    }

    try {
      const client = await getClient();
      const signer = await window.getOfflineSignerAuto(TestnetBlockchain.chainId);
      const accounts = await signer.getAccounts();
      const amountValue = new BigNumber(paymentData.amount).multipliedBy(new BigNumber("1e18")).toString();
      const denom = "aconst";
      const memo = "Payment from PaywithArchID";

      const reciepientaddress = await resolveRecord(paymentData.recipientArchId);
      console.log(paymentData.recipientArchId, reciepientaddress,amountValue, denom, memo, accounts[0].address)

      const result = await client.sendTokens(accounts[0].address, reciepientaddress.address, [{ denom, amount: amountValue }], "auto", memo);
      console.log("Transaction result:", result);
      alert("Payment successful!");
    } catch (error) {
      console.error("Error sending tokens:", error);
      alert(error.message || "Transaction failed. Please try again.");
    }
  };

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Request</CardTitle>
          <CardDescription>Recipient: {paymentData.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Recipient ArchID: {paymentData.recipientArchId}</p>
          <p>Sender ArchID: {paymentData.senderArchId}</p>
          <p>Amount: {paymentData.amount}</p>
          <p>Message: {paymentData.message}</p>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={handlePayment}>
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
