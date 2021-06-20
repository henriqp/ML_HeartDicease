import pandas as pd
import numpy as np
import sys

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

def is_float(value):
  try:
    float(value)
    return True
  except:
    return False

dataset = pd.read_excel('datasets/heart.xlsx')


X = dataset.drop(['target'], axis=1)
y = dataset['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.25)

logistic_reg = LogisticRegression()

model = logistic_reg.fit(X_train, y_train)

data = sys.argv[1]

data = data.split(',')

for i in range(0, len(data)):
    if is_float(data[i]):
        data[i] = float(data[i])
    else:
        data[i] = int(data[i])

y_pred = model.predict([data])

print(y_pred)