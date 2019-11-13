from bs4 import BeautifulSoup
import os, glob, codecs

##
## Function that looks through a list of files and finds links inside
##
def createLinkList(files):
    for file in files:
        oldfile = codecs.open(file, "r", encoding='utf-8-sig')
        text = oldfile.read()
        soup = BeautifulSoup(text, "html.parser")
        atags = soup.findAll('a', ['entry-date', 'permalink'])
        titles = soup.select('div.topic-item h1')
        newFile = codecs.open("New " + file[:file.rindex('.')] + ".txt", "w", encoding='utf-8-sig')
        for title, atag in zip(titles, atags):
            newFile.write(title['data-title'] + ": " + atag['href'] + "\n")
        newFile.close()

##
## Function to get the list of files the user wants the task performed on
##
def getFileList():
    files = glob.glob("*.html")
    for idx, file in enumerate(files):
        print("[" + str(idx) + "] - " + file)
    print("")
    numbers = [int(x) for x in input("Enter the numbers corresponding to the files you want the task performed on: ").split()]
    selectedFiles = list()
    for number in numbers:
        try:
            selectedFiles.append(files[number])
        except:
            pass
    return selectedFiles

##
## Function to clear the console, works for both linux and windows
##
def clearConsole():
    os.system('clear')
    os.system('cls')

##
## While loop that runs until the user exits the application
##
while True:
    clearConsole()
    print("[0] - Make lists of links from files\n[Any] - Exit program")
    print("")
    choice = input("Enter the number corresponding to the task you want performed: ")
    clearConsole()
    if choice == "0":
        files = getFileList()
        if len(files) > 0:
            createLinkList(files)
            clearConsole()
            input("Task completed, press any button to continue")
        else:
            clearConsole()
            input("Unable to perform task, no files selected")
    else:
        exit()