'use strict'

const Service = require('../base/Service')

class ProvinceService extends Service {
  constructor(app) {
    super(ProvinceService.name, app, ['user.hashed_password'])
  }
}

module.exports = app => new ProvinceService(app)
