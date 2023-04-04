import { formatIso, timeDelta } from "../utils/helpers";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AlchemyContext } from "./Alc";
import { fromHex, toHex } from "alchemy-sdk";
import { ethers } from "ethers";

function Txn(props) {
  let { txn } = useParams();
  const alchemy = useContext(AlchemyContext);
  const [txnData, setTxnData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function getTxn(txn) {
    let response = await alchemy.core.getTransactionReceipt(txn);
    response.cumulativeGasUsed = fromHex(response.cumulativeGasUsed._hex);
    response.transactionFee = ethers.utils.formatUnits(
      response.effectiveGasPrice.mul(response.gasUsed).toString(),
      "ether"
    );
    response.effectiveGasPriceInEth = ethers.utils.formatUnits(
      response.effectiveGasPrice,
      "ether"
    );
    response.effectiveGasPrice = ethers.utils.formatUnits(
      response.effectiveGasPrice,
      "gwei"
    );
    response.positionInBlock = response.transactionIndex;
    response.status = response.status === 1 ? "Success" : "Failure";
    response.type = response.type === 2 ? "2 (EIP-1559)" : "1 (Legacy)";
    response.gasUsed = response.gasUsed.toString();
    delete response.logs;
    delete response.logsBloom;
    delete response.blockHash;
    let bkRes = await alchemy.core.getBlockWithTransactions(
      toHex(response.blockNumber)
    );
    for (let i = 0; i < bkRes.transactions.length; i++) {
      if (bkRes.transactions[i].hash === response.transactionHash) {
        response.value = ethers.utils.formatEther(bkRes.transactions[i].value);
        response.ts = formatIso(bkRes.timestamp * 1000, true);
        response.timeDelta = timeDelta(Date.now(), bkRes.timestamp * 1000);
        response.nonce = bkRes.transactions[i].nonce;
      }
    }
    setTxnData(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getTxn(txn);
  }, []);

  if (isLoading) {
    return (
      <main id="content" className="main-content" role="main">
        <section className="container-xxl">Loading...</section>
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

      <section className="container-xxl">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 border-bottom py-4">
          <div className="">
            <div className="d-flex align-items-center gap-2">
              <h1 className="h5 mb-0">Transaction Details </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="container-xxl"></section>
      <div className="container-xxl pt-1 pb-12">
        <ul
          id="ContentPlaceHolder1_myTab"
          className="nav nav-pills text-nowrap snap-x-mandatory overflow-x-auto flex-nowrap scrollbar-custom py-3 gap-2"
          role="tablist"
        >
          <li
            id="ContentPlaceHolder1_li_navHome"
            className="nav-item snap-align-start"
            role="presentation"
          >
            <a
              className="nav-link active"
              href="#home"
              id="home-tab"
              data-bs-toggle="pill"
              data-bs-target="#home-tab-content"
              type="button"
              role="tab"
              aria-controls="home-tab-content"
              aria-selected="true"
            >
              Overview
            </a>
          </li>
          <li
            id="ContentPlaceHolder1_li_txreceiptlog"
            className="nav-item snap-align-start"
            role="presentation"
          >
            <a
              className="nav-link"
              href="#eventlog"
              id="eventlog-tab"
              data-bs-toggle="pill"
              data-bs-target="#eventlog-tab-content"
              aria-controls="eventlog-tab-content"
              aria-selected="false"
              tabIndex="-1"
              role="tab"
            >
              Logs (1)
            </a>
          </li>
          <li
            id="ContentPlaceHolder1_li_statechange"
            className="nav-item snap-align-start"
            role="presentation"
          >
            <a
              className="nav-link"
              href="#statechange"
              id="statechange-tab"
              data-bs-toggle="pill"
              data-bs-target="#statechange-tab-content"
              aria-controls="statechange-tab-content"
              aria-selected="false"
              tabIndex="-1"
              role="tab"
            >
              State{" "}
            </a>
          </li>
          <li
            id="ContentPlaceHolder1_li_disqus"
            className="nav-item snap-align-start"
            role="presentation"
          >
            <a
              className="nav-link"
              href="#comments"
              id="comments-tab"
              data-bs-toggle="pill"
              data-bs-target="#comments-tab-content"
              aria-controls="comments-tab-content"
              aria-selected="false"
              tabIndex="-1"
              role="tab"
            >
              <span
                className="disqus-comment-count"
                data-disqus-identifier="Etherscan_TxHash_0x3fcf5e19233403f234ffd1334d0f485dfdab45d2e1d86596fb99376ba10af618_Comments"
              >
                Comments
              </span>
            </a>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-content"
            role="tabpanel"
            aria-labelledby="tab-1"
            tabIndex="0"
          >
            <div id="ContentPlaceHolder1_maintable">
              <div className="card p-5 mb-3">
                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-bs-original-title=""
                      title=""
                      data-bs-content="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed."
                    ></i>
                    Transaction Hash:
                  </div>
                  <div className="col-md-9">
                    <span id="referralLink-1" className="text-break">
                      <span id="spanTxHash" className="me-1">
                        {txnData.transactionHash}
                      </span>
                    </span>
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
                      data-bs-original-title=""
                      title=""
                      data-bs-content="The status of the transaction."
                    ></i>
                    Status:
                  </div>
                  <div className="col col-md-9">
                    <span
                      className="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 fw-medium text-start text-wrap py-1.5 px-2"
                      data-bs-toggle="tooltip"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                    >
                      <i className="fa fa-check-circle me-1"></i>Success
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
                      data-bs-original-title=""
                      title=""
                      data-bs-content="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced."
                    ></i>
                    Block:
                  </div>
                  <div className="col-md-9">
                    <div className="d-flex align-items-center gap-2">
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="fa fa-hourglass-start text-secondary small"
                          data-bs-toggle="tooltip"
                          aria-label="This block is unfinalized and may be susceptible to reorgs."
                        ></i>
                        <a href="/block/16968889">{txnData.blockNumber}</a>
                      </span>
                      <span
                        className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2"
                        data-bs-toggle="tooltip"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                      >
                        {`${txnData.confirmations} Block Confirmations`}{" "}
                      </span>
                    </div>
                  </div>
                </div>

                <div id="ContentPlaceHolder1_divTimeStamp">
                  <div className="row mb-4">
                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                      <i
                        className="far fa-question-circle me-1"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        data-bs-original-title=""
                        title=""
                        data-bs-content="The date and time at which a transaction is produced."
                      ></i>
                      Timestamp:
                    </div>
                    <div className="col-md-9">
                      <span id="clock"></span>
                      <i className="far fa-clock small me-1"></i>
                      {txnData.timeDelta} (
                      <span id="showUtcLocalDate" data-timestamp="1680529715">
                        {txnData.ts}
                        +UTC
                      </span>
                      )
                    </div>
                  </div>
                </div>

                <hr className="opacity-75 mt-0 mb-5"></hr>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-bs-original-title=""
                      title=""
                      data-bs-content="The sending party of the transaction."
                    ></i>
                    From:
                  </div>
                  <div className="col-md-9">
                    <div>
                      <span className="me-1">
                        <a
                          href={`/address/${txnData.from}`}
                          className="text-break"
                        >
                          {txnData.from}
                        </a>
                      </span>
                    </div>
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
                      data-bs-original-title=""
                      title=""
                      data-bs-content="The receiving party of the transaction (could be a contract address)."
                    ></i>
                    To:
                  </div>
                  <div className="col-md-9">
                    <div>
                      <i
                        className="far fa-file-alt text-secondary "
                        data-bs-toggle="tooltip"
                        aria-label="Contract"
                      ></i>{" "}
                      <span className="me-1">
                        <a
                          href={`/address/${txnData.to}`}
                          className="text-break"
                          style={{ wordBreak: "break-all!important" }}
                        >
                          {txnData.to}
                        </a>
                      </span>
                      <i
                        className="fa fa-check-circle text-success mx-1"
                        data-bs-toggle="tooltip"
                        aria-label="Contract Execution Completed"
                      ></i>
                    </div>
                  </div>
                </div>

                <hr className="opacity-75 mt-0 mb-5"></hr>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-bs-original-title=""
                      title=""
                      data-bs-content="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction."
                    ></i>
                    Value:
                  </div>
                  <div className="col-md-9">
                    <span id="ContentPlaceHolder1_spanValue">
                      <div className="d-flex align-items-center gap-1">
                        <i className="fab fa-ethereum me-0.5 text-muted"></i>
                        <span
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                        >
                          {txnData.value}
                          ETH
                        </span>{" "}
                        <span className="text-muted">(ETH Price)</span>
                      </div>
                    </span>
                  </div>
                </div>

                <div id="ContentPlaceHolder1_divTxFee">
                  <div className="row mb-4">
                    <div className="col-md-3 text-dt mb-2 mb-md-0">
                      <i
                        className="far fa-question-circle me-1"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                        data-bs-placement="top"
                        data-bs-original-title=""
                        title=""
                        data-bs-content="Amount paid to the block producer for processing the transaction."
                      ></i>
                      Transaction Fee:
                    </div>
                    <div className="col-md-9">
                      <span id="ContentPlaceHolder1_spanTxFee">
                        <div className="d-flex align-items-center gap-1">
                          <span
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                          >
                            {txnData.transactionFee} ETH
                          </span>{" "}
                          <span className="text-muted">(ETH PRICE)</span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row mp-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-bs-original-title=""
                      title=""
                      data-bs-content="Cost per unit of gas specified for the transaction, in Ether and Gwei. The higher the gas price the higher chance of getting included in a block."
                    ></i>
                    Gas Price:
                  </div>
                  <div className="col-md-9">
                    <span
                      id="ContentPlaceHolder1_spanGasPrice"
                      data-bs-toggle="tooltip"
                    >
                      {txnData.effectiveGasPrice}
                      Gwei{" "}
                      <span className="text-muted">
                        ({txnData.effectiveGasPriceInEth} ETH)
                      </span>
                    </span>
                  </div>
                </div>

                <hr className="opacity-75 mt-5 mb-5"></hr>

                <div className="row mb-4">
                  <div className="col-md-3 text-dt mb-2 mb-md-0">
                    <i
                      className="far fa-question-circle me-1"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="top"
                      data-bs-original-title=""
                      title=""
                      data-bs-content="The value being transacted in Ether and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction."
                    ></i>
                    Gas Used:
                  </div>
                  <div className="col-md-9">
                    <span id="ContentPlaceHolder1_spanValue">
                      <div className="d-flex align-items-center gap-1">
                        <i className="fab fa-ethereum me-0.5 text-muted"></i>
                        <span
                          data-bs-toggle="tooltip"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                        >
                          {txnData.gasUsed}
                        </span>{" "}
                        <span className="text-muted">(Percent)</span>
                      </div>
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
                      data-bs-original-title=""
                      title=""
                      data-bs-content="Other data related to this transaction."
                    ></i>
                    Other Attributes:
                  </div>
                  <div className="col-md-9">
                    <div className="d-flex flex-wrap gap-2">
                      <span id="ContentPlaceHolder1_spanTxnType">
                        <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2">
                          <span className="text-muted">Txn Type:</span> 2
                          (EIP-1559)
                        </span>
                      </span>
                      <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2">
                        <span className="text-muted">Nonce:</span> 193442
                      </span>
                      <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2">
                        <span className="text-muted">Position In Block:</span>{" "}
                        129
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div
                  id="ContentPlaceHolder1_collapseContent"
                  className="collapse"
                >
                  <div className="p-5 pb-0">
                    <div className="row mb-4">
                      <div className="col-md-3 text-dt mb-2 mb-md-0">
                        <i
                          className="far fa-question-circle me-1"
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          data-bs-original-title=""
                          title=""
                          data-bs-content="Maximum amount of gas allocated for the transaction &amp; the amount eventually used. Normal ETH transfers involve 21,000 gas units while contracts involve higher values."
                        ></i>
                        Gas Limit &amp; Usage by Txn:
                      </div>
                      <div className="col-md-9">
                        <span data-bs-toggle="tooltip">30,000</span>
                        <span className="mx-2 text-secondary">|</span>
                        <span
                          id="ContentPlaceHolder1_spanGasUsedByTxn"
                          data-bs-toggle="tooltip"
                        >
                          22,111 (73.7%)
                        </span>
                      </div>
                    </div>

                    <div
                      id="ContentPlaceHolder1_divGasFees"
                      className="row mb-4"
                    >
                      <div className="col-md-3 text-dt mb-2 mb-md-0">
                        <i
                          className="far fa-question-circle me-1"
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          data-bs-original-title=""
                          title=""
                          data-bs-content="Base Fee refers to the network Base Fee at the time of the block, while Max Fee &amp; Max Priority Fee refer to the max amount a user is willing to pay for their tx &amp; to give to the block producer respectively."
                        ></i>
                        Gas Fees:
                      </div>
                      <div className="col-md-9">
                        <span
                          className="mb-1"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <span className="text-muted">Base:</span> 40<b>.</b>
                          774318282 Gwei
                        </span>{" "}
                        <span className="mx-2 text-secondary">|</span>
                        <span
                          className="mb-1"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <span className="text-muted">Max:</span> 40<b>.</b>
                          774318282 Gwei
                        </span>{" "}
                        <span className="mx-2 text-secondary">|</span>
                        <span
                          className="mb-1"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <span className="text-muted">Max Priority:</span> 0
                          ETH
                        </span>
                      </div>
                    </div>

                    <div
                      id="ContentPlaceHolder1_divBurntAndTxSaving"
                      className="row mb-4"
                    >
                      <div className="col-md-3 text-dt mb-2 mb-md-0">
                        <i
                          className="far fa-question-circle me-1"
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover"
                          data-bs-placement="top"
                          data-bs-original-title=""
                          title=""
                          data-bs-content="Total amount of ETH burnt from this tx &amp; total fees saved from the amount the user was willing to pay for this tx."
                        ></i>
                        Burnt &amp; Txn Savings Fees:
                      </div>
                      <div className="col-md-9">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2">
                            🔥
                            <span className="text-muted">Burnt:</span> 0<b>.</b>
                            000901560951533302 ETH ($1.64)
                          </span>
                          <span className="badge bg-secondary bg-opacity-10 border border-secondary border-opacity-25 text-dark fw-medium text-start text-wrap py-1.5 px-2">
                            💸
                            <span className="text-muted">Txn Savings:</span> 0
                            ETH ($0.00)
                          </span>
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
                          data-bs-original-title=""
                          title=""
                          data-bs-content="Additional data included for this transaction. Commonly used as part of contract interaction or as a message sent to the recipient."
                        ></i>
                        Input Data:
                      </div>
                      <div className="col-md-9">
                        <div id="rawtab" data-target-group="inputDataGroup">
                          <span
                            data-bs-container="body"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                          >
                            <textarea
                              readOnly=""
                              spellCheck="false"
                              className="scrollbar-custom form-control bg-light text-muted font-monospace"
                              rows="2"
                              id="inputdata"
                              value="0x"
                            ></textarea>
                            <span id="rawinput" style={{ display: "none" }}>
                              0x
                            </span>
                          </span>
                        </div>
                        <div
                          id="decodetab"
                          data-target-group="inputDataGroup"
                          style={{ display: "none", opacity: "0" }}
                        >
                          <div id="loadingtxframe">
                            <div
                              id="overlayMain"
                              className="text-center py-10 "
                            >
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <div className="small text-muted mt-1">
                                Loading
                              </div>
                            </div>
                          </div>
                          <div id="decodebox" style={{ display: "none" }}>
                            <div className="scrollbox scrollbar-custom border rounded">
                              <div id="inputDecode" className="bg-light"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="opacity-75 mt-5 mb-0"></hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="internal-tab-content"
            role="tabpanel"
            aria-labelledby="tab-2"
            tabIndex="0"
          >
            <div className="card">
              <div className="">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 card-body">
                  Invoked Transactions
                  <div
                    className="d-flex align-items-center gap-2"
                    id="divswitch"
                    style={{ display: "none" }}
                  >
                    <span
                      className="text-cap"
                      data-bs-toggle="popover"
                      data-bs-placement="top"
                      data-bs-trigger="hover"
                      data-bs-content="Toggle between Simplified and Advanced view. The 'Advanced' view also shows zero value ETH transfers, while the 'Simple' view only shows ETH transfers with value. Name tags integration is not available in advanced view"
                    >
                      <i className="far fa-question-circle text-muted"></i>
                      <span id="toggletext">ADVANCED MODE:</span>
                    </span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="customSwitch1"
                      ></input>
                    </div>
                  </div>
                </div>

                <div
                  id="ContentPlaceHolder1_divinternaltable"
                  className="table-responsive"
                >
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Type Trace Address</th>
                        <th scope="col" style={{ width: "100px" }}>
                          From
                        </th>
                        <th scope="col" style={{ width: "20px" }}>
                          &nbsp;
                        </th>
                        <th scope="col">To</th>
                        <th scope="col" className="text-end">
                          Value
                        </th>
                        <th scope="col" className="text-end">
                          Gas Limit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="align-middle text-nowrap"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="accesslist-tab-content"
            role="tabpanel"
            aria-labelledby="tab-4"
            tabIndex="0"
          >
            <div className="card p-5">
              <pre></pre>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="statechange-tab-content"
            role="tabpanel"
            aria-labelledby="tab-5"
            tabIndex="0"
          >
            <div className="card pt-5">
              <div
                id="loadingStateChangeFrame"
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-31px",
                }}
              >
                <div id="overlay1" className="text-center py-10 ">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="small text-muted mt-1">Loading</div>
                </div>
              </div>
              <div className="table-responsive" style={{ overflow: "auto" }}>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pendingtxlog-tab-content"
            role="tabpanel"
            aria-labelledby="tab-6"
            tabIndex="0"
          >
            <div className="card pt-5">
              <div
                id="loadingPendingTxEventLogFrame"
                style={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-31px",
                }}
              >
                <div id="overlay" className="text-center py-10 ">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="small text-muted mt-1">Loading</div>
                </div>
              </div>
              <div className="table-responsive">
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="comments-tab-content"
            role="tabpanel"
            aria-labelledby="tab-7"
            tabIndex="0"
          >
            <div className="card p-5">
              <p>
                Make sure to use the "Vote Down" button for any spammy posts,
                and the "Vote Up" for interesting conversations.
              </p>
              <br></br>
              <div className="panel-body">
                <div>
                  <div id="disqus_thread"></div>
                  {/* <script type="text/javascript">
                                            var disqus_shortname = 'Etherscan'; var disqus_identifier = 'Etherscan_TxHash_0x3fcf5e19233403f234ffd1334d0f485dfdab45d2e1d86596fb99376ba10af618_Comments'; var disqus_title = 'Transaction 0x3fcf5e19233403f234ffd1334d0f485dfdab45d2e1d86596fb99376ba10af618'; var disqus_url = 'https://etherscan.io/tx/0x3fcf5e19233403f234ffd1334d0f485dfdab45d2e1d86596fb99376ba10af618#disqus';
                                        </script> */}
                  <noscript>
                    Please enable JavaScript to view the{" "}
                    <a
                      href="https://disqus.com/?ref_noscript"
                      rel="nofollow noopener"
                    >
                      comments powered by Disqus
                    </a>
                    .
                  </noscript>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="d-flex align-items-baseline fs-sm text-muted gap-1 mb-3">
            <i className="far fa-lightbulb-on"></i>
            <span>
              A transaction is a cryptographically signed instruction that
              changes the blockchain state. Block explorers track the details of
              all transactions in the network. Learn more about transactions in
              our{" "}
              <a
                target="_blank"
                href="https://info.etherscan.com/understanding-an-ethereum-transaction/"
              >
                Knowledge Base
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Txn;
