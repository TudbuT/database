const fs = require("fs");
const loaded = [];

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
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        parsed.path = file;
        parsed.autosave = autosave;
        parsed.save = function () {
            fs.writeFileSync(this.path + ".tmp", JSON.stringify(this));
            fs.remameSync(this.path + ".tmp", this.path);
        };
        loaded[loaded.length] = parsed;
        return parsed;
    }
}
