import React from 'react';
import { useEffect, useState } from 'react';
import { News, Article, TagNews } from './news-objects';
import logo from './logo.svg';
import './App.css';

function App() {

  const [news, setNews] = useState("loading...");
  const [newsByTag, setNewsByTag] = useState(new TagNews());
  const [tags, setTags] = useState(["test1", "test2"]);

  const newsUrl = "https://storage.googleapis.com/planetapi/news/current-news.json";

  useEffect(() => {
    fetch(newsUrl)
      .then(response => response.json())
      .then(data => {

        let news: News = data as News;

        let tagNews: TagNews = new TagNews();
        let newTags = [];
        for (var artIndex in news.articles) {
          let article = news.articles[artIndex];

          for (var tagIndex in article.tags) {
            if (!tagNews.articlesByTag[article.tags[tagIndex]]) {
              // We don't have this tag, create...
              tagNews.articlesByTag[article.tags[tagIndex]] = [];
              newTags.push(article.tags[tagIndex]);
            }

            tagNews.articlesByTag[article.tags[tagIndex]].push(article);
          }
        }

        // Sort tags
        tagNews.articlesByTag = Object.keys(tagNews.articlesByTag).sort().reduce(
          (obj: Record<string, Article[]>, key) => {
            obj[key] = tagNews.articlesByTag[key];
            return obj;
          },
          {}
        ) as Record<string, Article[]>;

        setNewsByTag(tagNews);
        setNews(JSON.stringify(news.locations));
      });
  });

  return (
    <div>
      <nav className="fixed bg-white border-b border-gray-200 z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
                <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <a href="https://demo.themesberg.com/windster/" className="text-xl font-bold flex items-center lg:ml-2.5">
                {/* <h4>C10X News</h4> */}
                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                <span className="self-center whitespace-nowrap">C10X News</span>
              </a>
              <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                <label htmlFor="topbar-search" className="sr-only">Filter</label>
                <div className="mt-1 relative lg:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Filter" />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                <span className="sr-only">Search</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <div className="hidden lg:flex items-center">
                <span className="text-base font-normal text-gray-500 mr-5">Open source ❤️</span>
                <div className="-mb-1">
                  <a className="github-button" href="https://github.com/themesberg/windster-tailwind-css-dashboard" data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub">Star</a>
                </div>
              </div>
              <a href="https://demo.themesberg.com/windster/pricing/" className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                <svg className="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path>
                </svg>
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden bg-white pt-16">
        <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <li>
                    <form action="#" method="GET" className="lg:hidden">
                      <label htmlFor="mobile-search" className="sr-only">Search</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                          </svg>
                        </div>
                        <input type="text" name="email" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                      </div>
                    </form>
                  </li>
                  {Object.keys(newsByTag.articlesByTag).map((value: string, i: number) => {
                    return (
                      <li>
                        <a href={"#" + value} className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                          <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                          </svg>
                          <span className="ml-3">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      </div>
      <div className="h-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <div>
          {Object.keys(newsByTag.articlesByTag).map((value: string, i: number) => {
            return (
              <div key={i}>
                <h1 id={value} className="m-3 font-bold text-gray-600">{value.charAt(0).toUpperCase() + value.slice(1)}</h1>
                <div>
                  {newsByTag.articlesByTag[value].map((article: Article) => {
                    return (
                      <a href={article.link} target="_blank">
                        <div className="inline-block max-w-xs bg-white rounded-xl p-5 shadow-2xl m-2">
                          <p> {article.title} </p>
                          <div className='mt-5 flex items-center'>
                            <img src={article.icon} className='w-10 rounded-full' />
                            <div className="ml-3">
                              <h3 className="font-semibold"> {article.source} </h3>
                              <p className="text-gray-500"> {article.location} </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  }
                  )}
                </div>
              </div>
            )
          }
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
