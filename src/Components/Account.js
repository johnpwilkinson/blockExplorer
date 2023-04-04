import TxnTable from './TxnTable';
import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from 'react';
import {AlchemyContext} from './Alc';
import { Utils } from 'alchemy-sdk';
import TokenDropDown from './TokenDropDown';
import  axios from 'axios';


function Account(props) {
  let { addy } = useParams();
  const [address, setAddress] = useState(addy);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [tokenLogo, setTokenLogo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ethPrice, setEthPrice] = useState("");
  const alchemy = useContext(AlchemyContext);

  async function getBalance(addr) {
    let response = await alchemy.core.getBalance(addr, "latest");
    let geckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true`;
    let price = await axios
      .get(geckoUrl)
      .then((data) => data.data.ethereum.usd)
      .catch((error) => console.log(error));
    setEthPrice(price);
    setBalance(Utils.formatEther(response._hex));
    setAddress(addy);
  }

  async function getTokens(addr) {
    let balances = await alchemy.core.getTokenBalances(addr);
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return (
        token.tokenBalance !==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
    });
    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );
      let geckoUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${token.contractAddress}`;
      let price = await axios
        .get(geckoUrl)
        .then((data) => data.data.market_data.current_price.usd)
        .catch((error) => console.log(error));
      if (typeof price === "undefined") {
        price = 0;
      }
      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      // Print name, balance, and symbol of token
      let myToken = {
        name: metadata.name,
        balance: balance,
        symbol: metadata.symbol,
        logo: metadata.logo,
        address: token.contractAddress,
        price: price,
      };
      setTokens((oldState) => [...oldState, myToken]);
    }
  }

  async function resolveENS(addr) {
    const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    const nfts = await alchemy.nft.getNftsForOwner(addr, {
      contractAddresses: [ensContractAddress],
    });
    if (nfts.totalCount === 0) {
      return false;
    } else {
      return nfts.ownedNfts[0].rawMetadata.name;
    }
  }

  async function getTransfers(addr) {
    let transfersFrom = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: addr,
      //toAddress: addr,
      excludeZeroValue: false,
      category: ["erc20"],
      order: "desc",
      withMetadata: true,
    });

    let transfersTo = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      //  fromAddress: addr,
      toAddress: addr,
      excludeZeroValue: false,
      category: ["erc20"],
      order: "desc",
      withMetadata: true,
    });

    let allTransfers = Array.from(
      [...transfersFrom.transfers, ...transfersTo.transfers]
        .reduce((m, o) => m.set(o.uniqueId, o), new Map())
        .values()
    );
    setTransfers(allTransfers);
    setIsLoading(false);
  }

  useEffect(() => {
    getBalance(address);
    getTransfers(address);
    getTokens(address);
  }, [address]);

  if (isLoading) {
    return (
      <main id="content" className="main-content" role="main">
        <section className="container-xxl">Loading</section>
      </main>
    );
  }
  return (
    <main id="content" className="main-content" role="main">
      <input
        type="hidden"
        name="hdnAgeText"
        id="hdnAgeText"
        value="Age"
      ></input>
      <input
        type="hidden"
        name="hdnDateTimeText"
        id="hdnDateTimeText"
        value="Date Time (UTC)"
      ></input>
      <input
        type="hidden"
        name="hdnAgeTitle"
        id="hdnAgeTitle"
        value="Click to show Age Format"
      ></input>
      <input
        type="hidden"
        name="hdnDateTimeTitle"
        id="hdnDateTimeTitle"
        value="Click to show Datetime Format"
      ></input>
      <input
        type="hidden"
        name="hdnTxnText"
        id="hdnTxnText"
        value="Txn Fee"
      ></input>
      <input
        type="hidden"
        name="hdnGasPriceText"
        id="hdnGasPriceText"
        value="Gas Price"
      ></input>
      <input
        type="hidden"
        name="hdnTxnFeeTitle"
        id="hdnTxnFeeTitle"
        value="(Gas Price * Gas Used by Txns) in Ether"
      ></input>
      <input
        type="hidden"
        name="hdnGasPriceTitle"
        id="hdnGasPriceTitle"
        value="Gas Price in Gwei"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnAddress"
        type="hidden"
        id="hdnAddress"
        value="0x4E609a968abeaaF866fde46a400847A9462F5931"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnEnsText"
        type="hidden"
        id="hdnEnsText"
        value="j0xhn.eth"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnIsEnsContainUnicodeChars"
        type="hidden"
        id="hdnIsEnsContainUnicodeChars"
        value="false"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnIsEnsContainZeroWidthChars"
        type="hidden"
        id="hdnIsEnsContainZeroWidthChars"
        value="false"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnIsUDContainUnicodeChars"
        type="hidden"
        id="hdnIsUDContainUnicodeChars"
      ></input>
      <input
        name="ctl00$ContentPlaceHolder1$hdnIsUDContainZeroWidthChars"
        type="hidden"
        id="hdnIsUDContainZeroWidthChars"
      ></input>

      <section className="container-xxl">
        <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom gap-3 py-5">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-wrap text-break align-items-center gap-2">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <div className="d-flex align-items-center gap-2 mt-n0.5">
                  <img
                    id="icon"
                    width="24"
                    className="rounded-circle"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA4FJREFUeF7t3bFxE1EURuEVEXUQugmGhEaIGHKKoAEixn2QELsHCiHCjGnhC35r3nF+9bT/PXve1e5Kvr17/+b56u/YBG4BcGzv/x94AJzd/wA4vP8BEAANgUcz0AxwdPsbAg9vfwAEQNcBzmagGeDs/vcx8PD+B0AAdB3gaAaaAY5ufx8DD2//dd0enh7v+nmAP18/TZv49tuP6fq6eABgggGAAWp5BrAEM4Dld2UADFDLM4AlmAEsvwyA+XF5BrAIM4DllwEwPy7PABZhBrD8MgDmx+UZwCLMAJZfBsD8uDwDWIQZwPLLAJgfl2cAizADWH73bwB9LFxvhugZrOtj/6/1+9f1+ZEwbYAegK4fAPhQqDYgAOyJIs0vA6ACtAHrEygAAsB+JGpNsK6P/W8I1AasFRoADYHEwBpgXb8ZgNp/tQW0BdgXU9b5ZYAM0KcAYUD34AyA3+3TAKX5L7UBgF+OXAcYAH0MJAbWAOv6DYHU/rYAjO/iByr0DNAD0Blk/f7ZAKcHGABIwL0HeO/vPwMcDnAABIBdCcT8GgLxQpjmnwEwwWaAwwMMgACgBLoOML6XQN277v9CVjMAEtAWcHiAARAAlEAzQDMAAaTFzQCYYFvA4QEeD8C9B4D8cvk6P94C1gfAHRi/wDq/AAgAuxu4JnjcP15+nV8G4BbaCwTA+H64tc+rAyAAiCK9ktgWQPF7cQbIAERRBqD49sUZIAMQhRmA4tsXZ4AMQBRmAIpvX5wBMgBRmAEovn1xBsgARGEGoPj2xRkgAxCFGYDi2xdngAxAFGYAim9fnAEyAFGYASi+fXEGyABEYQag+PbFGSADEIUZgOLbF2eADEAUZgCKb1+cATIAUZgBKL598dwAv/9+eZYYPn74LuX8U7G0+Cso1jP456/PdBS3AKD8uDgA8EeiuAPjFwiAACAE2wIovn1xBsgARGEGoPj2xRkgAxCFGYDi2xdngAxAFGYAim9fnAEyAFGYASi+fXEGyABEYQag+PbFGSADEIVsgIenR3oeQAlePxBB6b+Cfxun+d0CwBDQBqxPoACw/vMTTQGAM4AGiP0PAG3AWqEB0BBIDKwB1vWbAaj9+38eHQDjL5ZoA9ZbaAbIAF0IEgYyACp4HaA0/6V2/f51/bYAJEAb0AzQhSBCUAHMABR/W8C1Vpiuj/1vBtAGqMJ0/dMB+AcwS8WujvxMLgAAAABJRU5ErkJggg=="
                    alt=""
                  ></img>
                  <h1 className="h5 mb-0">Address</h1>
                </div>
              </div>
              <div>
                <span className="me-3 fs-base" style={{ lineHeight: "2" }}>
                  <span id="mainaddress">{address}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="overlayMain" className="bg-white bg-opacity-40"></div>

      <section
        id="ContentPlaceHolder1_divSummary"
        className="container-xxl pt-2 pb-12"
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-2">
          <div className="d-flex flex-wrap align-items-center gap-1">
            <div
              id="ContentPlaceHolder1_divLabels"
              className="d-flex gap-1"
            ></div>
          </div>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column gap-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <h3 className="h6 mb-0">Overview</h3>
                </div>
                <div>
                  <h4 className="text-cap mb-1">ETH Balance</h4>
                  <div>
                    <div>
                      <i className="fab fa-ethereum me-1 text-muted"></i>
                      {balance}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-cap mb-1">Eth Value</h4>
                  {parseInt(ethPrice) > 0 && (
                    <div>
                      {(ethPrice * balance).toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                      })}{" "}
                      <span
                        className="small"
                        style={{ position: "relative", top: "-1px" }}
                      >
                        (@ {ethPrice}/ETH)
                      </span>
                    </div>
                  )}
                </div>
                <div id="ContentPlaceHolder1_divTokenHolding">
                  <h4 className="text-cap mb-1">Token Holdings</h4>
                  <div
                    id="ContentPlaceHolder1_tokenbalance"
                    className="d-flex gap-2 ms-auto"
                  >
                    <TokenDropDown
                      tokens={tokens}
                      className="dropdown-toggle js-dropdowns-input-focus btn btn-white text-start w-100 dropdown-toggle py-2 px-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column gap-5">
                <h3 className="h6 mb-0">More Info</h3>
                {!isLoading && (
                  <div>
                    <div>
                      <h4 className="text-cap mb-1 mt-1">Last Txn Sent</h4>
                      <div className="d-flex align-items-center gap-1">
                        <a
                          className="hash-tag text-truncate"
                          style={{ maxWidth: "8rem" }}
                          href={`/tx/${
                            transfers[transfers.length - 1]["hash"]
                          }`}
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                        >
                          {transfers[transfers.length - 1]["hash"]}
                        </a>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-cap mb-1">First Txn Sent</h4>
                      <div className="d-flex align-items-center gap-1">
                        <a
                          className="hash-tag text-truncate"
                          style={{ maxWidth: "8rem" }}
                          href={`/tx/{${transfers[0]["hash"]}}`}
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                        >
                          {transfers[0]["hash"]}
                        </a>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column gap-5">
                <h3 className="h6 mb-0">Multi Chain</h3>
                <div id="ContentPlaceHolder1_divMultichainAddress">
                  <h4 className="text-cap mb-1">Multichain Addresses</h4>

                  <a
                    className="d-flex align-items-center gap-2"
                    href={`https://blockscan.com/address/${address}`}
                    target="_blank"
                  >
                    <span
                      className="text-truncate"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                    >
                      11 addresses found via Blockscan
                    </span>
                    <i className="far fa-arrow-up-right-from-square text-secondary"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul
          className="nav nav-pills text-nowrap snap-x-mandatory overflow-x-auto flex-nowrap scrollbar-custom pt-4 pb-3 gap-2 nav_tabs1"
          id="nav_tabs"
          role="tablist"
        >
          <li
            id="ContentPlaceHolder1_li_transactions"
            className="nav-item snap-align-start"
            role="presentation"
          >
              Transactions         
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <input type="hidden" id="hdnErc20" value="Date Time (UTC)"></input>
          <div className="card">
            <div id="divDataInfo" className="card-body">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="divTokenStatus">
                  <p className="mb-0">
                    <i
                      className="far fa-sort-amount-down"
                      data-bs-toggle="tooltip"
                      aria-label="Oldest First"
                    ></i>
                    &nbsp;Latest 25 from a total of{" "}
                    <a
                      href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                    >
                      1,070
                    </a>{" "}
                    transactions
                  </p>
                </div>

                {/* <div className="d-flex gap-2 flex-wrap">
                        <div className="dropdown"><button className="btn btn-sm btn-white dropdown-toggle d-block" type="button" id="dropdownTxnMore" data-bs-toggle="dropdown" aria-expanded="false"><i className="far fa-filter text-muted me-1"></i></button><ul className="dropdown-menu dropdown-menu-sm-end" aria-labelledby="dropdownTxnMore" style={{minWidth: "10rem"}}><li><a className="dropdown-item" href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931"><i className="fa fa-circle fa-fw dropdown-item-icon me-1"></i> View Completed Txns</a></li><li><a className="dropdown-item" href="/txsPending?a=0x4E609a968abeaaF866fde46a400847A9462F5931&amp;m=hf"><i className="far fa-circle fa-fw dropdown-item-icon me-1"></i> View Pending Txns</a></li><li><a className="dropdown-item" href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931&amp;f=1"><i className="far fa-exclamation-circle fa-fw dropdown-item-icon me-1"></i> View Failed Txns</a></li><li><hr className="dropdown-divider"></hr></li><li><a className="dropdown-item" href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931&amp;f=2"><i className="fa fa-long-arrow-alt-right fa-fw dropdown-item-icon me-1"></i> View Outgoing Txns</a></li><li><a className="dropdown-item" href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931&amp;f=3"><i className="fas fa-long-arrow-alt-left fa-fw dropdown-item-icon me-1"></i> View Incoming Txns</a></li><li><a className="dropdown-item" href="/txs?a=0x4E609a968abeaaF866fde46a400847A9462F5931&amp;f=5"><i className="fas fa-newspaper fa-fw dropdown-item-icon me-1"></i> View Contract Creation</a></li></ul></div>
                        </div> */}
              </div>
            </div>

            {!isLoading && (
              <TxnTable
                transfers={transfers}
                setAddress={setAddress}
                tokenLogo={tokenLogo}
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="d-flex align-items-baseline fs-sm text-muted gap-1 mb-3">
            <i className="far fa-lightbulb-on"></i>
            <span>
              A wallet address is a publicly available address that allows its
              owner to receive funds from another party. To access the funds in
              an address, you must have its private key. Learn more about
              addresses in our{" "}
              <a
                target="_blank"
                href="https://info.etherscan.com/what-is-an-ethereum-address/"
              >
                Knowledge Base
              </a>
              .
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Account
// <AccountCard title={"Overview"} value={[['ETH Balance', balance], ['ETH Value', ], 'Token Holdings']} />
