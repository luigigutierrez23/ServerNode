const { request, response } = require("express");

const GetUser = (req = request, res = response) => {
  const params = req.query;
  res.json({
    message: "get API - Controller",
    params,
  });
};

const PostUser = (req = request, res = response) => {
  const body = req.body;
  res.json({
    message: "post API - Controller",
    body: body,
  });
};

const PutUser = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: "put API - Controller",
    id,
  });
};

const DeleteUser = (req = request, res = response) => {
  res.json({
    message: "delete API - Controller",
  });
};

const PatchUser = (req = request, res = response) => {
  res.json({
    message: "patch API - Controller",
  });
};

module.exports = {
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
  PatchUser,
};
