#!/bin/bash

echo "Setting Clearwater NPM Repository"
# set the npm registry
npm config set registry https://artifactory.cwantools.io/api/npm/npm-group
npm config set save-exact true

{
    # set the yarn registry if yarn exists
    yarn config set registry https://artifactory.cwantools.io/api/npm/npm-group
} || {}
echo "Clearwater NPM Repository set"

# the githooks path allows you to share get hooks (jira ticket hook)
git config core.hooksPath .githooks
echo "Set git hooks path"
# give execute permissions to all hooks
FILES=.githooks/*
for f in $FILES
do 
    chmod -x $f
done


# install dependencies - prefer using yarn
yarn || npm i