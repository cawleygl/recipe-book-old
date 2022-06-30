import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import placeholder from '../assets/silverware-gf1a033748_1280.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFillDrip } from '@fortawesome/free-solid-svg-icons'

const capitalizeName = (name) => {
  if (!name) {
    return;
  }
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
};

const customBadge = (tagName, tagID, tagColor, textColor, large) => {
  return (
    <div key={tagID}>
      <style type="text/css">
        {`.bg-${tagID} {
          background-color: ${tagColor};
          color: ${textColor};
          ${textColor === 'black' ? `border-color: black;` : ""}
          ${large ? `font-size: 20px;` : null} 
          ${large ? `margin-bottom: 10px;` : null} 
        }`}
      </style>
      <Badge bg={tagID}>{tagName ? capitalizeName(tagName) : "Tag-Name"}</Badge>
    </div>
  )
};

const colorButton = (tagColor, textColor, onClick) => {
  return (
    <>
      <Button variant={tagColor} value="test" data-tagcolor={tagColor} data-textcolor={textColor} onClick={onClick}>
        <style type="text/css">
          {`.btn-${tagColor} {
          width: 100%;
          border-radius: 0%;
          background-color: ${tagColor};
        }  
        .btn-${tagColor}:hover{
          filter: brightness(90%);
        }`}
        </style>
        <FontAwesomeIcon
          icon={faFillDrip}
          color={textColor}
        />
      </Button>
    </>
  )
};

// Use placeholder image if link is inaccurate
const imageErrorHandler = (currentTarget) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = placeholder;
  return currentTarget;
};

const handleEnterKeyDown = (event, submitFunction) => {
  if (event.key === "Enter" && event.shiftKey === false) {
    event.preventDefault();
    submitFunction(event);
  }
};

const getRandomInt = (maximum) => {
  return Math.floor(Math.random() * maximum);
};

const parseFractionAmount = (amount = 0) => {
  if (!amount) return null;
  if (isNaN(amount)) return null;
  if (amount === parseInt(amount)) return amount;
  let decimal = parseFloat((parseFloat(amount) - parseInt(amount)).toFixed(2));
  let amountView;
  let fraction;

  if (decimal === 0.25) {
    fraction = String.fromCharCode(188);
    amountView = parseInt(amount);
  } else if (decimal === 0.33) {
    fraction = String.fromCharCode(8531);
    amountView = parseInt(amount);
  } else if (decimal === 0.5) {
    fraction = String.fromCharCode(189);
    amountView = parseInt(amount);
  } else if (decimal === 0.67) {
    fraction = String.fromCharCode(8532);
    amountView = parseInt(amount);
  } else if (decimal === 0.75) {
    fraction = String.fromCharCode(190);
    amountView = parseInt(amount);
  } else {
    amountView = amount;
  }

  return <span>{amountView || null} {fraction || null}</span>;
};


export {
  capitalizeName,
  customBadge,
  colorButton,
  imageErrorHandler,
  handleEnterKeyDown,
  getRandomInt,
  parseFractionAmount
};

