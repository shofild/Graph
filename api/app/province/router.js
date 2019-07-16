'use strict'

const bodyParser = require('body-parser')
const router = require('express').Router()
const { createTransaction, jwtAuth, handleRole } = require('../middleware')
const { create, fetchPage, fetch, update, destroy } = require('./controller')

router.post(
  '/province',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  create
)
router.get(
  '/province',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetchPage
)
router.get(
  '/province/:id',
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  fetch
)
router.put(
  '/province/:id',
  bodyParser.json(),
  createTransaction,
  jwtAuth.required,
  handleRole([['admin'], ['device']]),
  update
)
router.delete(
  '/province/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  destroy
)

module.exports = router
