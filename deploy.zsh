#!/bin/zsh
ng build --prod #deploying to production
cd dist
echo "cdb.rice.edu" > CNAME #Can change this to make the domain name change
echo | surge # Make sure to confirm I want to upload from the dist directory
