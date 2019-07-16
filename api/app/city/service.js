'use strict'

const Service = require('../base/Service')

class CityService extends Service {
  constructor(app) {
    super(CityService.name, app, ['user.hashed_password'])
  }
}

module.exports = app => new CityService(app)
