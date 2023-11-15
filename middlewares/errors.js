const fs = require("fs");
const path = require("path");


module.exports = function (err, req, res, next) {
    

    if (req.file) {
        fs.unlinkSync(req.file.path);
    }

    res.format({
        json: () => {
            res.status(500).json({
                message: "Errore sconosciuto",
                error: err.message,
                errorInstance: err.name,
            });
        },
        html: () => {
            let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/500.html"), "utf-8");
            let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
            htmlContent = htmlContent.replace("@head", headContent);

            let htmlOutput =  
                
                    `<div class="col-100">
                        <img class="img-res" src="https://cdn.dribbble.com/users/19381/screenshots/3471308/media/6323e71e526d76fd7c178b37fc68b1e6.gif" alt="500 error">
                    </div>`;

            htmlContent = htmlContent.replace("@500", htmlOutput);

            res.send(htmlContent);
        },
    });
};
