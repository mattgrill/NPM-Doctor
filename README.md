# NPM Doctor

Do you have trouble installing modules from NPM without using sudo? Are you able to update some modules without using sudo, and others still require it?

## what, no sudo?

>I strongly encourage you not to do package management with sudo! Packages can run arbitrary scripts, which makes sudoing a package manager command as safe as a chainsaw haircut. Sure, it's fast and definitely going to cut through any obstacles, but you might actually want that obstacle to stay there.

[Introduction to NPM -- Isaac Z. Schlueter](http://howtonode.org/introduction-to-npm)

## Fixes

There are couple common problems with `npm_modules` directory. This tool tries to adress a few of them.

* Sets your `node_modules` directory to 755, `drwxr-xr-x`.
* Sets the correct user:group ownership permissions on the files within your `node_modules` directory.

## Running

`sudo npm install -g npmdoctor`

Then, and yes, you need `sudo` to correctly fix the permissions.

`sudo npmdoctor -u {YOURUSERNAME}`

Make sure to replace `{YOURUSERNAME}` with your actual user name. If you're unsure, you can find this out with `whoami`.


