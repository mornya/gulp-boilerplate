const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const htmlParser = require('htmlparser2');

export default (callback) => {
	const resultList = [];
	const propsData = JSON.parse(fs.readFileSync(path.resolve('.htmlindexrc'), 'utf8'));
	const propsBasePath = propsData.basePath || '';
	const propsOutPath = propsData.outPath || '';
	const propsLinkPath = propsData.linkPath || '';

	function htmlInfo(html) {
		const returnValue = {};
		let isTitleTag = false;
		const parser = new htmlParser.Parser({
			onopentag: (tagName/*, attribs*/) => {
				if (tagName === 'title') {
					isTitleTag = true;
				}
			},
			ontext: (text) => {
				if (isTitleTag) {
					returnValue['title'] = text;
				}
			},
			onclosetag: (tagname) => {
				if (tagname === 'title') {
					isTitleTag = false;
				}
			}
		}, { decodeEntities: true });
		parser.write(html);
		parser.end();
		return returnValue;
	}

	function list(path = '') {
		const result = {};
		const files = [];
		const curPath = path;

		fs.readdirSync(propsBasePath + curPath).forEach(file => {
			const pathFile = `${curPath}/${file}`;

			if (fs.lstatSync(propsBasePath + pathFile).isDirectory()) {
				list(pathFile);
			} else if (pathFile.match(/\.html$/)) {
				const info = htmlInfo(fs.readFileSync(propsBasePath + pathFile, 'utf8'));
				const encodePath = (curPath.length > 0) ? '/' + encodeURIComponent(curPath.substring(1)) : '';
				files.push({
					pathname: propsLinkPath + encodePath,
					filename: file,
					title: info.title
				});
			}
		});

		if (files.length > 0) {
			result.path = path || '/';
			result.files = files;
			resultList.push(result);
		}
	}

	list();
	//console.log(resultList);

	const htmlTemplate = fs.readFileSync(path.resolve('configures/gulp/templates/htmlindex.mustache'), 'utf8');
	const htmlView = { data: resultList };
	const output = Mustache.to_html(htmlTemplate, htmlView);
	fs.writeFileSync(`${propsOutPath}/index.html`, output);

	callback();
};
