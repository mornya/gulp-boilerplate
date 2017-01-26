const sassTypes = require('node-sass').types;
const date = new Date();
const fz = (n) => (n < 10 ? '0' + n : n);

const sassFunctions = () => {
	let date = new Date();
	let fz = (n) => (n < 10 ? '0' + n : n);
	return {
		'timestamp()': () => sassTypes.String(`${date.getYear() - 100}${fz(date.getMonth() + 1)}${fz(date.getDate())}${fz(date.getHours())}${fz(date.getMinutes())}`)
	};
};

export default sassFunctions;
