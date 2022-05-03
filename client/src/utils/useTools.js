import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";

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
          ${large ? `font-size: 20px;` : null} 
          ${large ? `margin-bottom: 10px;` : null} 
        }`}
      </style>
      <Badge bg={tagID}>{tagName ? capitalizeName(tagName) : "Tag-Name"}</Badge>
    </div>
  )
};

const colorButton = (color, iconColor, callBack) => {
  return (
    <>
      <Button variant={color} value={color} onClick={callBack}>
      <style type="text/css">
        {`.btn-${color} {
          background-color: ${color};
          ${color === 'white' ? `border-color: black`: "null"}
        }  
        .btn-${color}:hover{
          ${color === 'black' ? `background-color: #4d4d4d`: `filter: brightness(90%)`}
          ;
        }`}
      </style>

        <FontAwesomeIcon 
        icon={faFillDrip} 
        color={iconColor} 
        />
      </Button>
    </>
  )
};


export {
  capitalizeName,
  customBadge,
  colorButton
};

