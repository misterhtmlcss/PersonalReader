const subreddits = [ 'javascript', 'learnjavascript', 'FreeCodeCamp', 'webpack', 'node', 'learnprogramming', 'Firebase', 'reactjs' ]

const app = document.getElementById('app')
let count = 0;

function linkBuilder (){
  subreddits.forEach(sub => {
    const url = `https://www.reddit.com/r/${sub}/top.json?limit=3`
    if(url === '') {
      throw error
    }
    return getRedditData(url)
  })
}

function getRedditData(url) {
  fetch(url, { mode: "cors" })
    .then( res => res.json() )
    .then( res => res.data.children)
    .then( res => {
      console.log(res)
      const promises = res.map( post => ({
        flagged: post.data.distinguished, subreddit: post.data.subreddit, date: post.data.created, title: post.data.title, description: post.data.selftext, comments: post.data.num_comments, link: post.data.permalink
        })
      )
      //console.log(promises)
      promises.forEach( post => {
        if(post.flagged === null && post.description.length !== 0){
          render( post )
        }
        return
      })
    })
    .catch( error => console.error('Error:', error) )
}

const render = post => {
  const description = post.description.slice(0, 200);
  const postDate = new Date(post.date*1000).getUTCHours()
  const nodeDiv = document.createElement('div');

  nodeDiv.innerHTML = `
    <div id="post" class="${post.subreddit}" data-post=${count++}>
      <p class="${post.subreddit}">
        <span class="subreddit">${post.subreddit}:</span>
        <a href="http://reddit.com${post.link}" id="title" target="_blank">${post.title}</a>
      </p>

      </a>
      <p>${description}</p>
      <div id="info"><a href="http://reddit.com${post.link}" target="_blank">More </a>
      <span id="comments">
        <i class="fas fa-comments"></i>
        <span>${post.comments} | </span>
        <span id="date">${postDate} hours ago</span>
      </span>
    </div>`;
  app.appendChild(nodeDiv);

  return post
}

linkBuilder();

