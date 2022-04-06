import 'reflect-metadata';
import http from 'http';
import app from './config/app';
import env from './config/env';
import { createConnection } from 'typeorm';
import { dbConfig } from './config/database';
// import webSocket from './socket';

const index: http.Server = app.listen(app.get('port'), async () => {
  await createConnection(dbConfig);
  console.log(
    `\n\tApp is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`,
  );
  if (env.app.nodeEnv !== 'production') {
    console.log(`\tAPI document is at http://localhost:${app.get('port')}/doc`);
  }
  console.log('\tPress CTRL-C to stop\n');
});

// webSocket(server, app, sessionMiddleware);

export default index;
