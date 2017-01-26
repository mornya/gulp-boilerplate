import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import props from '../gulp-props.config';

const imageminOptions = {
	progressive: true,
	interlaced: true,
	svgoPlugins: [
		{removeViewBox: false},
		{removeUselessStrokeAndFill: false}
	]
};

gulp.task('imagesmin', ['images'], () => {
	return gulp.src(`${props.DEST.IMAGES}/**/*.{gif,jpg,png}`)
		.pipe(imagemin(imageminOptions))
		.pipe(gulp.dest(props.DEST.IMAGES));
});
