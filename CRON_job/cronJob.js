const fs = require('fs');

// Function to append text to a file
function appendToFile(filename, text) {
    fs.appendFileSync(filename, text + '\n');
}

// Log "Hello cron job"
appendToFile('cron_job_log.txt', 'Hello cron job');

