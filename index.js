const fs = require("fs");
var loaded = []

setInterval(() => {
    loaded.forEach((l) => {
        if(l.autosave)
            l.save();
    })
}, 5000);

module.exports = {
    load: function (file, autosave) {
        if(!fs.existsSync(file)) {
            console.info("This file does not exist! Creating it...");
            fs.writeFileSync(file, "{}");
        }
        var parsed =
            JSON.parse(fs.readFileSync(file, "utf8"));
        parsed.path = file;
        if(autosave == 1 || autosave == true)
            parsed.autosave = 1;
        else
            parsed.autosave = 0;
        parsed.save = function () {
            fs.writeFileSync(this.path, JSON.stringify(this));
        };
        loaded[loaded.length] = parsed;
        return parsed;
    }
}
