import gutil from 'gulp-util';
import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
	gutil.log('Time:', Date.now().toString());
	next();
});

router.get('/', (req, res) => {
	res.redirect('/demo/1');
});

router.get('/:id', (req, res) => {
	res.send('You choiced ' + req.params.id);
});

export default router;