const fs = require("fs");
const aJSON = require("true-json-promise");
const loaded = [];

function saveAll() {
    if(isSaving === loaded.length)
        return
    loaded.forEach((l) => {
        if(l.autosave && !l.saving && l.lastSave < new Date().getTime() + l.lastSaveTime * 10) {
            l.save();
        }
    });
}


let isSaving = 0
setInterval(saveAll, 5000);
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
        parsed.saving = false;
        parsed.lastSave = 0;
        parsed.lastSaveTime = 0;
        parsed.save = async function () {
            const time = new Date().getTime();
            this.lastSave = time;
            this.saving = true;
            isSaving++;
            fs.writeFile(this.path + ".tmp", await aJSON.stringify(this), {}, () => fs.rename(this.path + ".tmp", this.path, () => isSaving-- ));
            this.lastSaveTime = new Date().getTime() - time;
        };
        loaded[loaded.length] = parsed;
        return parsed;
    }
}
