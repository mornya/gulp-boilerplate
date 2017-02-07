export default {
	SRC: {
		root: 'src',
		JS: 'src/js',
		CSS: 'src/css',
		HTML: 'src/html',
		IMAGES: 'src/images',
		SPRITES: 'src/sprites',
		SERVER: 'configures/server'
	},
	DEST: {
		root: 'server',
		JS: 'server/build/js',
		CSS: 'server/build/css',
		HTML: 'server/build/html',
		IMAGES: 'server/build/images',
		SERVER: 'server/entry'
	},
	CACHE: '.cache',
	SERVER: {
		port: 3000 // express server listening port
	},
	BS: {
		port: 7000 // browser-sync listening port
	}
};
