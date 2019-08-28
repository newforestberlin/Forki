#!/usr/bin/python
import RPi.GPIO as gpio
import time
import json
import redis
import numpy as np

##############################################################

r = redis.Redis(host='localhost', port=6379, db=0)
gpio.cleanup()
gpio.setmode(gpio.BOARD)

# Front Right
gpio_trigger_front = 12
gpio_echo_front = 7

gpio.setup(gpio_trigger_front, gpio.OUT)
gpio.setup(gpio_echo_front, gpio.IN)

# Back -> Front Left
gpio_trigger_back = 22
gpio_echo_back = 13

gpio.setup(gpio_trigger_back, gpio.OUT)
gpio.setup(gpio_echo_back, gpio.IN)

# Left
gpio_trigger_left = 18
gpio_echo_left = 11

gpio.setup(gpio_trigger_left, gpio.OUT)
gpio.setup(gpio_echo_left, gpio.IN)

# right
gpio_trigger_right = 16
gpio_echo_right = 15

gpio.setup(gpio_trigger_right, gpio.OUT)
gpio.setup(gpio_echo_right, gpio.IN)

##############################################################


def distance(gpio_trigger, gpio_echo):
    gpio.output(gpio_trigger, True)
    time.sleep(0.00001)
    gpio.output(gpio_trigger, False)

    pulse_end_time = time.time()
    pulse_start_time = time.time()

    messure_start_time = time.time()
    while gpio.input(gpio_echo) == 0:
        pulse_start_time = time.time()
        if (pulse_start_time - messure_start_time) > 0.02:
            return 3000

    messure_start_time = time.time()
    while gpio.input(gpio_echo) == 1:
        pulse_end_time = time.time()
        if (pulse_start_time - messure_start_time) > 0.02:
            return 3000

    pulse_duration = pulse_end_time - pulse_start_time
    return round(pulse_duration * 17150, 2)

##############################################################


try:
    while True:
        dist_back = distance(gpio_trigger_back, gpio_echo_back)
        dist_front = distance(gpio_trigger_front, gpio_echo_front)
        dist_left = distance(gpio_trigger_left, gpio_echo_left)
        dist_right = distance(gpio_trigger_right, gpio_echo_right)
        # print(dist_front)
        # print(dist_left)
        # print(dist_right)
        # print(dist_back)
        ultrasonic = {"back": {"dist": dist_back, "deg": 0},
                      "front": {"dist": dist_front, "deg": 180},
                      "left": {"dist": dist_left, "deg": 270},
                      "right": {"dist": dist_right, "deg": 90}}
        ultrasonic = json.dumps(ultrasonic)
        r.set("ultrasonic", ultrasonic)
        time.sleep(0.1)

except KeyboardInterrupt:
    print("Stop")
    gpio.cleanup()
