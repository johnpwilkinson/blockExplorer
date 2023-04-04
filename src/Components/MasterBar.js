import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

function MasterBar(props) {
  return (
    <section
      id="masterTopBar"
      className="d-none d-lg-block sticky-top bg-white border-bottom py-1"
    >
      <div className="container-xxl d-flex align-items-center justify-content-between">
        <div
          id="ethPrice"
          className="d-flex align-items-sm-center gap-4 w-100 fs-sm"
        >
          <div className="text-muted">
            <span className="text-muted">ETH Price:</span>{" "}
            <a href="/chart/etherprice">$1,824.04</a>
            <span data-bs-toggle="tooltip" data-bs-placement="top">
              <span className="text-success"> (+0.11%)</span>
            </span>
          </div>
          <div className="text-muted ">
            {" "}
            <FontAwesomeIcon icon={faGasPump} className="fad me-1" />
            Gas:{" "}
            <span
              id="spanGasTooltip"
              data-bs-toggle="tooltip"
              data-bs-html="true"
            >
              <a href="/gastracker">
                <span className="gasPricePlaceHolder">16</span> Gwei
              </a>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center gap-2">
          <div id="divThemeSetting" className="dropdown">
            <button
              className="btn btn-lg btn-white text-primary content-center"
              type="button"
              id="dropdownMenuTopbarSettings"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "2.375rem", height: "2.375rem" }}
            >
              <span className="theme-btn-main">
                <span
                  className="far fa-sun-bright theme-icon-active"
                  data-href="#fa-sun-bright"
                ></span>{" "}
                <FontAwesomeIcon icon={faSun} />
              </span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuTopbarSettings"
            >
              <li>
                <button
                  type="button"
                  className="dropdown-item theme-btn active"
                  data-bs-theme-value="light"
                >
                  <i
                    className="far fa-sun-bright fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-sun-bright"
                  ></i>{" "}
                  Light
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item theme-btn"
                  data-bs-theme-value="dim"
                >
                  <i
                    className="far fa-moon-stars fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-moon-stars"
                  ></i>{" "}
                  Dim
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item theme-btn"
                  data-bs-theme-value="dark"
                >
                  <i
                    className="far fa-moon fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-moon"
                  ></i>
                  Dark
                </button>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a className="dropdown-item" href="/settings">
                  <i className="far fa-gear fa-fw dropdown-item-icon me-1"></i>{" "}
                  Site Settings <i className="far fa-arrow-right ms-1"></i>
                </a>
              </li>
            </ul>
          </div>
          <div id="divTestNet" className="dropdown">
            <button
              className="btn btn-lg btn-white content-center"
              type="button"
              id="dropdownTopbarNetworks"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: " 2.375rem", height: "2.375rem" }}
            >
              <img
                width="10"
                data-img-theme="light"
                src="https://etherscan.io/images/svg/brands/ethereum-original.svg"
                alt="Ethereum Logo"
              ></img>
              <img
                width="10"
                data-img-theme="darkmode"
                src="https://etherscan.io/images/svg/brands/ethereum-original-light.svg"
                alt="Ethereum Logo"
              ></img>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownTopbarNetworks"
            >
              <li>
                <a
                  href="https://etherscan.io"
                  id="LI_Mainnet"
                  className="dropdown-item active active active"
                >
                  Ethereum Mainnet
                </a>
              </li>
              <li>
                <a
                  href="https://cn.etherscan.com/?lang=zh-CN"
                  id="LI_Mainnet_CN"
                  className="dropdown-item"
                >
                  Ethereum Mainnet{" "}
                  <span className="badge border bg-light text-dark ms-1">
                    CN
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://beaconscan.com/"
                  id="LI2"
                  className="dropdown-item"
                >
                  Beaconscan{" "}
                  <span className="badge border bg-light text-dark ms-1">
                    ETH2
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a
                  href="https://goerli.etherscan.io"
                  id="LI58"
                  className="dropdown-item"
                >
                  Goerli Testnet
                </a>
              </li>
              <li>
                <a
                  href="https://sepolia.etherscan.io"
                  id="LI9"
                  className="dropdown-item"
                >
                  Sepolia Testnet
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MasterBar;
