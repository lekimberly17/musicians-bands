const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index');

describe('Band and Musician Models', () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
    });
  
    describe('Band Model', () => {
      test('can create a Band', async () => {
        const band = await Band.create({
          name: 'The Beatles',
          genre: 'Rock',
        });
        const retrievedBand = await Band.findOne({ where: { name: 'The Beatles' } });
        expect(retrievedBand.name).toEqual(band.name);
        expect(retrievedBand.genre).toEqual(band.genre);
      });

      describe('Musician Model', () => {
        test('can create a Musician', async () => {
          const musician = await Musician.create({
            name: 'John Doe',
            instrument: 'Guitar',
          });
          const retrievedMusician = await Musician.findOne({ where: { name: 'John Doe' } });
          expect(retrievedMusician.name).toEqual(musician.name);
          expect(retrievedMusician.instrument).toEqual(musician.instrument);
        });
      });
  
      describe('Adding musicians to a band', () => {
        let band;
  
        beforeAll(async () => {
          band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        });
  
        it('should add multiple musicians to a band', async () => {
          const musician1 = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
          const musician2 = await Musician.create({ name: 'Paul McCartney', instrument: 'Bass' });
          const musician3 = await Musician.create({ name: 'George Harrison', instrument: 'Guitar' });
  
          await band.addMusicians([musician1, musician2, musician3]);
  
          const musicians = await band.getMusicians();
          expect(musicians).toContainEqual(expect.objectContaining({
            name: musician1.name,
            instrument: musician1.instrument,
          }));
          expect(musicians).toContainEqual(expect.objectContaining({
            name: musician2.name,
            instrument: musician2.instrument,
          }));
          expect(musicians).toContainEqual(expect.objectContaining({
            name: musician3.name,
            instrument: musician3.instrument,
          }));
        });
      });
  


    describe('Adding songs to a band', () => {
        let band;
      
        beforeAll(async () => {
          band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        });
      
        it('should add multiple songs to a band', async () => {
          const song1 = await Song.create({ title: 'Yesterday', year: 1965 });
          const song2 = await Song.create({ title: 'Hey Jude', year: 1968 });
          const song3 = await Song.create({ title: 'Let It Be', year: 1970 });
      
          await band.addSongs([song1, song2, song3]);
      
          const songs = await band.getSongs();
          expect(songs).toContainEqual(expect.objectContaining({
            title: song1.title,
            year: song1.year,
          }));
          expect(songs).toContainEqual(expect.objectContaining({
            title: song2.title,
            year: song2.year,
          }));
          expect(songs).toContainEqual(expect.objectContaining({
            title: song3.title,
            year: song3.year,
          }));
        });
      })
      
    });

    describe('Eager loading musicians for a band', () => {
        let band;
      
        beforeAll(async () => {
          await sequelize.sync({ force: true });
          band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
          const musician1 = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
          const musician2 = await Musician.create({ name: 'Paul McCartney', instrument: 'Bass' });
          const musician3 = await Musician.create({ name: 'George Harrison', instrument: 'Guitar' });
          await band.addMusicians([musician1, musician2, musician3]);
        });
      
        it('should load associated musicians with eager loading', async () => {
          const loadedBand = await Band.findOne({
            where: { name: 'The Beatles' },
            include: Musician,
          });
      
          // Check that the loaded band has the expected musicians
          expect(loadedBand.Musicians).toHaveLength(3);
          expect(loadedBand.Musicians.map(musician => musician.name)).toEqual([
            'John Lennon',
            'Paul McCartney',
            'George Harrison',
          ]);
        });
      });
  
});

  
