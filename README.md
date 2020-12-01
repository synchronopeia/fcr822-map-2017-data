# FCR-822 Source Data, Definitions, and Scripts

## Note

This is a refactor of an interactive map/table created for a client website. This is the back-end script component.

The script itself is complete but this README is undergoing improvement.

## Purpose

The client maintains their source data in the form of a spreadsheet (CSV) [./client-files/data.csv](./client-files/data.csv). The file contains multiple tree-cover and finance fields (columns) listed by country name.

We use a script [./scripts/assemble-dataset.mjs](./scripts/assemble-dataset.mjs) to merge the relevant data fields from the client-supplied CSV with country boundary and centroid data to produce two GeoJSON files ```data-boundaries.geojson``` and ```data-centroids.geojson``` in [./public/json](./public/json).

These two GeoJSON files are suitable for creating interactive maps of the client's data.

The script also copies the underlying CSV data and data definitions into the corresponding public JSON files [./public/json/data-recs.json](./public/json/data-recs.json) and (./public/json/schema-defs.json)[./public/json/schema-defs.json].

## Source Data Columns:

1. Country
2. Tree Cover Loss (ha)
3. Tree Cover Loss (mha)
4. Rate of loss per year (%)
5. REDD+ phase 1 and 2 finance (USD million)
6. Development finance (USD million)
7. Results-based REDD+ finance commitments (USD million)
8. Results-based REDD+ finance disbursements (USD million)
9. Results-based REDD+ finance commitments (USD million) - bilateral
10. Results-based REDD+ finance disbursements (USD) - bilateral
11. FCPF Carbon Fund commitments based on LoIs and average price of 5USD
12. BioCarbon Fund ISFL,REDD+ phase 1 and 2 bilateral finance (USD million commitments/disbursements)
13. REDD+ phase 1 and 2 bilateral finance (commitments/disbursements?)
14. REDD+ phase 1 and 2 finance commitments (USD million) - multilateral

## Configuration Files

### Schema Defs

[./etc/src-data-schema.mjs](./etc/src-data-schema.mjs)

This single definition file bridges the client's CSV data with the public JSON data file. The property ```colLabel``` references the CSV column from which the source data is read, whereas the property ```fieldId``` references the respective recordset property name.

This arrangement neatly documents the relationship between client and internal data, and allows for source-data changes that the client is likely to submit through updated CSV.

## Output Public Data Files

- data-boundaries.geojson
- data-centroids.geojson
- data-recs.json
- schema-defs.json

## Requirements

We are using es6 modules (Node version >= 13.2.0).

See [Announcing core Node.js support for ECMAScript modules](https://medium.com/@nodejs/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663).
