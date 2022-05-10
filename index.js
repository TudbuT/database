const fs = require("fs");
const loaded = [];

function saveAll() {
    if(isSaving > 0)
        return
    loaded.forEach((l) => {
        if(l.autosave) {
            l.save();
        }
    });
}


let isSaving = 0
setInterval(saveAll, 20000);
process.on('exit', saveAll);

module.exports = {
    load: function (file, autosave) {
        if(!fs.existsSync(file)) {
            console.info("This file does not exist! Creating it...");
            fs.writeFileSync(file, "{}");
        }
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        parsed.path = file;
        parsed.autosave = autosave;
        parsed.save = async function () {
            this.saving = true;
            isSaving++;
            fs.writeFile(this.path + ".tmp", stringify(this), {}, () => {fs.renameSync(this.path + ".tmp", this.path); isSaving--});
        };
        loaded[loaded.length] = parsed;
        return parsed;
    }
}
