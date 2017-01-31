import gulp from 'gulp';
import GulpFileCache from 'gulp-file-cache';
import props from '../gulp-props.config';

const fileCache = new GulpFileCache(`${props.CACHE}/gulp-cache-images`);

gulp.task('images', () => {
	return gulp.src(`${props.SRC.IMAGES}/**/*`)
		.pipe(fileCache.filter())
		.pipe(fileCache.cache())
		.pipe(gulp.dest(props.DEST.IMAGES));
});
