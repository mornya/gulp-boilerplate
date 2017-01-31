import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import GulpFileCache from 'gulp-file-cache';
import path from 'path';
import fromJSON from '../functions/fromJSON';
import sassFunctions from '../functions/sass';
import props from '../gulp-props.config';

const scssOptions = {
	outputStyle: "expanded", // nested, expanded, compact, compressed
	indentType: "tab", // space , tab
	indentWidth: 1, // outputStyle 이 nested, expanded 인 경우에 사용
	precision: 6, // 컴파일 된 CSS 의 소수점 자리수 (default=5)
	sourceComments: true, // 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시
	functions: sassFunctions()
};
const autoprefixerOptions = {
	browsers: fromJSON(path.resolve('.autoprefixrc')),
	cascade: false
};

const fileCache = new GulpFileCache(`${props.CACHE}/gulp-cache-css`);

gulp.task('css', () => {
	return gulp.src([
			`${props.SRC.CSS}/**/*.scss`,
			`!${props.SRC.CSS}/__INCLUDES__/**/*.scss`,
			`!${props.SRC.CSS}/__SPRITES__/**/*.scss`
		])
		.pipe(fileCache.filter())
		.pipe(sourcemaps.init())
		.pipe(sass(scssOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
		.pipe(fileCache.cache())
		.pipe(gulp.dest(props.DEST.CSS));
});
