// deploy.js
import ghpages from 'gh-pages';

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/Zem860/chatRoomTest.git',
  user: {
    name: 'Zem860',
    email: 'zemmyhammy@gmail.com'
  }
}, () => {
  console.log('🚀 Deploy complete!');
});
