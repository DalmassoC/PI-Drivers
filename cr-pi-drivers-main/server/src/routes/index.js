const { Router } = require("express");
const { getTeams } = require("../controllers/getTeams");
const  {getDrivers}  = require("../controllers/getDrivers");
const {getDriverById} = require("../controllers/getDriverById"); 
const { getDriverByName } = require("../controllers/getDriverByName");
const { postDriver } = require("../controllers/postDriver");
const { deleteDriver } = require("../controllers/deleteDriver");
const router = Router();

router.get("/drivers", getDrivers)

router.get("/drivers/name/", getDriverByName)

router.get("/drivers/:idDriver", getDriverById)

router.post("/drivers", postDriver)

router.delete("/drivers/:idDriver", deleteDriver)


router.get("/teams", getTeams)

module.exports = router;

