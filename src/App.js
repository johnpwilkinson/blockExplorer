import { Utils } from "alchemy-sdk";
import { useEffect, useState, useContext } from "react";
import "./App.css";
import { AlchemyContext } from "./Components/Alc";
import Search from "./Components/Search";
import Stats from "./Components/Stats";
import LatestBlocks from "./Components/LatestBlocks";
import axios from "axios";
import { ReactComponent as Alc } from "./assets/alchemy-mark-white.svg";
// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {
  const [gasPrice, setGasPrice] = useState();
  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setBlocks] = useState([]);
  const [txs, setTxs] = useState([]);
  const [network, setNetwork] = useState(["ethereum", 1]);
  const [stats, setStats] = useState({});
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const alchemy = useContext(AlchemyContext);

  async function getGas() {
    let gas = await alchemy.core.getGasPrice();
    let gasGwei = Utils.formatUnits(gas, "gwei");
    setGasPrice(gasGwei);
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

  async function getBlocks() {
    let bn = await alchemy.core.getBlockNumber();
    setBlockNumber(bn);
    for (let i = bn; i > bn - 10; i--) {
      let prevBlock = await alchemy.core.getBlockWithTransactions(i);

      let hasENS = await resolveENS(prevBlock.miner);
      if (hasENS !== false) {
        prevBlock.miner = hasENS;
      }
      if (i === bn) {
        for (let i = 0; i < 10; i++) {
          setTxs((oldState) => [...oldState, prevBlock.transactions[i]]);
        }
      }
      setBlocks((oldState) => [...oldState, prevBlock]);
    }
  }
  async function getStats() {
    let geckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${network[0]}&vs_currencies=usd&include_market_cap=true`;
    let price = await axios
      .get(geckoUrl)
      .then((data) => data.data[network[0]])
      .catch((error) => console.log(error));
    setStats({
      price: price.usd,
      mcap: price.usd_market_cap,
      transactions: "1,000,000,000",
      medGasPrice: gasPrice,
      latestFinalBlock: "16927397",
      latestSafeBlock: "16927397",
    });
    setIsLoadingStats(false);
  }

  useEffect(() => {
    getGas();
    getBlocks();
    getStats();
  }, []);

  return (
    <div id="content" className="main-content">
      <div>
        <section
          className="bg-dark pt-14 pb-20"
          style={{ backgroundColor: "black" }}
        >
          <div className="container-xxl">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-9 col-lg-7 mb-5">
                <h1 className="fs-lg text-white fw-medium mb-3">
                  The Ethereum Blockchain Explorer
                </h1>
                <Search />
                <p
                  className="text-white text-opacity-75 mb-0"
                  style={{ minHeight: "22px" }}
                >
                  <a href="https://university.alchemy.com/">
                    Sponsored by Alchemy University
                  </a>
                </p>
              </div>
              <div className="col-auto mx-auto">
                <div className="d-none d-lg-flex justify-content-center mt-n4">
                  <Alc />
                </div>
              </div>
              <div className="col-auto mx-auto"></div>
            </div>
          </div>
        </section>
      </div>
      <div className="container-xxl pb-20">
        <div
          id="ContentPlaceHolder1_mainboxes"
          className="card py-5 px-4 mb-4 mt-n12"
        >
          {!isLoadingStats && <Stats stats={stats} />}
        </div>

        <div md={2} className="row gx-4">
          <div className="col-lg-6 mb-4">
            <LatestBlocks
              title={"Latest Blocks"}
              blocks={blocks}
              flag={"blocks"}
            />
          </div>
          <div className="col-lg-6">
            <div className="card">
              <LatestBlocks
                title={"Latest Transactions"}
                txs={txs}
                flag={"txs"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
