import Badge from "react-bootstrap/esm/Badge";

const capitalizeName = (name) => {
  if (!name) {
    return;
  }
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
};

const badgeLabel = (tagName, index, tagID, tagColor) => {
  return (<>
    <style type="text/css">
      {`.bg-${tagID} {
          background-color: ${tagColor};
        }`}
    </style>
    <Badge key={index} bg={tagID}>{capitalizeName(tagName)}</Badge>
  </>)
};


export {
  capitalizeName,
  badgeLabel
};

