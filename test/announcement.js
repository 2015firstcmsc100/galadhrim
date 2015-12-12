var should = require("should-http");
var request = require("supertest");

describe("announcements", function() {
  var url = "localhost:5000";

  describe("remove()", function() {
    it("should return the deleted announcement", function(done) {
      request(url)
        .delete("/api/announcements/0")
        .end(function(err, res) {
          if(err) {
            done();
          } else {
            res.should.have.status(202);
            res.body.should.be.an.instanceof(Object);
            res.should.have.properties(["_id", "userId", "title", "description", "datePosted", "expiryDate", "_created", "_recStatus"]);
          }
        });
    });

    it("should mark _recStatus of announcement as DELETED", function(done) {
      request(url)
        .delete("/api/announcements/0")
        .end(function(err, res) {
          if(err) {
            done();
          } else {
            res.should.have.status(202);
            res.should.have.property("_recStatus", "DELETED");
            done();
          }
        });
    });

    it("should return error trying to delete an announcement record that does not exist", funtion(done) {
      request(url)
        .delete("/api/announcements/pogi")
        .end(function(err, res) {
          if(err) {
            done();
          } else {
            throw new Error({
              "message": "Can delete an announcement record that does not exist."
            });
          }
        });
    });
  });
});
