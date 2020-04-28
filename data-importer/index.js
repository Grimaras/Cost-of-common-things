const fs = require("fs");
const rq = require("request");

let errs = 0;
let succ = 0;

fs.readFile('./base.json', 'utf-8', (err, contents) => {
    if (err) {
        console.error(err);
        return;
    }
    const components = JSON.parse(contents);

    rq({method: "DELETE", url: "http://back:3000/api/components/all/yes"}, (err, res, body) => {
        if (err) {
            console.error(err);
            return;
        }
        components.forEach((composant) => {
            console.log(composant);
            rq({
                method: "POST",
                url: "http://back:3000/api/components",
                json: true,
                body: composant
            }, (err, res, body) => {
                if (err)
                    errs++;
                else
                    succ++;
                console.log("Import : " + succ + " success et " + errs + "erreurs (total : " + components.length + ")");
            });
        });
    });
});
