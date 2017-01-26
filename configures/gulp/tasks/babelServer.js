import gulp from 'gulp';
import babel from 'gulp-babel';
import GulpFileCache from 'gulp-file-cache';
import path from 'path';
import fromJSON from '../functions/fromJSON';
import props from '../gulp-props.config';

const cache = new GulpFileCache();

gulp.task('babelServer', () => {
	return gulp.src(`${props.SRC.SERVER}/**/*.js`)
		.pipe(cache.filter())
		.pipe(babel(fromJSON(path.resolve('.babelrc'))))
		.pipe(cache.cache())
		.pipe(gulp.dest(props.DEST.SERVER));
});
