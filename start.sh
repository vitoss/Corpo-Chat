#!/bin/zsh
echo 'Starting and cleaning mongo'
cd service #Services catalog
grunt mongo_stop
grunt mongo_start
grunt mongo_clean
cd .. #main catalog

echo 'Starting Service'
cd service
grunt node:../lib/hub.js:8080:1 &
cd .. # main catalog

echo 'Load test data'
cd service/data
./load_data.zsh
cd ../.. #main catalog

echo 'Starting Web'
#TODO