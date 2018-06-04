const expect = require('expect');

const utils = require('./utils');

describe('Utils', ()=> {


    describe('#add', ()=> {
        it('should add two numbers', () => {
            var res = utils.add(10, 10);

            expect(res).toBe(20).toBeA('number');
        });
    });

    describe('#asyncAdd', ()=> {
        it('should add two numbers after 1 second', (done) => {
            utils.asyncAdd(10, 10, (sum) => {
                expect(sum).toBe(20).toBeA('number'); 
                done();
            });
        });
    });

    describe('#square', ()=> {
        it('should square root the number value', () => {
            var res = utils.square(2);
            expect(res).toBe(4).toBeA('number');
        });
    });

    describe('#asyncsquare', ()=> {
        it('should square root the number value after 1 second', (done) => {
            utils.asyncsquare(2, (sqRootSum) => {
                expect(sqRootSum).toBe(4).toBeA('number'); 
                done();
            }); 
        });
    });

    
});

describe('utils test', ()=> {

    it('should expect some values', () => {
        expect(12).toNotBe(11);
    });

    it('should expect some object values', () => {
        expect({
            name: 'Paul'
        }).toEqual({
            name: 'Paul'
        });
    });

    it('should include a value in an array', () => {
        expect([2,4,5]).toInclude(4);
    });

    it('should include a property value in an object', () => {
        expect({
            name: 'Paul',
            age: 37
        }).toExclude({ age: 36 });
    });

    it('should can an object with firstname and lastname property values', ()=> {
        const user = { location: 'Belfast', age: 37 }
        const res = utils.setName(user, 'Paul Matchett');
        expect(res).toInclude({
            firstName: 'Paul',
            lastName: 'Matchett'
        });
    });

});

