const pg       = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const targetObj = {
  text: "SELECT * FROM famous_people WHERE first_name = $1",
  values: [process.argv[2]]
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching ...");

  client.query(targetObj, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found ${result.rows.length} person(s) by the name \'${process.argv[2]}\':`);
    for (let i = 0; i < result.rows.length; i++) {
      console.log(`${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born \'${result.rows[i].birthdate}\'`);
    }
    client.end();
  });
});