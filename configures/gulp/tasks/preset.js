import gulp from 'gulp';
import mkdirp from 'mkdirp';
import props from '../gulp-props.config';

gulp.task('preset', () => {
	return mkdirp.sync(props.CACHE);
});
