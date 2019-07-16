'use strict'

const bodyParser = require('body-parser')
const router = require('express').Router()
const { createTransaction, jwtAuth, handleRole } = require('../middleware')
const { create, fetchPage, fetch, update, destroy } = require('./controller')

router.post(
  '/instansi',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  create
)
router.get(
  '/instansi',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetchPage
)
router.get(
  '/instansi/:id',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetch
)
router.put(
  '/instansi/:id',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  update
)
router.delete(
  '/instansi/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  destroy
)

module.exports = router
