class csv2html {
    constructor(_options) {
        let options = typeof _options === "object" ? _options : {};
        this.default = {
            tableClass: "csv-table",
            headClass: "csv-head",
            bodyClass: "csv-body",
            splitter: ";"
        };
        this.options = Object.assign({}, this.default, options);
    }

    createElement(tag, c, html) {
        let elem = document.createElement(tag);
        elem.className = c || "";
        elem.innerHTML = html || "";
        return elem;
    }

    parseString(str) {
        return str.split(this.options.splitter).map(elem => elem.replace(/^('|")(.*)('|")$/, "$2"));
    }

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

    table() {
        return this._table;
    }

    html() {
        return this._table.outerHTML;
    }

}
