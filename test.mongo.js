var db = new Mongo().getDB("playground");

db.employees.update({"_id" : ObjectId("5998991201d57c656db17852")}, { "name.middle": { $unset: 'new' } });
