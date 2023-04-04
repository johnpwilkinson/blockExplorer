import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

function TokenDropDown(props) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return(

    <a
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>

    )
});

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.value.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const options = props.tokens.map((el, i) => {
    let logoURL =
      el.logo === null
        ? "https://www.svgrepo.com/show/416765/token-bat-coin.svg"
        : el.logo;
    if (el.name.length > 15) {
      el.name = el.name.slice(0, 12);
    }
    if (el.symbol.length > 5) {
      el.symbol = "";
    }
    return (
      <Dropdown.Item eventKey={String(i)} key={i} value={el.name}>
        <Row>
          <Col md={7}>
            <Row>
              <div className="text ddBig ">
                <img className="dropDownLogo" src={logoURL} alt={""} />{" "}
                {`${el.name} (${el.symbol})`}
              </div>
            </Row>
            <Row>
              <div className="text ddBig grayTxt">
                {`${el.balance} ${el.symbol}`}
              </div>
            </Row>
          </Col>
          <Col className=" Rtext ddBig " md={5}>
            <Row>
              <div>
                {`$ ${(Number(el.balance) * Number(el.price)).toFixed(2)}`}
              </div>
            </Row>
            <Row>
              <div className="grayTxt">{`@ ${el.price.toFixed(3)}`}</div>
            </Row>
          </Col>
        </Row>
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        className="dropdown-toggle js-dropdowns-input-focus btn btn-white text-start w-100 dropdown-toggle py-2 px-3"
      >
        My Tokens
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        {options && options.map((el) => el)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TokenDropDown;
