import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import props from '../gulp-props.config';

const fiOptions = {
	prefix: '@@',
	basepath: `${props.SRC.HTML}/__INCLUDES__` // '@file' for relative path
};

gulp.task('html', () => {
	return gulp.src([`${props.SRC.HTML}/**/*.html`, `!${props.SRC.HTML}/__INCLUDES__/**/*`])
		.pipe(fileInclude(fiOptions))
		.pipe(gulp.dest(props.DEST.HTML));
});
