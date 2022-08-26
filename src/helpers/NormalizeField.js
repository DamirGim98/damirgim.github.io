function NormalizeField(data) {
  return data.map(({ location: name, ...rest }) => ({
    name,
    ...rest,
  }));
}

export default NormalizeField;
