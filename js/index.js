import '../styles/main.css';
import 'whatwg-fetch';

const urlBase = `http://content.guardianapis.com/search?`;
const apiKey = process.env.API_KEY;
const orderBy = `newest`;

const ukNewsBoxList = document.querySelector('.uknews.content ol');
const footballBoxList = document.querySelector('.football.content ol');
const travelBoxList = document.querySelector('.travel.content ol');

async function getContent() {
  const footballData = await fetchStories('football');
  const ukNewsData = await fetchStories('uk-news');
  const travelData = await fetchStories('travel');

  const footballStories = footballData.response.results.slice(0, 5);
  const ukNewsStories = ukNewsData.response.results.slice(0, 5);
  const travelStories = travelData.response.results.slice(0, 5);

  createList(footballStories, footballBoxList);
  createList(travelStories, travelBoxList);
  createList(ukNewsStories, ukNewsBoxList);
};

function createList(stories, element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }

  stories.forEach((story) => {
    const li = document.createElement("li");
    const liAppended = element.appendChild(li);

    const a = document.createElement("a");
    const linkStory = liAppended.appendChild(a);

    linkStory.textContent = story.webTitle;
    linkStory.href = story.webUrl;

    if (story.type === 'liveblog') {
      const div = document.createElement('div');
      const liveDiv = liAppended.appendChild(div);
      liAppended.classList.add('liveblog');
      liveDiv.classList.add('live');
    }

    if (story.trailText) {
      const p = document.createElement("p");
      const trailText = liAppended.appendChild(p);
      trailText.textContent = story.trailText;
    }
  })
};

function fetchStories(section) {
  const url = makeRequest(section);
  const data = fetch(url).then(response => response.json())
  .catch(e => {
    console.log(`Error: `, e);
  });
  return data;
};

function makeRequest(section) {
  return new Request(`${urlBase}section=${section}&order-by=${orderBy}&api-key=${apiKey}`);
}

getContent();
