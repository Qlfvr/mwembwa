new Mongo();
db = connect(
    "mongodb://dev:dev@localhost:27017/mwenbwa?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
);
const usersQuery = db.users.find({});
// create array with every users to map easily afterwood
const users = [];
usersQuery.forEach((user) => {
    let newLeaves = Math.ceil(user.leaves / 2);


    //update leaves value for current user
    db.users.updateOne({_id: user._id}, {$set: {leaves: newLeaves}});
});
