/* const posts = require("../db/db.json"); */
const fs = require("fs");
const path = require("path");
const { kebabCase } = require("lodash");



function index(req, res) {

  const posts = JSON.parse(fs.readFileSync(path.resolve("./db/db.json"), "utf8"));


  res.format({
    'text/html': function () {
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/posts.html"), "utf-8");
      let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
      htmlContent = htmlContent.replace("@head", headContent);
      /*      res.type("html").send(htmlContent); */




      let htmlOutput = posts.map(post => {
        return `
                
                  <div class="col-33">
                    <div class="card">
                      <img class="img-res" src="/imgs/posts/${post.image}" alt="${post.title}">
                      <div class="p-2">
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                        <p># ${post.tags}</p>
                        <a href="/posts/${post.slug}" class="button">Leggi post</a>
                      </div>
                    </div>
                  </div>

              `;
      }).join('');

      htmlContent = htmlContent.replace("@posts", htmlOutput);

      res.send(htmlContent);

    },
    'application/json': function () {
      res.json(posts);
    },
    'default': function () {
      res.status(406).send('Not Acceptable');
    }
  });
}

function show(req, res) {

  const post = findOrFail(req, res);

  res.format({
    'text/html': function () {
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/single.html"), "utf-8");
      let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
      htmlContent = htmlContent.replace("@head", headContent);
      /*      res.type("html").send(htmlContent); */
      const imgLink = (`http://${req.headers.host}/imgs/posts/${post.image}`)
      const downloadLink = (`http://${req.headers.host}/posts/${post.slug}/download`)
      const newPost = (`http://${req.headers.host}/posts/create`)

      let htmlOutput =
        `<div class="p-2">
          <img class="img-res" src="/imgs/posts/${post.image}" alt="${post.title}">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p># ${post.tags.join(', ')}</p>
          <a href="${imgLink}" class="button">Apri immagine</a>
          <a href="${downloadLink}" class="button">Scarica immagine</a>
          <a href="${newPost}" class="button">Crea Nuovo Post</a>
        </div>`
              

      htmlContent = htmlContent.replace("@single", htmlOutput);

      res.send(htmlContent);

    },
    'application/json': function () {

      const imgLink = (`http://${req.headers.host}/imgs/posts/${post.image}`)
      const downloadLink = (`http://${req.headers.host}/posts/${post.slug}/download`)
      
      res.json({
        ...post,
        image_url: `${imgLink}`,
        download_link: `${downloadLink}`,
      });
    },
    'default': function () {
      res.status(406).send('non autorizzato');
    }
  });
}



function create(req, res) {
  res.format({
    html: () => {
      html = "<h1>Creazione nuovo post</h1>"
      res.send(html);
    },
    default: () => {
      res.status(406).send("non autorizzato");
    }
  })
};


function store(req, res) {

  console.log(req.body);
  console.log(req.file);

  const posts = JSON.parse(fs.readFileSync(path.resolve("./db/db.json"), "utf8"));

  res.format({
    html: () => {
      res.redirect("/");
    },
    default: () => {
      // aggiungo il post al DB
      posts.push({
        ...req.body,
        slug: kebabCase(req.body.title),
        updatedAt: new Date().toISOString(),
        image: req.file
      });

      // converto il DB in JSON
      const json = JSON.stringify(posts, null, 2);

      // scrivo il JSON su file
      fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), json)

      res.json(posts[posts.length - 1]);
    }
  })

};


function destroy(req, res) {

  const posts = JSON.parse(fs.readFileSync(path.resolve("./db/db.json"), "utf8"));

  res.format({
    html: () => {
      res.redirect("/");
    },
    default: () => {
      const post = findOrFail(req, res);

      const postIndex = posts.findIndex((_post) => _post.slug == post.slug);

      posts.splice(postIndex, 1);

      if (post.image) {
        if (typeof post.image === "string") {
          const filePath = path.resolve(
            __dirname,
            "..",
            "public",
            "imgs",
            "posts",
            post.image
          );

          fs.unlinkSync(filePath);
        } else {
          const filePath = path.resolve(__dirname, "..", post.image.path);

          fs.unlinkSync(filePath);
        }
      }
      const json = JSON.stringify(posts, null, 2);
      fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), json);

      res.send("Post eliminato");
    }
  })

};






function download(req, res) {
  const post = findOrFail(req, res);

  const imagePath = path.resolve(__dirname, '..', 'public', 'imgs', 'posts', post.image);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('Foto non trovata');
      return;
    }
  })

  res.download(imagePath);

}


function findOrFail(req, res) {

  const postsSlug = req.params.slug;

  const post = JSON.parse(fs.readFileSync(path.resolve("./db/db.json"), "utf8")).find((post) => post.slug == postsSlug);

  if (!post) {
    res.status(404).send(`Post ${postsSlug} non trovato`);
    return;
  }

  return post;
}



module.exports = {
  index,
  show,
  create,
  store,
  download,
  destroy

}

