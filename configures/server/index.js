import express from 'express';
import path from 'path';
import routeDemo from './routes/demo';

const SERVER_PORT = 3000;
const WEBROOT = path.resolve('server/build');
const app = express();

app.listen(SERVER_PORT, () => {
	console.info('Express listening on port ' + SERVER_PORT);
});

app.use('/', express.static(WEBROOT));
app.use('/demo', routeDemo);

app.get('/hello', (req, res) => {
	return res.send('Can you hear me?');
});
