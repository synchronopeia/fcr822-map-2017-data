import { readFileSync } from 'fs';

class CentroidData {
  constructor(pathToJson) {
    this.centroidDefs = JSON.parse(readFileSync(pathToJson, 'utf-8'));

    this.geoJson = {
      type: 'FeatureCollection',
      features: [],
    };
  }

  findDef(countryId) {
    return this.centroidDefs.find((def) => (def['country-id'] === countryId));
  }

  findCentroid(countryId) {
    const def = this.findDef(countryId);
    if (def === undefined) return undefined;
    return def.centroid;
  }

  addFeature(countryId, data) {
    const foundDef = this.findDef(countryId);
    if (foundDef === undefined) {
      console.log(`centroidDefs does not contain a feature for "country-id" "${countryId}" so it will not be included.`);
      return;
    }
    this.geoJson.features.push({
      properties: { 'country-id': countryId, ...data },
      geometry: { type: 'Point', coordinates: foundDef.centroid },
    });
  }

  getGeoJson() {
    return this.geoJson;
  }
}

export default CentroidData;
