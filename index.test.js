const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // Create a new band
        const band = await Band.create({
            name: 'The Beatles',
            genre: 'Rock'
        });

        // Retrieve the band from the database
        const retrievedBand = await Band.findOne({ where: { name: 'The Beatles' } });

        // Check that the retrieved band matches the original band
        expect(retrievedBand.name).toEqual(band.name);
        expect(retrievedBand.genre).toEqual(band.genre);
    })

    test('can create a Musician', async () => {
        // Create a new musician
        const musician = await Musician.create({
            name: 'John Doe',
            instrument: 'Guitar'
        });

        // Retrieve the musician from the database
        const retrievedMusician = await Musician.findOne({ where: { name: 'John Doe' } });

        // Check that the retrieved musician matches the original musician
        expect(retrievedMusician.name).toEqual(musician.name);
        expect(retrievedMusician.instrument).toEqual(musician.instrument);
    })
})
