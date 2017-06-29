exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: '1', cities_id: 1, content: 'This is my home. I love it here. Although it has changed significantly recently, I still wish to live here as long as I can afford it.'},
        {id: 2, user_id: 1, cities_id: 2, content: 'It\'s where Learner\'s guild is located.'},
        {id: 3, user_id: 1, cities_id: 3, content: 'College!'},
        {id: 4, user_id: 2, cities_id: 2, content:'OAKTOWN!'},
        {id: 5, user_id: 2, cities_id: 3, content:'BEACHBOARD WALK! IN THE WARM CALIFORNIA SUN!'},
        {id: 6, user_id: 3, cities_id: 3, content:'This is where I met John.'},
        {id: 7, user_id: 3, cities_id: 2, content:'NEVER BEEN HERE IN MY LIFE.'},
      ]);
    });
};
