#!/usr/bin/env node
//gulp task1 task2 task3
//process.argv=[node文件绝对路径,脚本文件的绝对路径,task1,task2,task3]
const path = require('path');
const { timestamp } = require('./utils');
const chalk = require('chalk');
const logEvents = require('./logEvents');
const registerExports = require('./registerExports');
var tasks = process.argv.slice(2);
//如果传了要执行的任务，就直接用，如果没传就执行default
const toRun = tasks.length > 0 ? tasks : ['default'];
console.log('toRun', toRun);
const modulePath = '../lib';
var gulpInst = require(modulePath);
//在任务开始时和结束打印日志
logEvents(gulpInst);
//获取配置文件的路径
const configPath = path.join(process.cwd(), 'gulpfile.js');
console.log(`${timestamp()} Using gulpfile ${chalk.magenta(configPath)}`);
const exported = require(configPath);
//把导出的任务注册到gulp实例上
registerExports(gulpInst, exported);
const parallel = gulpInst.parallel;
const parallelMethod = parallel(toRun);
parallelMethod(err => console.log('well done'));
