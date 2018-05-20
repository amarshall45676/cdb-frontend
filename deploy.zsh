#!/bin/zsh
ng build
cd dist
echo "cdb.surge.sh" > CNAME
surge
