var should = require("should-http");
var request = require("supertest");

describe("announcements", function() {
  var url = "localhost:5000";

  describe('update()', function () {

    var update = {
      'userId': '3',
      'title': 'A new title announcement',
      'description': 'A new announcement description',
      'datePosted': '2015-11-11',
      'expiryDate': '2015-11-31'
    };

    it('should update a specific announcement', function (done) {
      request(url)
        .put('/api/announcements/1')
        .send(update)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          else {
            res.should.have.status(200);
            res.body.should.have.property('userId', '3');
            res.body.should.have.property('title', 'A new title announcement');
            res.body.should.have.property('description', 'A new announcement description');
            res.body.should.have.property('datePosted', '2015-11-11');
            res.body.should.have.property('expiryDate', '2015-11-31');
            done();
          }
        });
    });

    it('should return error trying to update an announcement that does not exist', function (done) {
      request(url)
        .put('/api/announcements/0')
        .send(update)
        .end(function(err, res) {
          if (err) {
             done();
          }
          else {
             throw new Error({'message': 'Can retrieve a non-existent announcement'});
          }
        });
    });
  });

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
