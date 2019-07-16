'use strict'

const Controller = require('../base/Controller')

class CityController extends Controller {
  constructor() {
    super(CityController.name)
  }
}

module.exports = new CityController()
