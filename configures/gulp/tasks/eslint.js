import gulp from 'gulp';
import eslint from 'gulp-eslint';
import props from '../gulp-props.config';

gulp.task('eslint', () => {
	return gulp.src(['gulpfile.*', `${props.SRC.SERVER}/**/*.js`, `${props.SRC.JS}/**/*.js`])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
