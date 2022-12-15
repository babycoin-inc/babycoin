#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads 

sudo chmod -R 777 /home/ec2-user/app/
cd /home/ec2-user/app/
npm ci
npm run build-css-prod
npm run build
