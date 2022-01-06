//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { truncate } = require("lodash");
const mongoose = require("mongoose");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://pauras22:host123@cluster0.v1nol.mongodb.net/postsDB?retryWrites=true&w=majority", { useNewUrlParser: true });

const postSchema = {
  Title: String,
  Body: String,
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, elements) {
    res.render("home", { content2: elements });
  });
})
app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
})
app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
})
app.get("/compose", function (req, res) {
  res.render("compose");
})
app.post("/compose", function (req, res) {
  let post = new Post({
    Title: req.body.postTitle,
    Body: req.body.postBody
  });
  post.save();
  res.redirect("/");
})
app.get("/posts/:postName", function (req, res) {
  let reqTitle = _.lowerCase(req.params.postName);
  console.log(reqTitle);
  Post.find({}, function (err, elements) {
    if (!err) {
      elements.forEach(function (element) {
        const curTitle = _.lowerCase(element.Title);
        if (curTitle == reqTitle) {
          console.log("match found");
          res.render("post", { content: element });
        }
      });
    }else{
      console.log(err);
      res.redirect("/");
    }
  })
})
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
