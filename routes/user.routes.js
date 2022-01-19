const { Router } = require("express");
const {
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
  PatchUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", GetUser);
router.post("/", PostUser);
router.put("/:id", PutUser);
router.delete("/", DeleteUser);
router.patch("/", PatchUser);

module.exports = router;
