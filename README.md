# cvg-twittercli
cli with nodejs

For building node command line apps
make git repo
w/ .ignore and MIT license
Git clone repo

run npm init command
take all defaults and add MIT license

convention:
mkdir bin
add file file.js


test add 
#!/usr/bin/env node
console.log("hellow world")

node /bin/file.js

edit package.json

after description add

 "bin": {
    "twittercli": "./bin/twittercli.js"
  },
  
  in root of repo
  run
  npm install -g
  
  run npm link
  
  run your connector name



  