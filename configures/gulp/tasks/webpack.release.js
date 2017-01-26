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
		path: __dirname + '/server/webroot/assets/js/',
		filename: '[name].js',
		publicPath: '/assetc/js/'
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
		new webpackGlobal.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};

gulp.task('webpack:dev', () => {
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
