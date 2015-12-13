describe("selectHonor()", function(){
            it("retrieve honor students", function(done){         
                   request("http://localhost:5000")
                   .get("/api/students/honor")
                   .end(function(err, res){
                     res.should.have.status(200);
                     res.body.should.have.property('grade');
                     res.body.data.should.be.an.instanceOf(Array);
                     done();
                   });
               
              });
              
               it("not an honor student", function(done){        
                   request("http://localhost:5000")
                   .get("/api/students/honor")
                   .end(function(err, res){
                     res.should.have.status(404);
                     done();
                   });
               
              });
       });
       
       
 
