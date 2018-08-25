#!/usr/bin/env sh
bash
if [ ! -d "/home/node/code/" ]; then
	npm -g install @angular/cli
	ng new code
fi
cd code
npm install
npm start -- --host 0.0.0.0
