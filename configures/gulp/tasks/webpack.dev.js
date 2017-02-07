import gulp from 'gulp';
import gutil from 'gulp-util';
import webpackGlobal from 'webpack';
import webpackStream from 'webpack-stream';
import path from 'path';
import fromJSON from '../functions/fromJSON';
import props from '../gulp-props.config';

const webpackConfig = {
	devtool: '#inline-source-map',
	entry: fromJSON(path.resolve('.jsentryrc')),
	output: {
		path: path.resolve(props.DEST.JS),
		filename: '[name].js',
		publicPath: '/js/'
	},
	resolve: {
		extensions: ['.js'],
		modules: [props.SRC.JS, './node_modules']
	},
	watch: true,
	module: {
		/* eslint는 gulp플러그인으로 선처리 */
		/*preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /nodel_modules/
			}
		],*/
		loaders: [
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.css/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new webpackGlobal.NoEmitOnErrorsPlugin()
	]
};

gulp.task('webpack:dev', (done) => {
	let isFirst = true;

	return gulp.src([`${props.SRC.JS}/**/*.js`, `!${props.SRC.JS}/__INCLUDES__`])
		.pipe(webpackStream(webpackConfig, webpackGlobal, (err, stats) => {
			if (err) {
				throw new gutil.PluginError('[webpack]', err);
			} else {
				gutil.log('[webpack]', stats.toString({
					chunks: false,
					colors: true
				}));
			}

			if (isFirst) {
				done();
				isFirst = false;
			}
		}))
		.pipe(gulp.dest(props.DEST.JS));
});
