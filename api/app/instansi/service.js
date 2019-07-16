'use strict'

const Service = require('../base/Service')

class InstansiService extends Service {
  constructor(app) {
    super(InstansiService.name, app, ['user.hashed_password'])
  }
}

module.exports = app => new InstansiService(app)
