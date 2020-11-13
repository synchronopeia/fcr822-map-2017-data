# FCR-822 Source Data, Definitions, and Scripts

## Client Files

```./client-files/data.csv```

Columns:

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

### Country Defs

[./etc/country-defs.json](./etc/country-defs.json)

#### Properties

- __code__ ISO3166
- __name__
- __latitude__
- __longitude__
- __slug__ deburred kebab-case name

### Schema Defs

[./etc/src-data-schema.mjs](./etc/src-data-schema.mjs)

This single definition file bridges the client's CSV data with the public JSON data file. The property ```colLabel``` references the CSV column from which the source data is read, whereas the property ```fieldId``` references the respective recordset property name.

This arrangement neatly documents the relationship between client and internal data, and allows for source-data changes that the client is likely to submit through updated CSV.

## Public Data Files

- data-recs.json
- data-recs.min.json

## Scripts

### assemble-dataset.mjs

The client maintains their source data in the form of a spreadsheet (CSV) [./client-files/data.csv](./client-files/data.csv). The file contains multiple tree-cover and finance fields (columns) listed by country name.

```assemble-dataset.mjs``` merges the relevant data fields from the client-supplied CSV with [./etc/country-defs.json](./etc/country-defs.json) to produce a single output file [./public/json/data-recs.json](./public/json/data-recs.json) containing only the relevant client fields, plus ISO3166, latitude, and longitude.

## Requirements

We are using es6 modules (Node version >= 13.2.0).

See [Announcing core Node.js support for ECMAScript modules](https://medium.com/@nodejs/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663).
