const chai = require("chai");
const chaiHttp = require("chai-http");
const routes = require("../src/routes");

chai.use(chaiHttp);
chai.should();

describe("location")