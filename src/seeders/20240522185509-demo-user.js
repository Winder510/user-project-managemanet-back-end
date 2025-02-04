'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [{
      email: 'John Doe',
      password: 'fake1',
      username: 'fake1'
    }, {
      email: 'John Doe',
      password: 'fake12',
      username: 'fake12'
    }, {
      email: 'John Doe',
      password: 'fake13',
      username: 'fake13'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};