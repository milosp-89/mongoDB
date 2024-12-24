// count of submissions from and before 2022

var total = db.submissions.find({}).count()
var diff = db.submissions.find({
  "_received_at": { $gt: ISODate("2022-01-01T00:00:00Z") }
}).count()

// check:
total - diff
