import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import GulpFileCache from 'gulp-file-cache';
import props from '../gulp-props.config';

const fiOptions = {
	prefix: '@@',
	basepath: `${props.SRC.HTML}/__INCLUDES__` // '@file' for relative path
};

const fileCache = new GulpFileCache(`${props.CACHE}/gulp-cache-html`);

gulp.task('html', () => {
	return gulp.src([`${props.SRC.HTML}/**/*.html`, `!${props.SRC.HTML}/__INCLUDES__/**/*`])
		.pipe(fileCache.filter())
		.pipe(fileInclude(fiOptions))
		.pipe(fileCache.cache())
		.pipe(gulp.dest(props.DEST.HTML));
});
