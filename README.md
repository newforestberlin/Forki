# Software architecture
![architecture](https://raw.githubusercontent.com/newforestberlin/Forki/develope/architecture.png)


# Setup Raspberry Pi

## Option 1: Use our Raspberry Pi image
The advantage is that you don't have to install anything anymore and the software starts automatically when you boot the Raspberry Pi.
Just clone the git repository and checkout to the image branch.

## Option 2: Install everything by your own

### Install redis
`https://habilisbest.com/install-redis-on-your-raspberryp`

### Install Node
`https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/`

### Set up backend on the Raspberry Pi
```
git clone https://github.com/newforestberlin/Forki.git
cd ./raspberry_pi
npm install --prefix ./backend
```

You need to edit the .env.example, rename it to .env and place the IP of your local machine in the IOT_PLATFORM_URL variable. Then you can start the sensors and the app:

```
./run.sh
```

# Setup Frontend and Backend (IoT Platform) on your local machine with [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac) (recommended)

```
git clone https://github.com/newforestberlin/Forki.git
```

You need to edit the ./backend/.env.example, rename it to .env and place the IP of the Raspberry Pi in the RASPBERRY_PI_URL variable. Then you can start the frontend and backend on your local machine:

```
docker-compose up
```

# Setup Frontend and Backend (IoT Platform) on your local machine directly

```
git clone https://github.com/newforestberlin/Forki.git
npm install --prefix ./frontend && npm install --prefix ./backend
```

You need to edit the ./backend/.env.example, rename it to .env and place the IP of the Raspberry Pi in the RASPBERRY_PI_URL variable. Then you can start the frontend and backend on your local machine:

```
npm start --prefix ./backend
npm start --prefix ./frontend
```

# Additional: Setup remote connection to the Raspberry Pi with vscode
### Install rmate with this guide
`https://medium.com/@prtdomingo/editing-files-in-your-linux-virtual-machine-made-a-lot-easier-with-remote-vscode-6bb98d0639a4`

### If connection refused error
`https://askubuntu.com/questions/218344/why-am-i-getting-a-port-22-connection-refused-error`

### log into the raspberry and get the IP adress
`ifconfig`

### Connect to Raspberry Pi
`ssh -R 52698:127.0.0.1:52698 pi@192.168.2.67`
Replace the IP with the right one