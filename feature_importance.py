import xgboost as xgb
import pandas as pd
import matplotlib.pyplot as plt

# load model
model = xgb.Booster()
model.load_model("xgb_xlap_model.json")

# get feature importance
importance = model.get_score(importance_type='gain')
importance_df = pd.DataFrame({
    'feature': importance.keys(),
    'importance': importance.values()
}).sort_values('importance', ascending=False)

# remove encounter_id, ir_id, encounter_emergency_key
importance_df = importance_df[importance_df['feature'] != 'encounter_id']
importance_df = importance_df[importance_df['feature'] != 'ir_id']
importance_df = importance_df[importance_df['feature'] != 'encounter_emergency_key']
importance_df['feature'] = importance_df['feature'].replace('total_qty', 'total_transfusions')

print("top features for xlap prediction")
print(importance_df.head(15))

# create plot
plt.figure(figsize=(12, 8))
top_features = importance_df.head(15)
plt.barh(range(len(top_features)), top_features['importance'], color='steelblue')
plt.yticks(range(len(top_features)), top_features['feature'])
plt.xlabel('Feature Importance (Gain)', fontsize=12)
plt.ylabel('Feature', fontsize=12)
plt.title('Top 15 Features Predicting Exploratory Laparotomy Necessity', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()  # highest importance at top
plt.tight_layout()
plt.savefig('xlap_feature_importance.png', dpi=300, bbox_inches='tight')
plt.show()

print("plot saved as 'xlap_feature_importance.png'")