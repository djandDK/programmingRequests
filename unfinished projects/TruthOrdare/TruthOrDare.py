import os.path
from os import path, system, name
import re

def clear(): 
    if name == 'nt': 
        _ = system('cls') 
    else: 
        _ = system('clear') 

filePath = "demo.txt"
questiondict = dict()
regexString = re.compile("(?:(?P<number>[0-9]+)|(?P<letter>[a-zA-Z]+))+.*?:.*?(?P<text>\S.*\S)")
inputRegexString = re.compile("(?:(?P<number>[0-9]+)|(?P<letter>[a-zA-Z]+))+")

if path.exists(filePath):
    textFile = open(filePath, 'r') 
    lines = textFile.readlines()
    for line in lines:
        matchedString = regexString.search(line)
        if matchedString:
            questiondict[matchedString.group("number") + matchedString.group("letter").lower()] = matchedString.group("text")
        else:
            print("The following line couldn't be matched: " + line)
    if len(questiondict) > 0:
        userInput = ""
        while userInput.lower() != "exit":
            userInput = input("Enter the number and letter or type exit, to exit: ")
            clear()
            inputMatchedString = inputRegexString.search(userInput)
            if inputMatchedString:
                try:
                    numberLetter = inputMatchedString.group("number") + inputMatchedString.group("letter").lower()
                    question = questiondict[numberLetter]
                    print("Question with id: " + numberLetter + "\n\n")
                    print(question + "\n\n")
                except:
                    print("Wups, something went wrong when trying to get the question, perhaps it doesn't exist? \n\n")
            else:
                print("the id entered, isn't viable")
else:
    print("The demo.txt file is missing")
    userInput = input("Press any key to exit.")