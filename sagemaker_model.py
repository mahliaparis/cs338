import boto3
import time

REGION = 'us-east-2'
BUCKET = 'oracle-bucket-ab'
ROLE_ARN = 'arn:aws:iam::361769594767:role/SageMakerExecRole'

sm_client = boto3.client('sagemaker', region_name=REGION)
image_uri = '257758044811.dkr.ecr.us-east-2.amazonaws.com/sagemaker-xgboost:1.7-1'

for name in ['xgboost-xlap-config', 'xgboost-xlap-config-v2']:
    try:
        sm_client.delete_endpoint_config(EndpointConfigName=name)
        print(f"Deleted config: {name}")
    except: pass

for name in ['xgboost-xlap-model', 'xgboost-xlap-model-v2']:
    try:
        sm_client.delete_model(ModelName=name)
        print(f"Deleted model: {name}")
    except: pass

time.sleep(10)

# Create new model with inference.py
model_name = 'xgboost-xlap-model-v3'
sm_client.create_model(
    ModelName=model_name,
    PrimaryContainer={
        'Image': image_uri,
        'ModelDataUrl': f's3://{BUCKET}/xgboost-model/model.tar.gz',
        'Environment': {
            'SAGEMAKER_PROGRAM': 'inference.py',
            'SAGEMAKER_SUBMIT_DIRECTORY': '/opt/ml/model'
        }
    },
    ExecutionRoleArn=ROLE_ARN
)
print(f"model created: {model_name}")

# Create endpoint config
endpoint_config_name = 'xgboost-xlap-config-v3'
sm_client.create_endpoint_config(
    EndpointConfigName=endpoint_config_name,
    ProductionVariants=[{
        'VariantName': 'AllTraffic',
        'ModelName': model_name,
        'ServerlessConfig': {
            'MemorySizeInMB': 2048,
            'MaxConcurrency': 10
        }
    }]
)
print(f"config created: {endpoint_config_name}")

# Create endpoint
endpoint_name = 'xgboost-xlap-endpoint-v3'
sm_client.create_endpoint(
    EndpointName=endpoint_name,
    EndpointConfigName=endpoint_config_name
)
print(f"creating endpoint: {endpoint_name}")