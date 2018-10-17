file = open("wordsList.txt","r")
arr = [];
for line in file:
    arr.append(line.rstrip())

arr.sort()
print arr