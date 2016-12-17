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
	var csv2html = (function(_options) {
		var self = this;

		var options = typeof _options === "object" ? _options : {};
		var _default = {
			tableClass: "csv2html-table",
			headClass: "csv2html-head",
			bodyClass: "csv2html-body",
			splitter: ",",
			css: ".csv2html-table{width:100%;border:1px solid #000000;background-color:#ffffff;}.csv2html-head{background-color:#ff0000;}.csv2html-body{background-color:#ffff00;}"
		};
		self.options = Object.assign({}, _default, options);
		self.options.css = `.${self.options.tableClass}{border:1px solid #000000;background-color:#ffffff;}.${self.options.headClass}{background-color:#ff0000;}.${self.options.bodyClass}{background-color:#ffff00;}`;

		self.createElement = function(tag, c, html) {
			var elem = document.createElement(tag);
			elem.className = c || "";
			elem.innerHTML = html || "";
			return elem;
		};

		self.parseString = function(str) {
			return str.split(self.options.splitter).map(function(elem) {
				return elem.replace(/^('|")(.*)('|")$/, "$2");
			});
		};

		self.table = function() {
			return self._table;
		};

		self.html = function() {
			return self._table.outerHTML;
		};

		self.convert = function(data) {
			var table = self.createElement("table", self.options.tableClass);
			var dataBody = data.split('\n');
			data = null;
			var dataHead = dataBody.shift();
			var trHead = self.createElement("tr", self.options.headClass);
			var dataHeadArray = self.parseString(dataHead);

			for (var i = 0; i < dataHeadArray.length; ++i) {
				var td = self.createElement("td", "", dataHeadArray[i]);
				trHead.appendChild(td);
			}

			table.appendChild(trHead);
			trHead = dataHeadArray = null;

			for (var i = 0; i < dataBody.length; ++i) {
				var dataBodyArray = self.parseString(dataBody[i]);
				var trBody = self.createElement("tr", self.options.bodyClass);
				for (var j = 0; j < dataBodyArray.length; ++j) {
					var td = self.createElement("td", "", dataBodyArray[j]);
					trBody.appendChild(td);
				}
				table.appendChild(trBody);
			}

			dataHead = dataBody = null;
			self._table = table;
			return self;
		};

	});
	return csv2html;
}));

