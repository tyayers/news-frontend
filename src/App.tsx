import React from 'react';
import { useEffect, useState } from 'react';
import { News } from './news-objects';
import logo from './logo.svg';
import './App.css';

function App() {

  const [news, setNews] = useState("loading...")
  const newsUrl = "https://storage.googleapis.com/planetapi/news/current-news.json";

  useEffect(() => {
    fetch(newsUrl)
      .then(response => response.json())
      .then(data => {
        
        let news: News = data as News;
        
        setNews(JSON.stringify(news.locations));
    });
  });

  return (
    <h1 className="text-3xl font-bold underline">
      {news}
    </h1>
  );
}

export default App;
