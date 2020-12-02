/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */

/**
 * Script to convert client CSV data file to corresponding GeoJSON boundary and centroid files
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import csv from 'csv';
import { fromCsv } from '@synchronopeia/csv-recordset';

import slugifyName from './lib/slugify-name.mjs';
import parseIsoFromProperties from './lib/parse-iso-from-properties.mjs';
import parseNumberOrNull from './lib/parse-number-or-null.mjs';

import BoundaryData from './boundary-data.mjs';
import CentroidData from './centroid-data.mjs';

import srcDataSchema from '../etc/src-data-schema.mjs';

const PUBLIC_DIR = join('public', 'json');
const CLIENT_DIR = join('client-files');
const CLIENT_DATA_PATH = join(CLIENT_DIR, 'data.csv');

const boundaryData = new BoundaryData('./scripts/data/world.geojson');
const centroidData = new CentroidData('./scripts/data/country-centroids.json');

const worldGeojson = JSON.parse(readFileSync('./scripts/data/world.geojson', 'utf-8'));

worldGeojson.features = worldGeojson.features.map((feature) => ({
  ...feature,
  properties: { code: parseIsoFromProperties(feature.properties), 'country-id': slugifyName(feature.properties.NAME), name: feature.properties.NAME },
}));

csv.parse(readFileSync(CLIENT_DATA_PATH, 'utf-8'), {
  columns: false,
  skip_empty_lines: true,
  trim: true,
  from: 1,
}, (parseErr, clientDataTable) => {
  if (parseErr) throw Error(parseErr);
  const rawRecs = fromCsv(clientDataTable, srcDataSchema).map((rec) => ({
    ...rec,
    'country-id': slugifyName(rec.name),
  }));
  const dataRecs = rawRecs.map((rawRec) => {
    const dataRec = {};
    srcDataSchema.forEach((schemaDef) => {
      const value = (schemaDef.parse === 'number') ? parseNumberOrNull(rawRec[schemaDef.fieldId]) : rawRec[schemaDef.fieldId];
      dataRec[schemaDef.fieldId] = value;
    });
    boundaryData.addFeature(rawRec['country-id'], { ...dataRec });
    centroidData.addFeature(rawRec['country-id'], { ...dataRec });
    return dataRec;
  });

  writeFileSync(join(PUBLIC_DIR, 'schema-defs.json'), JSON.stringify(srcDataSchema));
  writeFileSync(join(PUBLIC_DIR, 'data-recs.json'), JSON.stringify(dataRecs));
  writeFileSync(join(PUBLIC_DIR, 'data-boundaries.geojson'), JSON.stringify(boundaryData.getGeoJson()));
  writeFileSync(join(PUBLIC_DIR, 'data-centroids.geojson'), JSON.stringify(centroidData.getGeoJson()));
});
