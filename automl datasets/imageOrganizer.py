
import os
from os import listdir
from os.path import isfile, join
mypath = "C:\\Users\\bunne\\Desktop\\hackathons\\WHACK_IDLE\\idle\\automl datasets\\pain"

onlyFiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

print(onlyFiles)

for x in onlyFiles:
    # print(mypath + '\\' + x)
    if len(x.split('-')) > 1:
        #remove all 90 degree angle pictures
        if x.split('-')[1] == '90.jpg':
            os.remove(mypath + '\\' + x)
        else:#move all 45 degree angle pictures to NotStressed folder
            os.rename(mypath + '\\' + x, mypath + '\\NotStressed\\' + x)
    else:
        emInd = 0
        for y in range(1,len(x)):
            if x[y].isalpha():
                emInd = y
                break
        print(mypath + '\\' + x)
        print(x[emInd:emInd+2])
        if (x[emInd] == 'a' or x[emInd] == 'f' or x[emInd] == 'd' or x[emInd] == 'p' or x[emInd:emInd+2] == 'sa'):
            os.rename(mypath + '\\' + x, mypath + '\\Stressed\\' + x)
        else:
            os.rename(mypath + '\\' + x, mypath + '\\NotStressed\\' + x)
