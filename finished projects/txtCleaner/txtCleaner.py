import glob, re, codecs, nltk, os, itertools

##
## Function that splits the content of textfiles into paragraphs and sentences, based on a list of files
##
def splitByParagraphs(textFiles):
    for textFile in textFiles:
        file = codecs.open(textFile, "r", encoding='utf-8-sig')
        text = file.read().replace('(?<!\n)\n(?!\n)', ' ')
        text = re.sub(r'\n\s*\n', '\n\n', text)
        paragraphs = text.splitlines()
        newFile = codecs.open("New " + textFile + ".txt", "w", encoding='utf-8-sig')
        for paragraph in paragraphs:
            paragraph = re.sub("\s\s+" , " ", paragraph)
            sentences = nltk.sent_tokenize(paragraph)
            for idx, sentence in enumerate(sentences):
                newFile.write(sentence + "\n")
                if idx == len(sentences) -1:
                    newFile.write("\n")
        newFile.close()
        file.close()

##
## Function that sandwiches sentences from multiple files together into 1 file
##
def joinMultipleFilesToSentences(textFiles):
    sentences = list()
    filename = ""
    for idx, textFile in enumerate(textFiles):
        file = codecs.open(textFile, "r", encoding='utf-8-sig')
        text = file.read().replace('\n', ' ')
        text = re.sub("\s\s+" , " ", text)
        sentences.append(nltk.sent_tokenize(text))
        if idx + 1 == len(textFiles) or idx == 4:
            filename += textFile.partition('.txt')[0]
        elif idx < 4:
            filename += textFile.partition('.txt')[0] + " - "
        file.close()
    filename = "Combined " + filename
    filename = (filename[:150] + '..') if len(filename) > 150 else filename
    newFile = codecs.open(filename + ".txt", "w", encoding='utf-8-sig')
    for sentenceSet in itertools.zip_longest(*sentences):
        for sentence in sentenceSet:
            if sentence != None:
                newFile.write(sentence + "\n")
    newFile.close()
            
##
## Function to get the list of text files the user wants the task performed on
##
def getFileList():
    textFiles = glob.glob("[!(New |Combined )]*.txt")
    for idx, textfile in enumerate(textFiles):
        print("[" + str(idx) + "] - " + textfile)
    print("")
    numbers = [int(x) for x in input("Enter the numbers corresponding to the files you want the task performed on: ").split()]
    selectedTexts = list()
    for number in numbers:
        try:
            selectedTexts.append(textFiles[number])
        except:
            pass
    return selectedTexts

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
    print("[0] - Split multiple files into sentences and paragraphs\n[1] - Split multiple files into sentences and combine them\n[Any] - Exit program")
    print("")
    choice = input("Enter the number corresponding to the task you want performed: ")
    clearConsole()
    if choice == "0":
        textFiles = getFileList()
        if len(textFiles) > 0:
            splitByParagraphs(textFiles)
            clearConsole()
            input("Task completed, press any button to continue")
        else:
            clearConsole()
            input("Unable to perform task, no text files selected")
        
    elif choice == "1":
        textFiles = getFileList()
        if len(textFiles) > 0:
            joinMultipleFilesToSentences(textFiles)
            clearConsole()
            input("Task completed, press any button to continue")
        else:
            clearConsole()
            input("Unable to perform task, no text files selected")
    else:
        exit()