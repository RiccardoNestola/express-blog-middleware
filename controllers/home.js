const express = require("express");
const fs = require("fs");
const path = require("path");

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index (req, res) {


  res.format({
    html: () => {
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/index.html"), "utf-8");
      let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
      htmlContent = htmlContent.replace("@head", headContent);
      res.type("html").send(htmlContent);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  })
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function about(req, res) {
  res.format({
    html: () => {
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/index.html"), "utf-8");
      let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
      htmlContent = htmlContent.replace("@head", headContent);
      res.type("html").send(htmlContent);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  })
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function contacts(req, res){
  res.format({
    html: () => {
      let htmlContent = fs.readFileSync(path.resolve(__dirname, "../pages/index.html"), "utf-8");
      let headContent = fs.readFileSync(path.resolve(__dirname, "../head.html"), "utf-8");
      htmlContent = htmlContent.replace("@head", headContent);
      res.type("html").send(htmlContent);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  })
}

module.exports = {
  index,
  about,
  contacts
}