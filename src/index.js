module.exports = function () {
    return {
        noColors:       false,
        startTime:      null,
        afterErrorList: false,
        testCount:      0,
        skipped:        0,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;

            this.setIndent(1)
                .useWordWrap(true)
                .write(this.chalk.bold('Running tests in:'))
                .newline();

            userAgents.forEach(ua => {
                this
                    .write(`- ${this.chalk.blue(ua)}`)
                    .newline();
            });
        },

        reportFixtureStart (name) {
            this.setIndent(1)
                .useWordWrap(true);

            if (this.afterErrorList)
                this.afterErrorList = false;
            else
                this.newline();

            this.write(name)
                .newline();
        },

        _renderErrors (errs) {
            this.setIndent(3)
                .newline();

            errs.forEach((err, idx) => {
                var prefix = this.chalk.red(`${idx + 1}) `);

                this.newline()
                    .write(this.formatError(err, prefix))
                    .newline()
                    .newline();
            });
        },

        reportTestDone (name, testRunInfo) {
            var hasErr    = !!testRunInfo.errs.length;
            var symbol    = null;
            var nameStyle = null;
            var screenshotSymbol = '';

            if (testRunInfo.skipped) {
                this.skipped++;

                symbol    = this.chalk.cyan('-');
                nameStyle = this.chalk.cyan;
            }

            else if (hasErr) {
                symbol    = this.chalk.red.bold(this.symbols.err);
                nameStyle = this.chalk.red.bold;
            }

            else {
                symbol    = this.chalk.green(this.symbols.ok);
                nameStyle = this.chalk.grey;
            }

            if (testRunInfo.screenshotPath)
                screenshotSymbol = this.chalk.yellow(' [s]');

            var title = `${symbol}${screenshotSymbol} ${nameStyle(name)}`;

            this.setIndent(1)
                .useWordWrap(true);

            if (testRunInfo.unstable)
                title += this.chalk.yellow(' (unstable)');

            this.write(title);

            if (hasErr)
                this._renderErrors(testRunInfo.errs);

            this.afterErrorList = hasErr;

            this.newline();
        },

        _renderWarnings (warnings) {
            this.newline()
                .setIndent(1)
                .write(this.chalk.bold.yellow(`Warnings (${warnings.length}):`))
                .newline();

            warnings.forEach(msg => {
                this.setIndent(1)
                    .write(this.chalk.bold.yellow('--'))
                    .newline()
                    .setIndent(2)
                    .write(msg)
                    .newline();
            });
        },

        reportTaskDone (endTime, passed, warnings) {
            var durationMs  = endTime - this.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
            var footer = '';
            
            footer += this.chalk.gray.underline.bold('Run_Result:');
            footer += this.chalk.bold.green(` ${passed} passed;`);

            if (passed !== this.testCount)
                footer += this.chalk.bold.red(` ${this.testCount - passed} failed;`);

            if (this.skipped > 0)
                footer += this.chalk.bold.cyan(` ${this.skipped} skipped;`);

            footer += this.chalk.grey(` (${durationStr})`);

            if (!this.afterErrorList)
                this.newline();

            this.setIndent(1)
                .useWordWrap(true);

            this.newline()
                .write(footer)
                .newline();

            if (warnings.length)
                this._renderWarnings(warnings);
        }
    };
};
