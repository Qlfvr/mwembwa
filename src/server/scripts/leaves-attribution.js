new Mongo();
db = connect(
  "mongodb://dev:dev@localhost:27017/mwenbwa?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
);
const usersQuery = db.users.find({}, "id");
// create array with every users to map easily afterwood
const users = [];
usersQuery.forEach((user) => {
  users.push(user._id);
});

// get sum of leaves for every tree owned by current user
users.forEach((user) => {
  let totalLeaves = 0;
  let treeQuery = db.trees.find({ owner: user });

  treeQuery.forEach((tree) => {
    //leaves on the tree = diameter* height  rounded up
    leavesOnTree = tree.diameter * tree.height;
    totalLeaves = Math.ceil(totalLeaves + leavesOnTree);
  });

//update leaves value for current user 
  db.users.updateOne({ _id: user }, { $inc: { leaves: totalLeaves } });
});
