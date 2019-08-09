# Setup remote connection to the raspberry with vscode
### Install rmate with this guide
`https://medium.com/@prtdomingo/editing-files-in-your-linux-virtual-machine-made-a-lot-easier-with-remote-vscode-6bb98d0639a4`

### If connection refused error
`https://askubuntu.com/questions/218344/why-am-i-getting-a-port-22-connection-refused-error`

### log into the raspberry and get the IP adress
`ifconfig`

### Connect to raspberry
`ssh -R 52698:127.0.0.1:52698 pi@192.168.2.67`
Replace the IP with the right one

# Setup raspberry pi
### Install redis
`https://habilisbest.com/install-redis-on-your-raspberryp`

### Install Node
`https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/`

### Set up Node.js backend on the raspberry pi
```
git clone https://github.com/newforestberlin/Forki.git backend
cd ./backend
git checkout pi_backend
npm install
```

### Set up sensor scripts on the raspberry pi
```
git clone https://github.com/newforestberlin/Forki.git scripts 
cd ./scripts 
git checkout pi_scripts
```

### Start scripts and Node.js on the raspberry pi
`./run.sh`

# Setup IoT-Platform with [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
```
git clone https://github.com/newforestberlin/Forki.git forki-platform 
docker-compose up
```

# Setup IoT-Platform on local machine
```
git clone https://github.com/newforestberlin/Forki.git forki-platform 
cd ./forki-platform
npm install
npm start

cd ./backend
npm install
npm start
```

# Setup Raspberry Pi backend and IoT-Platform and Landingpage in one directory
```
git clone https://github.com/newforestberlin/Forki.git forki
cd ./forki
git submodule update --init --recursive
npm install
npm start

cd ./backend
npm install
npm start

cd ../raspberry_pi/backend
npm install
npm start
```