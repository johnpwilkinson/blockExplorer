import { Col, Row } from "react-bootstrap";
import { ReactComponent as Contract } from "../assets/contract.svg";
import { Utils } from "alchemy-sdk";
import { truncateHex } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function LatestRow(props) {
  if (props.flag === "blocks") {
    return (
      <Row key={props.key}>
        <Col className="sm-4">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-none d-sm-flex content-center bg-light text-muted rounded p-3"
              style={{ height: "3rem", width: "3rem" }}
            >
              <FontAwesomeIcon icon={faCube} />
            </div>
            <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
              <span className="d-inline-block d-sm-none">Block</span>
              <a
                className="text-truncate"
                style={{ maxWidth: " 6rem" }}
                href={`/block/${props.bn}`}
              >
                {props.bn}
              </a>
              <div className="small text-muted">12 secs ago</div>
            </div>
          </div>
        </Col>
        <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
          <div className="pe-0 pe-sm-2">
            <div className="d-flex flex-wrap gap-1">
              Fee Recipient{" "}
              <a
                href={`/address/${props.miner}`}
                data-bs-toggle="tooltip"
              >
                {truncateHex(props.miner)}
              </a>
            </div>
            <a href="/txs?block=16957439" data-bs-toggle="tooltip">
              {props.numTx}{" "}
            </a>
            <span className="small text-muted me-2">in 12 secs</span>
            <span
              className="d-inline-block d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2"
              data-bs-toggle="tooltip"
            >
              0<b>.</b>01027 Eth
            </span>
          </div>
          <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
            <span
              className="badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1.5 px-2"
              data-bs-toggle="tooltip"
            >
              0<b>.</b>01027 Eth
            </span>
          </div>
        </div>
        <hr></hr>
      </Row>
    );
  }
  if (props.flag === "txs") {
    return (
      <Row key={props.key}>
        <Col className="col-sm-4 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-none d-sm-flex content-center bg-light text-muted rounded p-3"
              style={{ height: "3rem", width: "3rem" }}
            >
              <Contract className="svgs" />
            </div>
            <div className="d-flex align-items-center align-items-sm-start flex-row flex-sm-column gap-1 gap-sm-0">
              <span className="d-inline-block d-sm-none">Block</span>
              <a
                className="text-truncate"
                style={{ maxWidth: " 6rem" }}
                href={`/txn/${props.hash}`}
              >
                {truncateHex(props.hash)}
              </a>
              <div className="small text-muted">12 secs ago</div>
            </div>
          </div>
        </Col>
        <div className="col-sm-8 col-lg-7 d-flex justify-content-sm-between align-items-end align-items-sm-center">
          <div className="pe-0 pe-sm-2">
            <div className="d-flex flex-wrap gap-1">
              From{" "}
              <a
                href={`/address/${props.from}`}
                data-bs-toggle="tooltip"
              >
                {truncateHex(props.from)}
              </a>
            </div>
            <div className="d-flex align-items-center flex-wrap gap-1">
              To{" "}
              <a
                href={`/address/${props.to}`}
                data-bs-toggle="tooltip"
              >
                {truncateHex(props.to)}
              </a>
              <span className="d-inline d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark ms-1 py-1.5 px-2 fw-medium">
                0 Eth
              </span>
            </div>
            <a href={`/txn/${props.numTx}`} data-bs-toggle="tooltip">
              {props.numTx}{" "}
            </a>
            <span
              className="d-inline-block d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2"
              data-bs-toggle="tooltip"
            >
              {truncateHex(props.to)}
            </span>
          </div>
          <div
            className="d-none d-sm-block text-end ms-2 ms-sm-0"
            data-bs-toggle="tooltip"
          >
            <span className="badge border border-dark dark:border-white border-opacity-15 text-dark  py-1.5 px-2 fw-medium">
              {Math.round(
                Utils.formatEther(props.value) * 100 + Number.EPSILON
              ) / 100}{" "}
              Eth
            </span>
          </div>
        </div>
        <hr></hr>
      </Row>
    );
  }
}

export default LatestRow;
