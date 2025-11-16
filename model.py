import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from xgboost import XGBClassifier
from sklearn.metrics import roc_auc_score, classification_report

# Load data
df = pd.read_csv("cleaned_data.csv", sep="\t")

print("Columns:", df.columns.tolist())
print(df.head())

# Split target vs features
y = df["tag"]
X = df.drop(columns=["tag"])

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Build model
pos_weight = (y_train == 0).sum() / (y_train == 1).sum()
model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=pos_weight,
    eval_metric="auc",
    random_state=42
)
# Train
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
probs = model.predict_proba(X_test)[:, 1]

cm = confusion_matrix(y_test, preds)
tn, fp, fn, tp = cm.ravel()

fpr = fp / (fp + tn)
fnr = fn / (fn + tp)
tpr = tp / (tp + fn)
tnr = tn / (tn + fp)

print("Confusion matrix:\n", cm)
print(f"False Positive Rate (FPR): {fpr:.4f}")
print(f"False Negative Rate (FNR): {fnr:.4f}")
print(f"True Positive Rate (Recall): {tpr:.4f}")
print(f"True Negative Rate (Specificity): {tnr:.4f}")

print(classification_report(y_test, preds))
print("ROC AUC:", roc_auc_score(y_test, probs))
