const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', ()=> {

    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', ()=>{
        var spy = expect.createSpy();
        spy();
        expect(spy).toHaveBeenCalled();
    });


    it('should call the spy correctly with', ()=>{
        var spy = expect.createSpy();
        spy('Paul', 37);
        expect(spy).toHaveBeenCalledWith('Paul', 37);
    });

    it('should call saveUser as another object', ()=>{
        var email = 'paul.matchett@unosquare.com';
        var password = '123abc';

        app.handleSignUp(email, password); 
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });

});