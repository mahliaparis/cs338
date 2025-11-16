import csv
import os

def get_49000(readfile, writefile):
    file_exists = os.path.isfile(writefile)
    
    with open(writefile, 'a', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'encounter_emergency_key',
            'surgery_start_datetime',
            'surgery_end_datetime',
            'patient_in_or_datetime',
            'patient_out_or_datetime',
            'cpt_code'
        ])
        
        if not file_exists:
            writer.writeheader()
        
        with open(readfile, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['cpt_code'] == "49000":
                    writer.writerow(row)

if __name__ == "__main__":
    readfile = input("enter csv filepath: ")
    writefile = input("enter destination filepath: ")
    get_49000(readfile, writefile)
    print(f"file created at {writefile}")
    