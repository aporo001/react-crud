import express from 'express';
import React from 'react';
import path from 'path';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { store } from './stores/configStore.1';
import fs from 'fs';
import morgan from 'morgan';
import expressStaticGzip from 'express-static-gzip';

const app = express();
app.use(morgan('combined'));
app.use('/static', expressStaticGzip(path.join(__dirname, '..', 'build', 'static'), {
  'maxAge': 31536000,
  setHeaders: function(res, path, stat) {
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res;
  }
}));
app.get('*', function (req, res) {
  if ( !/^\/static/.test(req.url)) {
    console.log(req.originalUrl);
    const context = {}
    var html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    )
    
    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
     
      var template = fs.readFileSync(path.join(__dirname, '..', 'build') + '/index.html').toString();
      const preloadedState = store.getState();
      const html = (`
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
      `);
      template = template.replace('<div id="root"></div>', html);
   
      res.write(
        template
      )
      res.end()
    }
  }
});

app.listen(3000, function () {
  console.log('Example site listening on 3000!');
});
