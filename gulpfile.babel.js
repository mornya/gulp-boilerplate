import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';

requireDir('./configures/gulp/tasks');

gulp.task('default', (done) => {
	runSequence(
		'eslint',
		//'clean',
		'preset',
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
		'clean',
		'preset',
		'sprites',
		['htmlmin', 'imagesmin', 'cssmin'],
		'webpack:release',
		done
	);
});
