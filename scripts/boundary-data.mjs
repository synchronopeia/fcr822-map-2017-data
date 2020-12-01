/* eslint-disable import/extensions */

import { readFileSync } from 'fs';

import slugifyName from './lib/slugify-name.mjs';
import parseIsoFromProperties from './lib/parse-iso-from-properties.mjs';

class BoundaryData {
  constructor(pathToJson) {
    this.worldGeojson = JSON.parse(readFileSync(pathToJson, 'utf-8'));
    this.worldGeojson.features = this.worldGeojson.features.map((feature) => ({
      ...feature,
      properties: { code: parseIsoFromProperties(feature.properties), 'country-id': slugifyName(feature.properties.NAME), name: feature.properties.NAME },
    }));

    this.geoJson = {
      type: 'FeatureCollection',
      features: [],
    };
  }

  findFeature(countryId) {
    return this.worldGeojson.features.find((feature) => (feature.properties['country-id'] === countryId));
  }

  addFeature(countryId, data) {
    const foundFeature = this.findFeature(countryId);
    if (foundFeature === undefined) {
      console.log(`world GeoJSON does not contain a feature for "${countryId}" so it will not be included.`);
      return;
    }
    this.geoJson.features.push({
      ...foundFeature,
      properties: { ...foundFeature.properties, ...data },
    });
  }

  getGeoJson() {
    return this.geoJson;
  }
}

export default BoundaryData;
