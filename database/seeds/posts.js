exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { user_id: '1', cities_id: 1, title:'home', content: 'This is my home. I love it here. Although it has changed significantly recently, I still wish to live here as long as I can afford it.' },
        { user_id: 1, cities_id: 2, title:'Current school', content: 'It\'s where Learner\'s guild is located.' },
        { user_id: 1, cities_id: 3,title:'college', content: 'College!' },
        { user_id: 2, cities_id: 2,title:'THIS CRAZY CITY', content:'OAKTOWN!' },
        { user_id: 2, cities_id: 3,title:'BOARDWALK!', content:'BEACHBOARD WALK! IN THE WARM CALIFORNIA SUN!' },
        { user_id: 3, cities_id: 3,title:'Best part of my life', content:'This is where I met John.' },
        { user_id: 3, cities_id: 2,title:'NOT PART OF MY LIFE', content:'NEVER BEEN HERE IN MY LIFE.' },
      ]);
    });
};
