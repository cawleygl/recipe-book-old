import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import placeholder from '../assets/logo512.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFillDrip } from '@fortawesome/free-solid-svg-icons'

const capitalizeName = (name) => {
  if (!name) {
    return;
  }
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
};

const customBadge = (tagName, index, tagID, tagColor, textColor, large) => {
  return (
    <div key={index}>
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

export {
  capitalizeName,
  customBadge,
  colorButton,
  imageErrorHandler
};

