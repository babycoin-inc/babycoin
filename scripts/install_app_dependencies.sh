PATH="/home/ec2-user/.nvm/versions/node/v14.21.1/bin"
echo "Installing app dependencies..."
npm ci
echo "Building Tailwind CSS..."
npm build-css-prod
echo "Building webpack files"
npm build