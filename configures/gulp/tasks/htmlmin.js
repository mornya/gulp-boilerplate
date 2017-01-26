import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import props from '../gulp-props.config';

const htmlminOptions = {
	collapseWhitespace: true
};

gulp.task('htmlmin', ['html'], () => {
	return gulp.src(`${props.DEST.HTML}/**/*.html`)
		.pipe(htmlmin(htmlminOptions))
		.pipe(gulp.dest(props.DEST.HTML));
});
