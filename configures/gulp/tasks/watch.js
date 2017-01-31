import gulp from 'gulp';
import gutil from 'gulp-util';
import props from '../gulp-props.config';

const watcher = {
	js: gulp.watch(`${props.SRC.JS}/**/*.js`, ['eslint']), // js build/watch는 webpack에서
	css: gulp.watch(`${props.SRC.CSS}/**/*.scss`, ['css']),
	html: gulp.watch(`${props.SRC.HTML}/**/*.html`, ['html']),
	images: gulp.watch(`${props.SRC.IMAGES}/**/*`, ['images']),
	sprites: gulp.watch(`${props.SRC.SPRITES}/**/*`, ['sprites']),
	babelServer: gulp.watch(`${props.SRC.SERVER}/**/*.js`, ['babelServer'])
};

gulp.task('watch', () => {
	let notify = (event) => {
		gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
	};

	for (let key in watcher) {
		if (watcher.hasOwnProperty(key)) {
			watcher[key].on('change', notify);
		}
	}
});
