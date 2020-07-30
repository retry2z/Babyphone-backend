module.exports = class Account {
    constructor(data) {
        this._email = data.email || null;
        this._password = data.password || null;
        this._name = data.name || '';
        this._imageUrl = data.imageUrl || '';
        this.createdAt = new Date().toGMTString();
    }

    set _name(data) {
        const pattern = /^\w+$/g;
        if (!pattern.test(data) && data.length) {
            throw new TypeError('Invalid name');
        }
        
        this.name = data;
    }

    set _email(data) {
        if (data === null) {
            return
        }

        const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
        if (!pattern.test(data)) {
            throw new TypeError('Invalid email address');
        }

        this.email = data.trim();
    }

    set _password(data) {
        if (data === null) {
            return
        }

        if (data.length < 6) {
            throw new TypeError('Password must have 6 symbols at least');
        }

        this.password = data.trim();
    }

    set _imageUrl(data) {
        const pattern = /^(http|https):/g;
        if (!pattern.test(data) && data.length) {
            throw new TypeError('Invalid image URL');
        }
        this.imageUrl = data;
    }
}
