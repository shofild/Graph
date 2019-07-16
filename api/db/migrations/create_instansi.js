exports.up = function(knex, Promise) {
    return knex.schema.createTable('instansi', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.timestamps(true, true)
      table
        .string('nameInstansi')
        .unique()
        .notNullable()
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('instansi')
  }
  