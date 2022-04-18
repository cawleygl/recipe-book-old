const capitalizeName = (name) => {
  if (!name) {
    return;
  }
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
};

export {
  capitalizeName
};

