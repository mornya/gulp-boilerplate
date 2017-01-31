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
		path: path.resolve('server/webroot/assets/js/'),
		filename: '[name].js',
		publicPath: '/assets/js/'
	},
	resolve: {
		root: [
			path.resolve('./src/js')
		],
		extensions: [
			'', '.js'
		]
	},
	eslint: {
		configFile: '.eslintrc'
	},
	watch: false,
	module: {
		loaders: [
			{
				test: /\.scss/,
				loader: 'style!css!sass!postcss'
			},
			{
				test: /\.css/,
				loader: 'style!css'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new webpackGlobal.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};

gulp.task('webpack:release', () => {
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
		}))
		.pipe(gulp.dest(props.DEST.JS));
});
