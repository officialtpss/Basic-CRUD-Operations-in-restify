

/**
 * Module Dependencies
 */
const config = require('./../config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');


/**
  * Initialize Server
 */
const init = () => {
  const server = restify.createServer({
    name: config.name,
    version: config.version,
    ignoreTrailingSlash: true,
  });

  /**
		* Middleware
	 */
  server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
  server.use(restifyPlugins.acceptParser(server.acceptable));
  server.use(restifyPlugins.queryParser({ mapParams: true }));
  server.use(restifyPlugins.fullResponse());


  /**
		* Start Server, Connect to DB & Require Routes
	*/
  server.listen(config.port, () => {
    // establish connection to mongodb
    require('./../database')(config, server);
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port ${config.port}`);
  });
};

module.exports = {
  init,
};
