/* eslint-disable import/extensions */

const parseIsoFromProperties = (properties) => {
  if (properties.ISO_A2 !== '-99') return properties.ISO_A2; // ISO 3166
  if (properties.NAME === 'France') return 'FR';
  if (properties.NAME === 'Norway') return 'NO';
  return '';
};

export default parseIsoFromProperties;
