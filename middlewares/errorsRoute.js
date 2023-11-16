const fs = require("fs");
const path = require("path");


module.exports = function (err, req, res, next) {

    res.format({
        json: () => {
            res.status(404).json({
                message: "Pagina non trovata",
            });
        },
        html: () => {
            let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/404.html"), "utf-8");
            let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
            htmlContent = htmlContent.replace("@head", headContent);

            let htmlOutput =

                    `<div class="col-100">
                        <img class="img-res" src="https://media1.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif?cid=ecf05e47lv2hmboqjjwcuaphwvgde3w5rdnmx7inybs1df34&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt=404 error">
                    </div>`;

            htmlContent = htmlContent.replace("@404", htmlOutput);

            res.send(htmlContent);
        },
    });
};
