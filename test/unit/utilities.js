var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the client.lib methods', function() {
    it('should have all the necessary methods', function(){
        expect(utils.getLocation).to.not.be.undefined;
        expect(utils.storeLocation).to.not.be.undefined;
    });
    it('should return true when getting current location', function(){
        var result = utils.getLocation();
        expect(result).to.equal(true);
    });
    it('should add longitude and latitude properties to utils', function(){
        var result = utils.getLocation();
        expect(utils.longitude).to.not.be.undefined;
        expect(utils.latitude).to.not.be.undefined;
    });
});
