;(function(root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	} else {
		// Global (browser)
		root.csv2html = factory();
	}
}(this || window, function() {
	'use strict';
	/**
	 * Module description
	 *
	 * @name csv2html
	 */
	var csv2html = (function () {
		function csv2html(_options) {
			var options = typeof _options === "object" ? _options : {};
			this.default = {
				tableClass: "csv-table",
				headClass: "csv-head",
				bodyClass: "csv-body",
				splitter: ";"
			};
			this.options = Object.assign({}, this.default, options);
		}
		csv2html.prototype.createElement = function (tag, c, html) {
			var elem = document.createElement(tag);
			elem.className = c || "";
			elem.innerHTML = html || "";
			return elem;
		};
		csv2html.prototype.parseString = function (str) {
			return str.split(this.options.splitter).map(function (elem) { return elem.replace(/^('|")(.*)('|")$/, "$2"); });
		};
		csv2html.prototype.convert = function (data) {
			var table = this.createElement("table", this.options.tableClass);
			var dataBody = data.split('\n');
			data = null;
			var dataHead = dataBody.shift();
			var trHead = this.createElement("tr", this.options.headClass);
			var dataHeadArray = this.parseString(dataHead);
			for (var i = 0; i < dataHeadArray.length; ++i) {
				var td = this.createElement("td", "", dataHeadArray[i]);
				trHead.appendChild(td);
			}
			table.appendChild(trHead);
			trHead = dataHeadArray = null;
			for (var i = 0; i < dataBody.length; ++i) {
				var dataBodyArray = this.parseString(dataBody[i]);
				var trBody = this.createElement("tr", this.options.bodyClass);
				for (var j = 0; j < dataBodyArray.length; ++j) {
					var td = this.createElement("td", "", dataBodyArray[j]);
					trBody.appendChild(td);
				}
				table.appendChild(trBody);
			}
			dataHead = dataBody = null;
			this._table = table;
			return this;
		};
		csv2html.prototype.table = function () {
			return this._table;
		};
		csv2html.prototype.html = function () {
			return this._table.outerHTML;
		};
		return csv2html;
	}());
	return csv2html;
}));

