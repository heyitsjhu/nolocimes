import express from 'express';
import path from 'path';

import app from './backend/server';

/*! - PORT
 * A port is defined as a communication endpoint and is always associated with an IP address of a host
 * and the protocol type of the communication. For example, on most local environments, the host is
 * oftentimes 'localhost' and the default port assigned is 3000. Therefore, to access your application
 * you would navigate to http://localhost:3000.
 *
 * Here, we are using the OR (||) operator to dynamically assign our PORT depending on the environment
 * our application is running in. If it's in a production environment, our constant variable will be
 * assigned to a port defined by our host provider (i.e., Heroku), via the process.env.PORT environment
 * variable. If it's in a development environment, then process.env.PORT would be undefined, and as a
 * result, port 5000 will be assigned to the constant variable.
 */
const PORT = process.env.PORT || 5000;

// app.set('port', PORT);

// points to react folder's build (dist) assets
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  // defers all unknown server-side routes to the client-side code via index.html file in the client build folder
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[server] running on PORT ${PORT}...`);
});
