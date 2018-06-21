#!/bin/zsh
ng build --prod --base-href="https://cdb.rice.edu" # Build project for production
ngh # Push to gh-pages branch on github that the site will be deployed from
