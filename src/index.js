const fs = require('fs');
const os = require('os');
const path = require('path');

const PLUGIN_NAME = 'WebpackBuildInfoPlugin';

class WebpackBuildInfoPlugin {

    constructor(options = {
        outputFilename: 'build-info.json',
        outputGitInfo: true,
        extraBuildProperties: {}
    }) {
        this.options = options;
    }

    apply(compiler) {
        const outputPath = compiler.options.output && compiler.options.output.path;

        if (!outputPath) {
            console.warn(PLUGIN_NAME, ': `options.output.path` not defined. Plugin DISABLED!');
            return;
        }

        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            const {hash, startTime, endTime} = stats;

            const gitInfo = {};
            if (this.options.outputGitInfo) {
                try {
                    const commitHash = require('child_process').execSync('git rev-parse HEAD');

                    gitInfo.commitHash = commitHash.toString().trim();
                } catch (e) {
                    console.warn(e);
                }

            }

            const buildInfo = Object.assign({}, {
                hash,
                startTime,
                endTime,
                osInfo: {
                    arch: os.arch(),
                    platform: os.platform(),
                    release: os.release(),
                    type: os.type(),
                    username: os.userInfo().username,
                },
            }, gitInfo, this.options.extraBuildProperties);
            fs.writeFileSync(path.resolve(outputPath, this.options.outputFilename), JSON.stringify(buildInfo, null, 4));
        });
    }
}

module.exports = WebpackBuildInfoPlugin;