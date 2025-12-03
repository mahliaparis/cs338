import pandas as pd
import boto3
import json

# load actual training data
df = pd.read_csv("vitals_demo_transf_flags.csv", sep="\t")

# get actual positive cases (tag=1)
positive_cases = df[df['tag'] == 1].head(5)

print("testing with real positive cases from data:")

# test each one
runtime = boto3.client('sagemaker-runtime', region_name='us-east-2')

for idx, row in positive_cases.iterrows():
    # remove tag and convert to dict
    test_data = row.drop('tag').to_dict()
    
    # show some key features
    print(f"\nCase {idx}:")
    print(f"  Age: {test_data['age']}, Gender: {test_data['gender']}")
    print(f"  RBCs: {test_data['RBCs']}, Total Qty: {test_data['total_qty']}")
    print(f"  BP: {test_data['BP_DIASTOLIC']}, SpO2: {test_data['SP02']}")
    
    # call endpoint
    response = runtime.invoke_endpoint(
        EndpointName='xgboost-xlap-endpoint-v3',
        ContentType='application/json',
        Body=json.dumps(test_data)
    )
    
    result = json.loads(response['Body'].read().decode())
    print(f"prediction: {result}")