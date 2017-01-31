import gulp from 'gulp';
import babel from 'gulp-babel';
import path from 'path';
import fromJSON from '../functions/fromJSON';
import props from '../gulp-props.config';

gulp.task('babelServer', () => {
	return gulp.src(`${props.SRC.SERVER}/**/*.js`)
		.pipe(babel(fromJSON(path.resolve('.babelrc'))))
		.pipe(gulp.dest(props.DEST.SERVER));
});
