#!/usr/bin/env node

const parseArguments = require("./parseArguments");
const datetimeUtil = require('./utils/datetimeUtil')
const main = require("./main");

const argv = parseArguments();

const today = datetimeUtil.date2dateStr(new Date())
const options = {
  token: argv.saveToken,
  dateStr: argv.date || today,
};

main(options).catch((err) => {
  console.error(err);
  process.exit(1);
});
