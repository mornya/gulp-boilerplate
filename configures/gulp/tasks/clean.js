import gulp from 'gulp';
import del from 'del';
import props from '../gulp-props.config';

gulp.task('clean', () => {
	return del.sync([
		props.CACHE,
		props.DEST.root,
		`${props.SRC.CSS}/__SPRITES__`
	]);
});
