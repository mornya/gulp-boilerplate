import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import htmlIndex from '../functions/htmlindex';
import props from '../gulp-props.config';

const nodemonOptions = {
	script: props.DEST.SERVER + '/index.js',
	watch: props.DEST.SERVER
};
const bsOptions = {
	proxy: `http://localhost:${props.SERVER.port}`,
	files: [props.WEBROOT + '/**/*'],
	port: props.BS.port
};

gulp.task('start:dev', () => {
	let isFirst = true;

	return nodemon(nodemonOptions)
		.on('start', () => {
			if (isFirst) {
				htmlIndex(() => {
					// init browser-sync on server start at first time.
					browserSync.init(null, bsOptions);
					isFirst = false;
				})
			}
		});
});
