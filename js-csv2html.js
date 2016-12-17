/**
 * JavaScript convert data CSV to HTML table
 */
class csv2html {
	/**
	 * Constructor
	 *
	 * @method constructor
	 *
	 * @param  {Object}    _options Object with HTML table render options
	 *
	 * @return {Object}    csv2html
	 */
	constructor(_options) {
		let options = typeof _options === "object" ? _options : {};
		let _default = {
			tableClass: "csv2html-table",
			headClass: "csv2html-head",
			bodyClass: "csv2html-body",
			splitter: ",",
			css: ".csv2html-table{width:100%;border:1px solid #000000;background-color:#ffffff;}.csv2html-head{background-color:#ff0000;}.csv2html-body{background-color:#ffff00;}"
		};
		this.options = Object.assign({}, _default, options);
		this.options.css = `.${this.options.tableClass}{border:1px solid #000000;background-color:#ffffff;}.${this.options.headClass}{background-color:#ff0000;}.${this.options.bodyClass}{background-color:#ffff00;}`;
	}

	/**
	 * Method create DOM element with parameters and return this
	 *
	 * @method createElement
	 *
	 * @param  {String}      tag  Tag name
	 * @param  {String}      c    Class name
	 * @param  {String}      html HTML string for this new element
	 *
	 * @return {DOM}      DOM element
	 */
	createElement(tag, c, html) {
		let elem = document.createElement(tag);
		elem.className = c || "";
		elem.innerHTML = html || "";
		return elem;
	}

	/**
	 * Method parse CSV string and return array with elements for TD
	 *
	 * @method parseString
	 *
	 * @param  {String}    str CSV string
	 *
	 * @return {Array}    Array with elements for TD
	 */
	parseString(str) {
		return str.split(this.options.splitter).map(elem => elem.replace(/^('|")(.*)('|")$/, "$2"));
	}

	/**
	 * Method convert CSV string to HTML DOM element
	 *
	 * @method convert
	 *
	 * @param  {String} data CSV string
	 *
	 * @return {Object} csv2html instance
	 */
	convert(data) {
		let table = this.createElement("table", this.options.tableClass);
		let dataBody = data.split('\n');
		data = null;
		let dataHead = dataBody.shift();
		let trHead = this.createElement("tr", this.options.headClass);
		let dataHeadArray = this.parseString(dataHead);

		for (let i = 0; i < dataHeadArray.length; ++i) {
			let td = this.createElement("td", "", dataHeadArray[i]);
			trHead.appendChild(td);
		}

		table.appendChild(trHead);
		trHead = dataHeadArray = null;

		for (let i = 0; i < dataBody.length; ++i) {
			let dataBodyArray = this.parseString(dataBody[i]);
			let trBody = this.createElement("tr", this.options.bodyClass);
			for (let j = 0; j < dataBodyArray.length; ++j) {
				let td = this.createElement("td", "", dataBodyArray[j]);
				trBody.appendChild(td);
			}
			table.appendChild(trBody);
		}

		dataHead = dataBody = null;
		this._table = table;
		return this;
	}

	/**
	 * Method return HTML table DOM element
	 *
	 * @method table
	 *
	 * @return {DOM} DOM element
	 */
	table() {
		return this._table;
	}

	/**
	 * Method return HTML table outerHTML
	 *
	 * @method table
	 *
	 * @return {String} HTML string of converted data
	 */
	html() {
		return this._table.outerHTML;
	}

}

export default csv2html;
/**
Example:

var csv = ['"title","description","category"',
'"Home network","Home network Wi-Fi","Wi-Fi networks"',
'"Job network","Job network Wi-Fi","Wi-Fi networks"'].join('\n');

var CSVConverter = new csv2html({splitter: ","});
var table = CSVConverter.convert(csv);

// Get DOM element
document.body.appendChild(table.table());

// Get HTML string
console.log(table.html());

var css = CSVConverter.options.css;

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
head.appendChild(style);
 */