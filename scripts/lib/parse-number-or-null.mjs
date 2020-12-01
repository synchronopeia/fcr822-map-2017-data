const parseNumberOrNull = (src) => {
  if (typeof src !== 'string') throw Error('NON_STRING: src must be a string');
  if (!src.length) return null;
  const srcNum = Number(src);
  if (Number.isNaN(srcNum)) throw Error(`NON_NUMBER: src cannot be converted to a number ('${src}')`);
  return srcNum;
};

export default parseNumberOrNull;
