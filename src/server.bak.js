import express from 'express';
import React from 'react';
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import App from './App'
import { store } from './stores/configStore.1';
import fs from 'fs';
import morgan from 'morgan';
import { renderToString } from 'react-router-server';

const app = express();
//app.use(morgan('combined'));
app.use('/static', express.static(path.join(__dirname, '..', 'build', 'static')));

app.get('/*', function (req, res) {
  if ( !/^\/static/.test(req.url)) {
    const serStore = store(req.originalUrl);
    const context = {}
    var server = (
      <Provider store={serStore}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      </Provider>
    )
    
    renderToString(server)
        .then(({ html }) => {
          setTimeout(() => {
          if (context.url) {
            res.writeHead(302, {
              Location: context.url
            })
            res.end()
          } else {
            var template = fs.readFileSync(path.join(__dirname, '..', 'build') + '/index.html').toString();
            const child = (`
              <div id="root">${html}</div>
              <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(serStore.getState()).replace(/</g, '\\u003c')}
              </script>
            `);
            console.log(serStore.getState());
            template = template.replace('<div id="root"></div>', child);
            res.write(
              template
            )
            res.end()
          }
          }, 3000);
          
        })
        .catch(err => console.error(err));
    }
});

app.listen(3000, function () {
  console.log('Example site listening on 3000!');
});