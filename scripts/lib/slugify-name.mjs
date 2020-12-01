import deburr from 'lodash.deburr';
import kebabCase from 'lodash.kebabcase';

const slugifyName = (countryName) => kebabCase(deburr(countryName.trim()));

export default slugifyName;
