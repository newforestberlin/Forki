import serial
import time
import datetime
import json
import redis

r = redis.Redis(host='localhost', port=6379, db=0)
DWM = serial.Serial(port="/dev/ttyACM0", baudrate=115200)
print("Connected to " + DWM.name)
DWM.write("\r\r".encode())
print("Encode")
time.sleep(1)
DWM.write("lec\r".encode())
print("Encode")
time.sleep(1)
try:
    while True:
        data = DWM.readline()
        if(data):
            print(data)
            if ("DIST" in data and "AN0" in data and "AN1" in data and "AN2" in data):
                data = data.replace("\r\n", "")
                data = data.decode().split(",")
                if("DIST" in data):
                    anchor_Nummber = int(data[data.index("DIST")+1])
                    for i in range(anchor_Nummber):
                        pos_AN = {"id": data[data.index("AN"+str(i))+1], "x": data[data.index("AN"+str(i))+2], "y": data[data.index(
                            "AN"+str(i))+3], "dist": data[data.index("AN"+str(i))+5]}
                        pos_AN = json.dumps(pos_AN)
                        r.set('AN'+str(i), pos_AN)
                if("POS" in data):
                    pos = {"x": data[data.index("POS")+1],
                           "y": data[data.index("POS")+2]}
                    pos = json.dumps(pos)
                    print(pos)
                    r.set("pos", pos)
    DWM.write("\r".encode())
    DWM.close()

except KeyboardInterrupt:
    print("Messung vom User gestoppt")
