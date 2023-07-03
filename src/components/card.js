import axios from 'axios'
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // create HTML elements
  let cardContainer = document.createElement('div');
  let headlineDiv = document.createElement('div');
  let authorDiv = document.createElement('div');
  let imgDiv = document.createElement('div');
  let image = document.createElement('img');
  let bySpan = document.createElement('span');

  // add classes
  cardContainer.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');

  // add content
  headlineDiv.textContent = article.headline;
  authorDiv.textContent = article.authorName;
  image.src = article.authorPhoto;
  bySpan.textContent = `By ${article.authorName}`;

  // create hierarchy
  cardContainer.appendChild(headlineDiv);
  cardContainer.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  authorDiv.appendChild(bySpan);
  imgDiv.appendChild(image);

  // add listener event
  cardContainer.addEventListener('click',()=>{
    console.log(article.headline);
  })

  return cardContainer;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5001/api/articles`)
  .then(result=>{
    // define parent element to append to
    const articleEntryPoint = document.querySelector(selector);
    // loop over topics
    Object.entries(result.data.articles).forEach(([key,value])=>{
      // loop over each "article" within the topics
      value.forEach(el=>{
        console.log(el);
        const articleCard = Card(el);
        articleEntryPoint.appendChild(articleCard);
      })
    })
  })
  .catch(err=>{
    console.log(err);
  })

}

cardAppender('.cards-container');

export { Card, cardAppender }
