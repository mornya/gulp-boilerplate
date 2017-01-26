import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import props from '../gulp-props.config';

const cleanCSSOptions = {
	compatibility: 'ie8'
};

gulp.task('cssmin', ['css'], () => {
	return gulp.src(`${props.DEST.CSS}/**/*.css`)
		.pipe(cleanCSS(cleanCSSOptions))
		.pipe(gulp.dest(props.DEST.CSS));
});
