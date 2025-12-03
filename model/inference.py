import json
import xgboost as xgb
import numpy as np
import pandas as pd

# Define feature columns
FEATURE_COLUMNS = [
    'encounter_emergency_key', 'gender', 'age', 'ir_id', 'encounter_id', 
    'total_qty', 'BP_DIASTOLIC', 'RESPIRATIONS', 'SP02', 'TEMPERATURE', 
    'Cryo', 'FFP', 'Platelets', 'RBCs', 'Transfuse_Cryoprecipitate', 
    'Transfuse_Emergency_RBC', 'Transfuse_FFP', 'Transfuse_Platelet_Pheresis', 
    'Transfuse_Plt_Pheresis_Irradiated', 'Transfuse_RBC', 
    'Transfuse_RBC_Autologous', 'gcs_available'
]

def model_fn(model_dir):
    """Load the XGBoost model"""
    model = xgb.Booster()
    model.load_model(f"{model_dir}/xgboost-model")
    return model

def input_fn(request_body, content_type='application/json'):
    """
    Parse input data and convert to XGBoost DMatrix
    
    Expected JSON format:
    {
        "encounter_emergency_key": 123456789,
        "gender": 1,
        "age": 45,
        ...
    }
    """
    if content_type == 'application/json':
        data = json.loads(request_body)
        df = pd.DataFrame([data])

        df = df[FEATURE_COLUMNS]
        
        # Convert to DMatrix
        dmatrix = xgb.DMatrix(df.values, feature_names=FEATURE_COLUMNS)
        return dmatrix
        
    else:
        raise ValueError(f"Unsupported content type: {content_type}")

def predict_fn(input_data, model):
    """Make predictions"""
    predictions = model.predict(input_data)
    return predictions

def output_fn(prediction, accept='application/json'):
    """Format output"""
    if accept == 'application/json':
        # Convert predictions to list and format
        pred_list = prediction.tolist()
        
        result = {
            'predictions': pred_list,
            'predicted_class': [1 if p > 0.5 else 0 for p in pred_list]
        }
        
        return json.dumps(result), accept
    raise ValueError(f"Unsupported accept type: {accept}")