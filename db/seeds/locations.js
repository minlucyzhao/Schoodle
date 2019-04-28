exports.seed = function(knex, Promise) {
    return knex('locations').del()
      .then(function () {
        return Promise.all([
          knex('locations').insert({id: 1, address: '350 Victoria St, Toronto, ON M5B 2K3, Canada', latitude: 43.6576585, longitude: -79.3788017, user_id:1, event_id:1}),
          knex('locations').insert({id: 2, address: '203 Baldwin St, Toronto, ON M5T 1M1, Canada', latitude: 43.6544062, longitude: -79.4041326, user_id:2, event_id:1}),
          knex('locations').insert({id: 3, address: '1200 Eglinton Ave E, North York, ON M3C 1H9, Canada', latitude: 43.7223402, longitude: -79.3343436, user_id:3, event_id:2}),
        ]);
      });
  };
  