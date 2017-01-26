import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith-multi';
import mergeStream from 'merge-stream';
import props from '../gulp-props.config';

gulp.task('sprites', () => {
	const spriteUtil = spritesmith.util;
	const addTheme = (data) => {
		let info = data.spritesheet_info;
		let match = info.name.match(/hover--(\w+)/);
		data.theme = match && match[1];
	};
	const spriteOpts = {
		'spritesmith': (options, sprite/*, icons*/) => {
			let isRetina = sprite.endsWith('@2x');
			let templateType = `./configures/gulp/templates/sprite.mosaic-${isRetina ? '2' : '1'}x.mustache`;
			let spriteName = isRetina ? sprite.replace(/(@2x)$/, '-2x') : sprite;
			options.padding = 2;
			options.algorithm = 'binary-tree';
			options.cssName = `spr-${sprite}.scss`;
			options.imgName = `../images/spr-${sprite}.png`;
			options.cssSpritesheetName = `spr-${spriteName}`;
			options.cssTemplate = spriteUtil.createTemplate(templateType, [addTheme, spriteUtil.addPseudoClass]);
			options.cssHandlebarsHelpers = {
				'zero': (value) => value === '0px' ? '0' : value,
				'half': (value) => value === '0px' ? '0' : value.replace(/(-?\d*)/, (v) => v / 2)
			};
		}
	};

	let spriteData = gulp.src(`${props.SRC.SPRITES}/**/*.png`)
		.pipe(spritesmith(spriteOpts));
	let imgStream = spriteData.img.pipe(gulp.dest(props.DEST.IMAGES));
	let cssStream = spriteData.css.pipe(gulp.dest(`${props.SRC.CSS}/__SPRITES__`));

	return mergeStream(imgStream, cssStream);
});
