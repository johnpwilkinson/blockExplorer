import { ethers } from "ethers";

export const stats = [
  {
    header: "Ether Price",
    value: "$1,700",
  },
  {
    header: "Transactions",
    value: "1,000,000,000",
  },
  {
    header: "Med Gas Price",
    value: "24 Gwei",
  },
  {
    header: "Market Cap",
    value: "$209,183,865,093.00",
  },
  {
    header: "Latest Final Block",
    value: "16927397",
  },
  {
    header: "Latest Safe Block",
    value: "16927397",
  },
];

export const blocks = [
  {
    blockNum: 19874562,
    recepient: "me",
    numTx: 198,
    fees: 0.01,
  },
  {
    blockNum: 19874562,
    recepient: "me",
    numTx: 198,
    fees: 0.01,
  },
  {
    blockNum: 19874562,
    recepient: "me",
    numTx: 198,
    fees: 0.01,
  },
  {
    blockNum: 19874562,
    recepient: "me",
    numTx: 198,
    fees: 0.01,
  },
  {
    blockNum: 19874562,
    recepient: "me",
    numTx: 198,
    fees: 0.01,
  },
];

export const accountButtons = [
  "Transactions",
  "Internal Transactions",
  "Token Transfers (ERC-20)",
  "NFT Transfers",
  "Analytics",
  "Comments",
];

export function truncateHex(hex) {
  if (typeof hex === "undefined") {
    return hex;
  }
  if (hex.startsWith("0x")) {
    return `${hex.slice(0, 4)}...${hex.slice(-4)}`;
  } else {
    return hex;
  }
}

export function formatIso(dateString, verbose) {
  const optionsLong = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const optionsShort = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  let options = verbose ? optionsLong : optionsShort;
  return new Date(dateString).toLocaleDateString("UTC", options);
}

export function timeSince(ts) {
  return Math.floor(Date.now() / 1000 - ts);
}

export function timeDelta(ts1, ts2) {
  let diff = Math.abs(ts1 - ts2);
  let secInMs = 1000;
  let minsInMs = 60 * secInMs;
  let hoursInMs = 60 * minsInMs;
  let daysInMs = 24 * hoursInMs;
  let days;
  let hours;
  let mins;
  let seconds;
  let result = "";
  if (diff > daysInMs) {
    days = Math.floor(diff / daysInMs);
    diff -= days * daysInMs;
    result += `${days} days`;
  }
  if (diff > hoursInMs) {
    hours = Math.floor(diff / hoursInMs);
    diff -= hours * hoursInMs;
    result += ` ${hours} hours`;
  }
  if (diff > minsInMs) {
    mins = Math.floor(diff / minsInMs);
    diff -= mins * minsInMs;
    result += ` ${mins} minutes`;
  }
  if (diff > secInMs) {
    seconds = Math.floor(diff / secInMs);
    diff -= diff * secInMs;
    result += ` ${seconds} seconds`;
  }
  result += " ago";
  return result;
}

export async function resolveENS(addr, alchemy) {
  const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
  const nfts = await alchemy.nft.getNftsForOwner(addr, {
    contractAddresses: [ensContractAddress],
  });
  if (nfts.totalCount === 0) {
    return addr;
  } else {
    return nfts.ownedNfts[0].rawMetadata.name;
  }
}

export function computeFees(effectiveGasPrice, gasUsed) {
  return ethers.utils.formatUnits(
    effectiveGasPrice.mul(gasUsed).toString(),
    "ether"
  );
}
