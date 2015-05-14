#!/usr/bin/env node

'use strict';
var fs              = require('fs'),
    cp              = require('child_process'),
    chownr          = require('chownr'),
    Q               = require('q');

Q
  .all([
    Q.ninvoke(cp, 'exec', '$(which id) -u ' + process.env.USER),
    Q.ninvoke(cp, 'exec', process.env.NVM_BIN + '/npm root -g')
  ])
  .then(function (values) {
    var user        = values[0][0].replace(/(\r\n|\n|\r)/gm,''),
        path        = values[1][0].replace(/(\r\n|\n|\r)/gm,'');
    return [user, path];
  })
  .then(function (values) {
    chownr(values[1], Number(values[0]), 80, function (e) {
      fs.chmod(values[1], parseInt('0755', 8));
    });
  })
  .done(function () {
    console.log('DONE ;)');
  });
