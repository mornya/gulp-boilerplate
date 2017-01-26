import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import props from '../gulp-props.config';

const nodemonOptions = {
	script: props.DEST.SERVER + '/index.js',
	watch: props.DEST.SERVER
};

gulp.task('start:release', () => {
	return nodemon(nodemonOptions);
});
