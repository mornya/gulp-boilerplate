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
		root: 'server/webroot/assets',
		JS: 'server/webroot/assets/js',
		CSS: 'server/webroot/assets/css',
		HTML: 'server/webroot/assets/html',
		IMAGES: 'server/webroot/assets/images',
		SERVER: 'server/entry'
	},
	WEBROOT: 'server/webroot',
	SERVER: {
		port: 3000 // express server listening port
	},
	BS: {
		port: 7000 // browser-sync listening port
	}
};
