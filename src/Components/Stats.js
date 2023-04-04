import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faGlobe, faServer } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Chart } from "../assets/chart.svg";

function Stats(props) {
  return (
    <div className="row g-lg-10">
      <div className="col-md-6 col-lg-4">
        <div className="d-flex">
          <div className="text-center me-3" style={{ width: "1.5rem" }}>
            <img
              className="img-fluid mx-auto"
              width="18"
              data-img-theme="light"
              src="https://www.etherscan.io/images/svg/brands/ethereum-original.svg"
              alt="Ethereum Logo"
            ></img>
            <img
              className="img-fluid mx-auto"
              width="18"
              data-img-theme="darkmode"
              src="https://www.etherscan.io/images/svg/brands/ethereum-original-light.svg"
              alt="Ethereum Logo"
            ></img>
          </div>
          <div className="flex-grow-1">
            <div className="text-cap mb-px">Ether Price</div>
            <a
              className="link-dark fs-base"
              href="/chart/etherprice"
              rel="tooltip"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            >
              $1,824.04<span className="text-muted"> @ 0.06394 BTC</span>
              <span className="text-success small"> (+0.11%)</span>
            </a>
          </div>
        </div>

        <hr className="my-5"></hr>
        <div className="d-flex">
          <div className="me-3">
            <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "1.5rem" }} />
          </div>
          <div className="flex-grow-1">
            <div className="text-cap mb-px">Market Cap</div>
            <a className="link-dark fs-base" href="/stat/supply">
              $219,698,758,623.00
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 border-md-start">
        <hr className="d-block d-md-none my-5"></hr>
        <div className="d-flex">
          <div className="me-3">
            <FontAwesomeIcon icon={faServer} style={{ fontSize: "1.5rem" }} />
          </div>
          <div className="flex-grow-1">
            <div className="text-cap mb-px">Transactions</div>
            <a
              href="/txs"
              className="link-dark fs-base"
              rel="tooltip"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-html="true"
            >
              1,922.61 M
            </a>
            <span
              className="text-muted small"
              style={{ fontSize: "14px" }}
              rel="tooltip"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            >
              {" "}
              (11.2 TPS)
            </span>
          </div>
          <div className="text-end">
            <div className="text-cap mb-px">Med Gas Price</div>
            <a
              href="/gastracker"
              className="link-dark fs-base"
              data-bs-toggle="tooltip"
              data-bs-html="true"
            >
              16 Gwei
              <span className="text-muted small" style={{ fontSize: "14px" }}>
                ($0.61)
              </span>
            </a>
          </div>
        </div>
        <hr className="my-5"></hr>
        <div className="d-flex">
          <div className="me-3">
            <FontAwesomeIcon icon={faGauge} style={{ fontSize: "1.5rem" }} />
          </div>
          <div className="flex-grow-1">
            <div className="text-cap mb-px">Last Finalized Block</div>
            <span
              rel="tooltip"
              className="fs-base"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            >
              16957354
            </span>
          </div>
          <div className="text-end">
            <div className="text-cap mb-px">Last Safe Block</div>
            <span
              rel="tooltip"
              className="fs-base"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            >
              16957386
            </span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 border-lg-start">
        <hr className="d-block d-lg-none my-5"></hr>
        <div className="text-cap mb-px">Transaction History in 14 days</div>
        <div
          id="container-1"
          className="w-100 pt-2"
          style={{ height: "105px", overflow: "hidden" }}
          data-highcharts-chart="0"
        >
          <div
            id="highcharts-71tc49n-0"
            dir="ltr"
            className="highcharts-container "
            style={{
              position: "relative",
              overflow: "hidden",
              width: "315px",
              height: "97px",
              textAlign: "left",
              lineHeight: "normal",
              zIndex: 0,
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
              userSelect: "none",
              touchAction: "manipulation",
              outline: "none",
            }}
          >
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
