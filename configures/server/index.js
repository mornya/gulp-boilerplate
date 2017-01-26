import express from 'express';
import routeDemo from './routes/demo';

const SERVER_PORT = 3000;
const WEBROOT = __dirname + '/../webroot';
const app = express();

app.listen(SERVER_PORT, () => {
	console.log('Express listening on port ' + SERVER_PORT);
});

app.use('/', express.static(WEBROOT));
app.use('/demo', routeDemo);

app.get('/hello', (req, res) => {
	return res.send('Can you hear me?');
});
