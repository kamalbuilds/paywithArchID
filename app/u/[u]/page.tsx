  // @ts-nocheck
  "use client";
  import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
  import { Pagination } from "@/components/ui/pagination";
  import Link from "next/link";
  import React, { useEffect, useState } from "react";
  import { SigningArchwayClient } from "@archwayhq/arch3.js";
  import { coin as StargateCoin } from "@cosmjs/stargate";
  import { usePathname } from "next/navigation";

  const REGISTRY_CONTRACT = "archway1lr8rstt40s697hqpedv2nvt27f4cuccqwvly9gnvuszxmcevrlns60xw4r";
  const CW721_CONTRACT = "archway146htsfvftmq8fl26977w9xgdwmsptr2quuf7yyra4j0gttx32z3secq008";

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
    await globalThis.keplr.experimentalSuggestChain(TestnetBlockchain);
    await globalThis.keplr.enable(TestnetBlockchain.chainId);
    globalThis.keplr.defaultOptions = { sign: { preferNoSetFee: true } };
    const signer = await globalThis.getOfflineSignerAuto(TestnetBlockchain.chainId);
    const client = await SigningArchwayClient.connectWithSigner(TestnetBlockchain.rpc, signer);
    return client;
  }

  async function getAccounts() {
    const signer = await globalThis.getOfflineSignerAuto(TestnetBlockchain.chainId);
    const accounts = await signer.getAccounts();
    return accounts;
  }

  async function resolveRecord(name = null) {
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

  async function tokenMetadata(tokenId = null) {
    if (!tokenId) return;
    let client = await getClient();
    try {
      let entrypoint = {
        nft_info: {
          token_id: tokenId,
        },
      };
      let query = await client.queryClient.wasm.queryContractSmart(CW721_CONTRACT, entrypoint);
      return query;
    } catch (e) {
      return { error: e };
    }
  }

  function ProfilePage() {
    const pathname = usePathname();
    const [client, setClient] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [resolvedRecord, setResolvedRecord] = useState(null);
    const [tokenInfo, setTokenInfo] = useState(null);
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    useEffect(() => {
      async function fetchData() {
        const newClient = await getClient();
        setClient(newClient);
        const newAccounts = await getAccounts();
        setAccounts(newAccounts);
      }
      fetchData();
    }, []);

    useEffect(() => {
      async function resolve() {
        const result = await resolveRecord(id);
        setResolvedRecord(result);
      }
      resolve();
    }, []);

    useEffect(() => {
      async function fetchTokenMetadata() {
        const tokenData = await tokenMetadata(id);
        setTokenInfo(tokenData);
      }
      fetchTokenMetadata();
    }, []);

    function removeCircularReferences() {
      const seen = new WeakSet();
      return function (key, value) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    }

    if (!resolvedRecord || !tokenInfo || accounts.length === 0) {
      return <div>Loading...</div>;
    }
    console.log(tokenInfo)

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                  alt="User Profile"
                  className="rounded-full"
                  height={80}
                  src={tokenInfo.extension.image ? tokenInfo.extension.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : ""}
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width={80}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{tokenInfo.extension.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{tokenInfo.extension.domain}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-gray-500 dark:text-gray-400">{tokenInfo.extension.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Created:</p>
                    <p>{new Date(tokenInfo.extension.created * 1000).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Expires:</p>
                    <p>{new Date(tokenInfo.extension.expiry * 1000).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Domain:</p>
                    <p>{tokenInfo.extension.domain}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Subdomains</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Resolver</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenInfo.extension.subdomains.map((subdomain, index) => (
                  <TableRow key={index}>
                    <TableCell>{subdomain.name}</TableCell>
                    <TableCell>{subdomain.resolver}</TableCell>
                    <TableCell>{new Date(subdomain.created * 1000).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(subdomain.expires * 1000).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination />
            </div>
          </div>
          <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Accounts</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Pubkey</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell>{resolvedRecord.address}</TableCell>
                    <TableCell>{account.algo}</TableCell>
                    <TableCell>{Buffer.from(account.pubkey).toString('hex')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination />
            </div>
          </div>
          <div className="col-span-2 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Websites</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Verification Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenInfo.extension.websites.map((website, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link href={website.url}>{website.url}</Link>
                    </TableCell>
                    <TableCell>{website.domain}</TableCell>
                    <TableCell>{website.verification_hash}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default ProfilePage;
