import fs from 'fs';

const fromJSON = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));

export default fromJSON;
