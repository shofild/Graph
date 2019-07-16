exports.up = function(knex, Promise) {
    return knex.schema.createTable('province', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.timestamps(true, true)
      table
        .string('nameProvince')
        .unique()
        .notNullable()
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('province')
  }
  