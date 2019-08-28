#!/bin/bash

trap "exit" INT TERM ERR
trap "kill 0" EXIT

echo "Starting all scripts script..."
python ./scripts/ultrasonic.py &
python ./scripts/localization.py &
npm start  --prefix ./backend/

wait