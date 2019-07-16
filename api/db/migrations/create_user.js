exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.timestamps(true, true)
      table
        .string('email')
        .unique()
        .notNullable()
    table.enum('role', ['admin']).notNullable()
      table.string('hashed_password').notNullable()
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
  }
  