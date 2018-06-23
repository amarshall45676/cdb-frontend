#!/bin/zsh
ng build --prod --base-href="https://cdb.rice.edu" # Build project for production
echo "cdb.rice.edu" > dist/CNAME # This determines the location the site will be deployed to
ngh # Push to gh-pages branch on github that the site will be deployed from
