import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import next from "next";
import express from 'express';

admin.initializeApp();

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: "dist/client" },
});

const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();
const { createProxyMiddleware } = require('http-proxy-middleware');

// const initilizeServer = async (firebaseReq, firebaseRes) => {
//   try {
//     await app.prepare();
    
//     const expressServer = express();
//     // expressServer.use(express.json());
//     // expressServer.use('/grapqhl', createProxyMiddleware(apiPaths['/graphql']));
//     expressServer.all('*', (req, res) => handle(req, res));

//     expressServer.listen(port, (err) => {
//       if (err) throw err;
//       console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
//     });

//     return handle(firebaseReq,firebaseRes)
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// };


// const server = functions.https.onRequest((request, response) => {
//   // log the page.js file or resource being requested
//   console.log("File: " + request.originalUrl);
//   return app.prepare().then(() => handle(request, response));
// });


// const server = functions.https.onRequest((request, response) => {
//   return app.prepare().then(() => {
    
//     // const expressServer = express();
//     // expressServer.use(express.json());
//     // // expressServer.use('/grapqhl', createProxyMiddleware(apiPaths['/graphql']));
//     // expressServer.all('*', (req, res) => handle(req, res));

//     // expressServer.listen(port, (err) => {
//     //   if (err) throw err;
//     //   console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
//     // });

//     return handle(request, response);

//   });
// });


app
	.prepare()
	.then(() => {
		const server = express();
		// Body parser
		server.use(express.json());

		server.get('*', handle);

		server.listen(port, err => {
			if (err) throw err;
			console.log(
				`> Ready on http://localhost:${port} NODE_ENV: ${process.env.NODE_ENV}`
			);
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		console.error(ex);
		process.exit(1);
	});


const nextjs = {
  server: functions.https.onRequest(app)
};

export { nextjs };