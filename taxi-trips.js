const { Pool } = require("pg");

module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {
        const tripCount = await pool.query('SELECT * FROM trip')
        return tripCount.rows

    }
    
    async function findAllRegions(){
        const allRegions = await pool.query('SELECT * FROM region')
        return allRegions.rows

    }

    async function findTaxisForRegion(regionName){
        // find all the taxis for a given region - use region name as look up
        const findRegionId = await pool.query('SELECT id FROM region WHERE name = $1', [regionName]);
        const checkRegNum = await pool.query('SELECT reg_num FROM taxi');

        const regSubsting = checkRegNum.substing(0,2)
        if (regSubsting == 'CA'){
            await pool.query('INSERT INTO taxi(region_id) values ($1)', [findRegionId])
        }
        if (regSubsting == 'ND'){
            await pool.query('INSERT INTO taxi(region_id) values ($1)', [findRegionId])
        }
        if (regSubsting == 'GP'){
            await pool.query('INSERT INTO taxi(region_id) values ($1)', [findRegionId])
        }
        
        const allTaxisForRegion = await pool.query('SELECT reg_num FROM taxi WHERE region_id = $1', [findRegionId])
        return allTaxisForRegion.rows
    }

    return {
        totalTripCount,
        findAllRegions,
        findTaxisForRegion
    }
}