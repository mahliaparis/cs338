import csv
from itertools import islice

def open_first_hundred_lines(filepath):
    with open(filepath) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in islice(reader, 10):
            print(row)


if __name__ == "__main__":
    print("hello")
    filepath = input("enter relative filepath: ")
    open_first_hundred_lines(filepath)