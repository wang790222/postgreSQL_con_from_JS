const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex.select('*').from('famous_people').where('first_name', "=", process.argv[2])
.asCallback(function(err, rows) {
  if (err) {
    return console.error(err);
  }
  console.log("Searching ...");

  console.log(`Found ${rows.length} person(s) by the name \'${process.argv[2]}\':`);
  for (let i = 0; i < rows.length; i++) {
    console.log(`${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born \'${rows[i].birthdate}\'`);
  }

}).finally(function() {
  knex.destroy();
});