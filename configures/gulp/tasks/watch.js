import gulp from 'gulp';
import chalk from 'chalk';
import props from '../gulp-props.config';

const has = Object.prototype.hasOwnProperty;

gulp.task('watch', () => {
	// watcher 설정이 task 밖으로 나오면 gulp 프로세스가 종료되지 않으므로 task 안에서 선언해야 한다.
	const watcher = {
		js: gulp.watch(`${props.SRC.JS}/**/*.js`, ['eslint']), // js build/watch는 webpack에서
		css: gulp.watch(`${props.SRC.CSS}/**/*.scss`, ['css']),
		html: gulp.watch(`${props.SRC.HTML}/**/*.html`, ['html']),
		images: gulp.watch(`${props.SRC.IMAGES}/**/*`, ['images']),
		sprites: gulp.watch(`${props.SRC.SPRITES}/**/*`, ['sprites']),
		babelServer: gulp.watch(`${props.SRC.SERVER}/**/*.js`, ['babelServer'])
	};
	let notify = (event) => {
		console.info('File', chalk.yellow(event.path), 'was', chalk.magenta(event.type));
	};

	for (let key in watcher) {
		if (has.call(watcher, key)) {
			watcher[key].on('change', notify);
		}
	}
});
