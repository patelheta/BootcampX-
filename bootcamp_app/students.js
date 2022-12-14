const { Pool } = require('pg');

const pool = new Pool({
  user: 'maulik',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
let args = process.argv.slice(2);
let values = [`%${args[0]}%`, args[1]];
let queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;
pool.query(queryString, values)
  .then(res => {
    console.log(res.rows);
    for (let user of res.rows) {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    }
  })
  .catch(err => console.error('query error', err.stack));