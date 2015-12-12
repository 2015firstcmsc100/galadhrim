var request = require('supertest'),
    should= require('should-http'),
    config = require('../config/config');

describe('Retrieve All TCG requests',function(){ 
        var url = supertest.agent('http://localhost:' + config.port);
            it('should return array of TCG requests', function(done){
                request(url)
                .get('/api/tcg')   
                .end(function(err,res){
                    if(err) throw err;
                    res.should.have.status(200);
                    res.body.should.be.an.instanceOf(Array);
                    done();
                });
            });
            
              it('should return error code 404', function(done){
                request(url)
                .get('/api/tcg')   
                .end(function(err,res){
                    if(err) throw err;
                    res.should.have.status(404);
                    done();
                });
            });
        });
