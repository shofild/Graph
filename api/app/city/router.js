'use strict'

const bodyParser = require('body-parser')
const router = require('express').Router()
const { createTransaction, jwtAuth, handleRole } = require('../middleware')
const { create, fetchPage, fetch, update, destroy } = require('./controller')

router.post(
  '/city',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  create
)
router.get(
  '/city',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetchPage
)
router.get(
  '/city/:id',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetch
)
router.put(
  '/city/:id',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  update
)
router.delete(
  '/city/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  destroy
)

module.exports = router
