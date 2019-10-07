var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) {
        throw err
    };
    var dbo = db.db('mydb')
    var myobj = {
        name: "Company Inc",
        address: "Highwat 37"
    };
    dbo.createCollection("customers").insertOne(myobj, (err, res) => {
        if (err) {
            throw err
        };
        console.log("Document inserted");
        db.close();
    })
});