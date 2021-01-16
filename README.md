## livelihood-zones-api

> GeoJSON API for the livelihood zones map.

### Content

- Prerequisites
- Installation
- Usage
- Shapefile Attributes
- PostGIS Table Schema

## Prerequisites

The prerequisites' versions are optional. Feel free to try other versions.

1. NodeJS
   - node v10.16.3
   - npm v6.9
2. PostgreSQL
   - version 10
   - with PostGIS extension installed

## Installation

1. Clone this repository.  
`git clone https://github.com/ciatph/livelihood-zones-api.git`
2. Install dependencies.  
`npm install`
1. Copy the content of **.env.example** into a **.env** file. Replace the values of `LOCAL_*`, `DB_*` and `DEV_*` with your local postgresql database and user credentials.
2. Run the **postgresql**  service.
3. Create a database and enable the PostGIS extensions on it.
4. Create or populate a table named `"GeoJsons"` inside the database to work with in either of the 2 ways:
   - by using **shp2pgsql** to import a shapefile into the `"GeoJsons"` table.  
`shp2pgsql -I -s 4326 -W "latin1" shapefile.shp GeoJsons | psql -d <DB_NAME> -U <USER> -h <HOST_NAME>`
      > **INFO:** the shapefile must follow the format described in the [**Shapefile Attributes**](#shapefile-attributes) section.
   - by restoring a **pgdunp** of an existing database with a `"GeoJsons"` table, whose content follow the schema mentioned below.  
`psql -U postgres -d <DB_NAME> < geojsons-dump.sql`
1. Replace the values of `GEOM_*` from the **.env** file into your PostGIS table's fields:
   - `GEO_PRIMARY_KEY` - primary key ID (gid)
   - `GEO_COLUMN` - geometry column (geom)
   - `GEO_TABLE` - table name (public."GeoJsons")

## Usage

1. Build the client.  
`npm run build`
2. Run the app.  
`npm run dev`
3. Load the app on `http://localhost:3001`.
4. Sample usage:  
    ```
    // Add a GeoJSON Layer to a leafletjs map
    $.ajax({
      url: `http://localhost:3001/api/province`,
      data: { name: 'Laguna' },
      success: (geojson) => {
        L.geoJSON(geojson).addTo(map)
      }
    })
    ```

## References

### Shapefile Attributes

The shapefile should have the (3) attributes.

1. **adm3_en** - {String} province name
2. **adm2_en** - {String} municipality name
3. **livelihood** - {String} livelihood class

### PostGIS Table Schema

1. `gid` - {Integer} primary key
2. `geom` - {Geometry}
3. **adm3_en** - {String} province name
4. **adm2_en** - {String} municipality name
5. **livelihood** - {String} livelihood class

@ciatph  
20210114