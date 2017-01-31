import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

requireDir('./configures/gulp/tasks');

gulp.task('default', (done) => {
	runSequence(
		'preset',
		'eslint',
		//'clean',
		['html', 'sprites', 'babelServer'],
		['images', 'css'],
		'webpack:dev',
		'start:dev',
		'watch',
		done
	);
});

gulp.task('deploy', (done) => {
	runSequence(
		'preset',
		'clean',
		['htmlmin', 'sprites', 'babelServer'],
		['imagesmin', 'cssmin'],
		'webpack:release',
		'start:release',
		done
	);
});
