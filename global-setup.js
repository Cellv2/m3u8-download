const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
    globalThis.servers = await setupDevServer({
        command: `npm run start:test-express`,
        launchTimeout: 50000,
        port: 3000,
    });
};
