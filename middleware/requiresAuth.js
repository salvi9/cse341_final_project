const { requiresAuth } = require("express-openid-connect");

app.get("/employees", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/customers", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/movies", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/snacks", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
