const fs = require('fs');
const os = require('os');
const path = require('path');

const PLUGIN_NAME = 'WebpackBuildInfoPlugin';

class WebpackBuildInfoPlugin {
    constructor(options) {
        this.options = Object.assign(
            {},
            {
                outputFilename: 'build-info.json',
                outputGitInfo: true,
                outputOsInfo: true,
                extraBuildProperties: {},
            },
            options
        );
    }

    apply(compiler) {
        const outputPath =
            compiler.options.output && compiler.options.output.path;

        if (!outputPath) {
            console.warn(
                PLUGIN_NAME,
                ': `options.output.path` not defined. Plugin DISABLED!'
            );
            return;
        }

        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            const { hash, startTime, endTime } = stats;

            const gitInfo = {};
            if (this.options.outputGitInfo) {
                try {
                    const commitHash =
                        require('child_process').execSync('git rev-parse HEAD');

                    gitInfo.commitHash = commitHash.toString().trim();
                } catch (e) {
                    console.warn(e);
                }
            }

            const osInfo = {};
            if (this.options.outputOsInfo) {
                osInfo.osInfo = {
                    arch: os.arch(),
                    platform: os.platform(),
                    release: os.release(),
                    type: os.type(),
                    username: os.userInfo().username,
                };
            }

            const buildInfo = Object.assign(
                {},
                {
                    hash,
                    startTime,
                    endTime,
                },
                gitInfo,
                osInfo,
                this.options.extraBuildProperties
            );
            fs.writeFileSync(
                path.resolve(outputPath, this.options.outputFilename),
                JSON.stringify(buildInfo, null, 4)
            );
        });
    }
}

module.exports = WebpackBuildInfoPlugin;
