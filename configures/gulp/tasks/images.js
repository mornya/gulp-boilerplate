import gulp from 'gulp';
import props from '../gulp-props.config';

gulp.task('images', () => {
	return gulp.src(`${props.SRC.IMAGES}/**/*`)
		.pipe(gulp.dest(props.DEST.IMAGES));
});
