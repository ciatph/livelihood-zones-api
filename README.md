## livelihood-zones-api

> GeoJSON API for the livelihood zones map.

### Prerequisites

The prerequisites' versions are optional. Feel free to try other versions.

1. NodeJS
   - node v10.16.3
   - npm v6.9
2. PostgreSQL
   - version 10
   - with PostGIS extension installed

## Usage

1. Clone this repository.  
`git clone https://github.com/ciatph/livelihood-zones-api.git`
2. Install dependencies.  
`npm install`
1. Copy the content of **.env.example** into a **.env** file. Replace the values of `LOCAL_*`, `DB_*` and `DEV_*` with your local postgresql database and user credentials.
2. Run the **postgresql**  service.
3. Create a PostGIS database.
4. Create or restore a PostGIS table inside the database.
5. Replace the values of `GEOM_*` from the **.env** file into your PostGIS table's fields:
   - `GEO_PRIMARY_KEY` - primary key ID
   - `GEO_COLUMN` - geometry column
   - `GEO_TABLE` - table name
6. Run the api.  
`npm run dev`
9. Open on `http://localhost:3001/api/ping`
10. Generate the documentation for reference.
       - `npm run build`
       - Open the created `/apidocs` directory and click index.html  
11. Sample usage:  
    ```
    // Add a GeoJSON Layer to a leafletjs map
    $.ajax({
      url: `http://localhost:3001/api/province`,
      data: { province: 'Laguna' },
      success: (geojson) => {
        L.geoJSON(geojson).addTo(map)
      }
    })
    ```

@ciatph  
20210114