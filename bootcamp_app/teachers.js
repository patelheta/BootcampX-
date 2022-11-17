const { Pool } = require('pg');

const pool = new Pool({
  user: 'maulik',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
let args = process.argv.slice(2);
let values = [`${args[0]}`];
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`, values)
  .then(res => {
    console.log(res.rows);
    for (let teacher of res.rows) {
      console.log(`${teacher.cohort}: ${teacher.teacher}`);
    }
  })
  .catch(err => console.error('query error', err.stack));