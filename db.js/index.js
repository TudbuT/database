const fs = require("fs");

var loaded = []

setInterval(() => {
    loaded.forEach((l) => {
        
    })
}, 5000);

module.exports = {
    load: function (file) {
        if(!fs.existsSync(file))
             return console.error("This file does not exist!");
        var parsed =
            JSON.parse(fs.readFileSync(file, "utf8"));
        parsed.path = file;
        parsed.save = function () {
            fs.writeFileSync(this.path, JSON.stringify(this));
        };
        loaded[loaded.length] = parsed;
        return parsed;
    }
}
