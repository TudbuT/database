const fs = require("fs");

module.exports = {
    load: function (file) {
        var parsed =
            JSON.parse(fs.readFileSync(file, "utf8"));
        parsed.path = file
        parsed.save = function () {
            fs.writeFileSync(this.path, JSON.stringify(this));
        }
    }
}
