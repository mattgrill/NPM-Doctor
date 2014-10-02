#!/usr/bin/env node

'use strict';
var program         = require('commander'),
    fs              = require('fs'),
    sys             = require('sys'),
    exec            = require('child_process').exec,
    chownr          = require('chownr'),
    mode            = require('stat-mode');

program
  .version('0.0.1')
  .option('-u, --user [name]', 'Your username. The output of `whoami`.')
  .parse(process.argv);

var runningUser     = process.env.USER,
    getUserId       = function (username, callback) {
      exec('`which id` -u '+username, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }
        else {
          callback(stdout);
        }
      });
    },
    getNodeModules  = function (callback) {
      var path,
          child;
      child = exec('npm root -g', function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }
        else {
          path = stdout.replace(/(\r\n|\n|\r)/gm,'');
          fs.stat(path, function (error, stats) {
            if (error !== null) {
              console.log('exec error: ' + error);
              return;
            }
            else {
              callback(path, stats);
            }
          });
        }
      });
    };


if (program.user){
  var userId,
      nodeModulesDir,
      nodeModulesStat;
  getUserId(program.user, function (id) {
    userId = id;
    getNodeModules(function (path, stats) {
      nodeModulesDir    = path;
      nodeModulesStat   = new mode(stats);
      if (nodeModulesStat.toString() != 'drwxr-xr-x'){
        fs.chmod(nodeModulesDir, parseInt('0755',8), function (){
          console.log('Set '+nodeModulesDir+' to 755.');
        });
      }
      chownr(nodeModulesDir, Number(userId), 80, function () {
        console.log('Set ownership of '+nodeModulesDir+' to '+program.user+':admin');
      });
    });
  });
}
else {
  console.log('You need to supply your username.');
}
