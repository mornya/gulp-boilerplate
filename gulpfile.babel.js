import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

requireDir('./configures/gulp/tasks');

gulp.task('default', (done) => {
	runSequence(
		'preset',
		'eslint',
		//'clean',
		['sprites', 'babelServer'],
		['html', 'images', 'css'],
		'webpack:dev',
		'start',
		'watch',
		done
	);
});

gulp.task('deploy', (done) => {
	runSequence(
		'preset',
		'clean',
		'sprites',
		['htmlmin', 'imagesmin', 'cssmin'],
		'webpack:release',
		done
	);
});
