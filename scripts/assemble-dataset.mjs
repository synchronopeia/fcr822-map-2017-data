/* eslint-disable import/extensions */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import csv from 'csv';
import deburr from 'lodash.deburr';
import kebabCase from 'lodash.kebabcase';

import { fromCsv } from '../lib/csv-recordset.mjs';

import srcDataSchema from '../etc/src-data-schema.mjs';

const CLIENT_DATA_PATH = join('client-files', 'data.csv');

const parseNumberOrNull = (src) => {
  if (typeof src !== 'string') throw Error('NON_STRING: src must be a string');
  if (!src.length) return null;
  const srcNum = Number(src);
  if (Number.isNaN(srcNum)) throw Error(`NON_NUMBER: src cannot be converted to a number ('${src}')`);
  return srcNum;
};

const countryDefs = JSON.parse(readFileSync('./etc/country-defs.json', 'utf-8'));

const countryNames = JSON.parse(readFileSync('./etc/country-names.json', 'utf-8'));

csv.parse(readFileSync(CLIENT_DATA_PATH, 'utf-8'), {
  columns: false,
  skip_empty_lines: true,
  trim: true,
  from: 1,
}, (parseErr, clientDataTable) => {
  if (parseErr) throw Error(parseErr);
  const clientDataRecs = fromCsv(clientDataTable, srcDataSchema).map((rec) => ({
    ...rec,
    slug: kebabCase(deburr(rec.name)),
  }));
  const dataset = clientDataRecs.map((inputRec) => {
    // countryDef provides ISO3166 code (used as country-id), latitude, and longitude
    // const countryDef = countryDefs.find((def) => (def.slug === inputRec.slug));
    const countryDef = countryNames.find((def) => (def.slug === inputRec.slug));
    if (countryDef === undefined) throw Error(`MISSING_COUNTRY_DEF: no country definition for ${inputRec.slug}`);
    const outputRec = {
      'country-id': countryDef.code,
      slug: countryDef.slug,
      // latitude: countryDef.latitude,
      // longitude: countryDef.longitude,
    };
    // all other properties come from inputRecs (spreadsheet supplied by client)
    srcDataSchema.forEach((schemaDef) => {
      if (Object.prototype.hasOwnProperty.call(outputRec, schemaDef.fieldId)) return;
      // set any properties that haven't already been set
      outputRec[schemaDef.fieldId] = (schemaDef.parse === 'number') ? parseNumberOrNull(inputRec[schemaDef.fieldId]) : inputRec[schemaDef.fieldId];
    });
    return outputRec;
  });
  writeFileSync('./public/json/data-recs.json', JSON.stringify(dataset));
});
