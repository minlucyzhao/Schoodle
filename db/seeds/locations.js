exports.seed = function(knex, Promise) {
    return knex('locations').del()
      .then(function () {
        return Promise.all([
          knex('locations').insert({id: 1, address: '662 King St W', latitude: , longitude: , user_id: , event_id:1}),
          knex('locations').insert({id: 2, address: 'North York', latitude: , longitude: , user_id: , event_id:2}),
        ]);
      });
  };
  