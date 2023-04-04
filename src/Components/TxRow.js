import { ReactComponent as Eye } from "../assets/eye.svg";
import { truncateHex, formatIso } from "../utils/helpers";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

function TxRow(props) {
  if (props.flag === "block") {
    let value = ethers.utils.formatEther(props.value.toString());
    return (
      <tr>
        <td>
          <Eye className="dropDownLogo" />
        </td>
        <td>
          <div className="d-flex align-items-center gap-1">
            <span className="hash-tag text-truncate myFnExpandBox_searchVal">
              <Link to={`/txn/${props.hash}`}>{truncateHex(props.hash)}</Link>
            </span>
          </div>
        </td>
        <td>{props.block}</td>
        <td>{props.time}</td>
        <td>
          <div className="d-flex align-items-center gap-1">
            <Link
              to={`/address/${props.from}`}
              onClick={() => props.setAddress(props.from)}
            >
              {truncateHex(props.from)}
            </Link>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center gap-1">
            <Link
              to={`/address/${props.to}`}
              onClick={() => props.setAddress(props.to)}
            >
              {truncateHex(props.to)}
            </Link>
          </div>
        </td>
        <td>{value}</td>
      </tr>
    );
  }
  let logoURL =
    props.token in props.tokenLogo
      ? props.tokenLogo[props.token]
      : "https://www.svgrepo.com/show/416765/token-bat-coin.svg";
  return (
    <tr>
      <td>
        <Eye className="dropDownLogo" />
      </td>
      <td>
        <div className="d-flex align-items-center gap-1">
          <span className="hash-tag text-truncate myFnExpandBox_searchVal">
            {/* <a href="" target="_parent">{truncateHex(props.hash)}</a> */}
            <Link to={`/txn/${props.hash}`}>{truncateHex(props.hash)}</Link>
          </span>
        </div>
      </td>
      <td className="showDate">
        <span
          rel="tooltip"
          data-bs-toggle="tooltip"
          data-bs-title="6 days 21 hrs ago"
        >
          {formatIso(props.time)}
        </span>
      </td>
      <td>
        <div className="d-flex align-items-center gap-1">
          <Link
            to={`/address/${props.from}`}
            onClick={() => props.setAddress(props.from)}
          >
            {truncateHex(props.from)}
          </Link>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-1">
          <Link
            to={`/address/${props.to}`}
            onClick={() => props.setAddress(props.to)}
          >
            {truncateHex(props.to)}
          </Link>
        </div>
      </td>
      <td>{props.value}</td>
      <td>
        {" "}
        <img className="dropDownLogo" src={logoURL} alt="token logo"/>
        {props.token}
      </td>
    </tr>
  );
}

export default TxRow;
