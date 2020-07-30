module.exports = class Product {
    constructor(data) {
        this._title = data.title;
        this._keyWords = data.keyWords || '';
        this.people = [];
        this.notificationHistory = [];
        this.createdAt = new Date().toGMTString();
    }

    set _title(data) {
        if (data.length < 5) {
            throw new TypeError('Title should be at least 4 letters long');
        }

        const pattern = /^([A-Za-z0-9\s]+)$/g;
        if (!pattern.test(data)) {
            throw new TypeError('Title can contain only latin letters and digits separated by space');
        }

        this.title = data.trim();
    }

    set _keyWords(data) {
        if (!data.length) {
            return
        }

        const pattern = /^[A-Za-z0-9]{2,}$/g;
        const words = data.split(' ').filter(x => {
            const word = x.trim();
            if (pattern.test(word)) {
                return word
            }
        });

        this.keyWords = words;
    }
}