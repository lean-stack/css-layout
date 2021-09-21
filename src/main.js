import './styles.scss';

// Router
const routerContainer = document.querySelector('.container');
const errorPage = document.getElementById('p404');

function loadPage(url) {
  if (url === '/') {
    url = '/home';
  }

  const page = `/src/pages${url}.html`;
  fetch(page)
    .then(async (response) => {
      if (response.status === 200) {
        const pageHtml = await response.text();
        routerContainer.innerHTML = pageHtml;
      } else {
        routerContainer.replaceChildren(errorPage);
      }
    })
    .catch(() => {
      console.log('Error');
    })
}

window.addEventListener('popstate', (ev) => {
  loadPage(ev.state.url);
});

// Routing

// Load Initial route
loadPage(location.pathname);
document.body.addEventListener('click', (ev) => {
  if (ev.target.matches('[data-route]')) {
    ev.preventDefault();
    const url = new URL(ev.target.href);
    window.history.pushState({ url: url.pathname }, '', url.pathname);
    loadPage(url.pathname);
  }
});
