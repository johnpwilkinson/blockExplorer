import { formatIso, timeDelta } from "../utils/helpers";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AlchemyContext } from "./Alc";
import { fromHex, toHex } from "alchemy-sdk";
import { ethers } from "ethers";

function Block(props) {
  let { block } = useParams();
  const alchemy = useContext(AlchemyContext);
  const [blockData, setBlockData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  async function getBlock(block) {
    let response = await alchemy.core.getBlockWithTransactions(block);
    response.miner = await resolveENS(response.miner);
    response.gasUsed = fromHex(response.gasUsed);
    response.gasLimit = fromHex(response.gasLimit);
    response.baseFeePerGas = fromHex(response.baseFeePerGas);
    setBlockData(response);
    setIsLoaded(true);
  }

  async function resolveENS(addr) {
    const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    const nfts = await alchemy.nft.getNftsForOwner(addr, {
      contractAddresses: [ensContractAddress],
    });
    if (nfts.ownedNfts.length === 0) {
      return addr;
    } else {
      return nfts.ownedNfts[0].rawMetadata.name;
    }
  }

  useEffect(() => {
    getBlock(toHex(block));
  }, []);
  if (!isLoaded) {
    return <div>loading</div>;
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

      <section className="container-xxl pt-2 pb-12">
        <ul
          className="nav nav-pills text-nowrap snap-x-mandatory overflow-x-auto flex-nowrap py-3 gap-2 nav_tabs1"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item snap-align-start" role="presentation">
            Overview
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="overview"
            role="tabpanel"
            aria-labelledby="overview-tab"
            tabindex="0"
          >
            <div id="ContentPlaceHolder1_maintable">
              <div className="card p-5 mb-3">
                <div className="row gy-2 mb-4">
                  <div className="col-auto col-md-3 text-dt">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
                    ></i>{" "}
                    Block Height:
                  </div>
                  <div className="col col-md-9">
                    <div className="d-flex align-items-center gap-2">
                      <div>{block}</div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-auto col-md-3 text-dt mb-1 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="The finality status of the block. "
                    ></i>{" "}
                    Status:
                  </div>
                  <div className="col col-md-9">
                    <span
                      className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 fw-medium py-1.5 px-2"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                    >
                      <i className="fa fa-check-circle"></i> Finalized
                    </span>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="The date and time at which a block is produced."
                    ></i>{" "}
                    Timestamp:
                  </div>
                  <div className="col-md-9">
                    <i className="far fa-clock small"></i>
                    {`${timeDelta(blockData.timestamp * 1000, Date.now())}  `}
                    <span id="showUtcLocalDate" data-timestamp="1680570827">
                      {`(${formatIso(blockData.timestamp * 1000)} +UTC)`}
                    </span>
                  </div>
                </div>
                <div id="ContentPlaceHolder1_div_tx_fieldname">
                  <div className="row">
                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                      <i
                        className="far fa-question-circle me-1"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        data-original-title=""
                        title=""
                        data-bs-content="The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value."
                      ></i>{" "}
                      Transactions:
                    </div>
                    <div
                      id="ContentPlaceHolder1_div_tx_fieldvalue"
                      className="col-md-9"
                    >
                      <Link
                        to={`/block/16947248/txns`}
                      >{`${blockData.transactions.length} transactions`}</Link>{" "}
                      in this block
                    </div>
                  </div>
                </div>

                <hr className="opacity-75 my-5"></hr>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Address receiving fees from transactions in this block"
                    ></i>{" "}
                    Fee Recipient:
                  </div>
                  <div className="col-md-9">
                    <a
                      href={`/address/${blockData.miner}`}
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                    >
                      {blockData.miner}
                    </a>{" "}
                    in 12 secs
                  </div>
                </div>
                <hr className="opacity-75 my-5"></hr>
                <div className="row align-items-center mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="The total gas used in the block and its percentage of gas filled in the block."
                    ></i>{" "}
                    Gas Used:
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    {`${blockData.gasUsed.toLocaleString("en-us")} (${(
                      (blockData.gasUsed / blockData.gasLimit) *
                      100
                    ).toFixed(2)}%)`}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Total gas limit provided by all transactions in the block."
                    ></i>{" "}
                    Gas Limit:
                  </div>
                  <div className="col-md-9">
                    {blockData.gasLimit.toLocaleString("en-us")}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Post-London Upgrade, this represents the minimum gasUsed multiplier required for a tx to be included in a block. "
                    ></i>{" "}
                    Base Fee Per Gas:
                  </div>
                  <div className="col-md-9">
                    {`${ethers.utils.formatEther(
                      blockData.baseFeePerGas
                    )} ETH (${ethers.utils.formatUnits(
                      blockData.baseFeePerGas,
                      "gwei"
                    )} Gwei)`}
                  </div>
                </div>
                <div id="ContentPlaceHolder1_divExtraData" className="row">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Any data that can be included by the block producer in the block."
                    ></i>{" "}
                    Extra Data:
                  </div>
                  <div className="col-md-9">{blockData.extraData}</div>
                </div>
              </div>

              <div className="card p-5 mb-3">
                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="The hash of the block header of the current block."
                    ></i>{" "}
                    Hash:
                  </div>
                  <div className="col-md-9">{blockData.hash}</div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="The hash of the block from which this block was generated, also known as its parent block."
                    ></i>{" "}
                    Parent Hash:
                  </div>
                  <div className="col-md-9">{blockData.parentHash}</div>
                </div>

                <div className="row">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-original-title=""
                      title=""
                      data-bs-content="Block nonce is a value used during mining to demonstrate proof of work for a block."
                    ></i>{" "}
                    Nonce:
                  </div>
                  <div className="col-md-9">{blockData.nonce}</div>
                </div>

                <hr className="opacity-75 my-5"></hr>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="d-flex align-items-baseline fs-sm text-muted gap-1 mb-3">
            <i className="far fa-lightbulb-on"></i>
            <span>
              Blocks are batches of transactions linked via cryptographic
              hashes. Any tampering of a block would invalidate all following
              blocks as all subsequent hashes would change. Learn more about
              this page in our{" "}
              <a
                target="_blank"
                href="https://info.etherscan.com/exploring-block-details-page/"
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

export default Block;
