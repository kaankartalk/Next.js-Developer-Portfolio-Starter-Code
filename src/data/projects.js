export const categories = [
  { id: 'space', label: 'Space & Earth Observation' },
  { id: 'finance', label: 'Finance' },
]

export const projects = [
  {
    slug: 'satellite-land-compliance',
    category: 'space',
    title: 'Satellite-Based Land Use Compliance Screening',
    shortDescription:
      'CNN-based land cover classification on Sentinel-2 imagery, simulating an EU-style agricultural subsidy compliance tool.',
    tech: 'Python, TensorFlow/Keras, EuroSAT (Sentinel-2)',
    githubLink: 'https://github.com/kaankartalk/satellite-land-compliance-cnn',
    images: [],
    sections: [
      {
        heading: 'Problem',
        body: "Under the EU's Common Agricultural Policy (CAP), farmers receive annual subsidies based on the land use type they declare (e.g., \"cropland\"). However, some parcels are later converted to unauthorized uses — industrial development, abandonment, residential expansion — while still being declared and subsidized as farmland. Detecting this via manual field inspections is slow and expensive at scale.",
      },
      {
        heading: 'Solution',
        body: "This project uses a deep learning model trained on ESA's Sentinel-2 satellite imagery to automatically predict the actual land use type of a parcel. When the declared type doesn't match the model's prediction, the parcel is flagged for priority field inspection.",
      },
      {
        heading: 'Data',
        body: 'Source: EuroSAT (Sentinel-2 satellite imagery, ESA). 10 land use classes: Cropland (2 types), Forest, Pasture, Industrial, Residential, River, Lake, Highway, Herbaceous vegetation. 27,000 labeled images.',
      },
      {
        heading: 'Step 1 — Environment Setup',
        body: 'Starting with the core libraries: TensorFlow/Keras for the model, NumPy for array operations, and Matplotlib for visualization.',
        code: `import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt

print("TensorFlow version:", tf.__version__)`,
        output: `TensorFlow version: 2.20.0`,
      },
      {
        heading: 'Step 2 — Downloading the Satellite Imagery Dataset',
        body: "EuroSAT is a public dataset built from real Sentinel-2 satellite imagery — the same satellite constellation used operationally for EU land monitoring — containing 27,000 labeled image tiles across 10 land cover classes. The code below downloads the dataset as a ZIP file (streamed in chunks to handle its size), extracts it into a local folder, and automatically locates the directory containing the 10 class subfolders (Forest/, Industrial/, River/, etc.), each holding hundreds of .jpg tiles. This mirrors loading a CSV in a tabular ML project — except here, the folder structure itself encodes the labels.",
        code: `import requests
import zipfile
import os
import pathlib
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

dataset_url = "https://madm.dfki.de/files/sentinel/EuroSAT.zip"
zip_path = "EuroSAT.zip"

if not os.path.exists(zip_path):
    print("Downloading...")
    response = requests.get(dataset_url, verify=False, stream=True)
    response.raise_for_status()
    with open(zip_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    print("Download complete.")

extract_dir = "./eurosat_data"
if not os.path.exists(extract_dir):
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_dir)
    print("Extraction complete.")

for root, dirs, files in os.walk(extract_dir):
    if len(dirs) == 10:
        data_dir = pathlib.Path(root)
        break

print("Data directory:", data_dir)
print("Classes found:", sorted(os.listdir(data_dir)))`,
        output: `Downloading...
Download complete.
Extraction complete.
Data directory: eurosat_data/2750
Classes found: ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Highway', 'Industrial', 'Pasture', 'PermanentCrop', 'Residential', 'River', 'SeaLake']`,
      },
      {
        heading: 'Step 3 — Loading and Splitting the Data',
        body: "Keras's image_dataset_from_directory loads all images, resizes them consistently, batches them, and splits 80/20 into train/validation in one call — automatically using each subfolder name as the label.",
        code: `img_size = (64, 64)
batch_size = 32

ds_train = keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="training",
    seed=42,
    image_size=img_size,
    batch_size=batch_size
)

ds_test = keras.utils.image_dataset_from_directory(
    data_dir,
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=img_size,
    batch_size=batch_size
)

class_names = ds_train.class_names
print("Class names:", class_names)`,
        output: `Found 27000 files belonging to 10 classes.
Using 21600 files for training.
Found 27000 files belonging to 10 classes.
Using 5400 files for validation.
Class names: ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Highway', 'Industrial', 'Pasture', 'PermanentCrop', 'Residential', 'River', 'SeaLake']`,
      },
      {
        heading: 'Step 4 — Sanity-Checking the Data',
        body: 'Before trusting the pipeline, a quick visual check confirms images and labels actually line up correctly.',
        code: `plt.figure(figsize=(10, 10))
for images, labels in ds_train.take(1):
    for i in range(9):
        ax = plt.subplot(3, 3, i + 1)
        plt.imshow(images[i].numpy().astype("uint8"))
        plt.title(class_names[labels[i]])
        plt.axis("off")
plt.suptitle("Sample Sentinel-2 Satellite Tiles from EuroSAT", fontsize=14)
plt.show()`,
        image: {
          src: '/projects/eurosat_sample_tiles.png',
          alt: 'Sample Sentinel-2 satellite tiles from the EuroSAT dataset',
          caption: 'Sample Sentinel-2 satellite tiles from the EuroSAT dataset, one per land cover class.',
        },
      },
      {
        heading: 'Step 5 — Normalizing Pixel Values',
        body: 'Pixel values range 0-255 by default. Neural networks train more stably on small numbers (0-1), so a rescaling layer is added directly into the data pipeline.',
        code: `normalization_layer = tf.keras.layers.Rescaling(1./255)

ds_train = ds_train.map(lambda x, y: (normalization_layer(x), y))
ds_test = ds_test.map(lambda x, y: (normalization_layer(x), y))

for images, labels in ds_train.take(1):
    print("Min pixel value:", images.numpy().min())
    print("Max pixel value:", images.numpy().max())`,
        output: `Min pixel value: 0.0627451
Max pixel value: 1.0`,
      },
      {
        heading: 'Step 6 — Building the CNN',
        body: "Unlike a plain regression model that weighs input features directly, a CNN scans small patches of the image looking for patterns — edges, textures, shapes — and stacks these into increasingly complex features (edges → textures → \"this looks like a road\"). Three convolution blocks extract features, followed by dense layers for the final classification decision.",
        code: `num_classes = len(class_names)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(64, 64, 3)),

    tf.keras.layers.Conv2D(32, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(64, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(128, 3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()`,
        output: `684,490 trainable parameters, clean architecture, no shape mismatches.`,
      },
      {
        heading: 'Step 7 — Training the Model',
        body: 'Training for 10 epochs — each epoch is a full pass through all 21,600 training images (675 batches of 32).',
        code: `epochs = 10

history = model.fit(
    ds_train,
    validation_data=ds_test,
    epochs=epochs
)`,
        output: `Epoch 1/10
675/675 - accuracy: 0.4859 - loss: 1.3379 - val_accuracy: 0.5619 - val_loss: 1.1648
Epoch 2/10
675/675 - accuracy: 0.6706 - loss: 0.9128 - val_accuracy: 0.6709 - val_loss: 0.8984
Epoch 3/10
675/675 - accuracy: 0.7200 - loss: 0.7804 - val_accuracy: 0.7930 - val_loss: 0.5933
Epoch 4/10
675/675 - accuracy: 0.7493 - loss: 0.6971 - val_accuracy: 0.7546 - val_loss: 0.6801
Epoch 5/10
675/675 - accuracy: 0.7749 - loss: 0.6370 - val_accuracy: 0.8178 - val_loss: 0.5039
Epoch 6/10
675/675 - accuracy: 0.8057 - loss: 0.5548 - val_accuracy: 0.8324 - val_loss: 0.4961
Epoch 7/10
675/675 - accuracy: 0.8220 - loss: 0.5071 - val_accuracy: 0.8431 - val_loss: 0.4484
Epoch 8/10
675/675 - accuracy: 0.8387 - loss: 0.4580 - val_accuracy: 0.8504 - val_loss: 0.4340
Epoch 9/10
675/675 - accuracy: 0.8483 - loss: 0.4272 - val_accuracy: 0.8222 - val_loss: 0.5236
Epoch 10/10
675/675 - accuracy: 0.8570 - loss: 0.3952 - val_accuracy: 0.8515 - val_loss: 0.4379`,
      },
      {
        heading: 'Step 8 — Accuracy and Loss Curves',
        body: 'Training (85.7%) and validation (85.15%) accuracy end close together — a sign the model is genuinely learning generalizable patterns, not memorizing the training set (no overfitting).',
        code: `plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy Over Epochs')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss Over Epochs')
plt.legend()

plt.tight_layout()
plt.show()`,
        image: {
          src: '/projects/eurosat_accuracy_loss.png',
          alt: 'Training and validation accuracy/loss curves over 10 epochs',
          caption: 'Model accuracy and loss over 10 training epochs.',
        },
      },
      {
        heading: 'Step 9 — Simulating Declared vs. Predicted Land Use',
        body: 'On the 5,400 test images (never seen during training), each parcel is assigned a simulated "declared type" — 85% honest, 15% intentionally false, to mimic realistic non-compliance rates. A mismatch between the model\'s prediction and the declared type triggers a "NEEDS REVIEW" flag.',
        code: `fraud_rate = 0.15

declared_labels = []
for true_label in true_labels:
    if random.random() < fraud_rate:
        wrong_choices = [c for c in range(num_classes) if c != true_label]
        declared_labels.append(random.choice(wrong_choices))
    else:
        declared_labels.append(true_label)

declared_labels = np.array(declared_labels)
print(f"Simulated false declaration rate: {(declared_labels != true_labels).mean():.2%}")`,
        output: `Simulated false declaration rate: 15.37%`,
      },
      {
        heading: 'Step 10 — Evaluating the Compliance Screening System',
        body: "Comparing flagged parcels against ground truth reveals the system's real-world performance: 818 true positives (correctly caught false declarations), 678 false positives (honest declarations wrongly flagged), 12 false negatives (missed cases), and 3,892 true negatives.",
        code: `precision = true_positives / (true_positives + false_positives)
recall = true_positives / (true_positives + false_negatives)

print(f"Precision: {precision:.2%}")
print(f"Recall: {recall:.2%}")`,
        output: `Precision (of flagged parcels, % actually fraudulent): 54.68%
Recall (of all false declarations, % caught): 98.55%`,
      },
      {
        heading: 'Step 11 — Improving Precision with a Confidence Filter',
        body: 'Since the underlying model is only ~85% accurate, some of the false positives are simply the model\'s own misclassifications, not real fraud. Filtering flags to only those where the model is more than 90% confident substantially improves precision.',
        code: `high_conf_flagged = results_df['flagged_for_review'] & (results_df['model_confidence'] > 0.90)

tp_hc = (high_conf_flagged & actually_false).sum()
fp_hc = (high_conf_flagged & ~actually_false).sum()

precision_hc = tp_hc / (tp_hc + fp_hc)
recall_hc = tp_hc / actually_false.sum()

print(f"Precision: {precision_hc:.2%}")
print(f"Recall: {recall_hc:.2%}")
print(f"Parcels flagged: {high_conf_flagged.sum()} (vs {flagged.sum()} before)")`,
        output: `With confidence > 0.90 filter:
Precision: 90.16%
Recall: 62.89%
Parcels flagged: 579 (vs 1496 before)`,
      },
      {
        heading: 'Results',
        body: 'The model reached 85.7% training accuracy and 85.15% validation accuracy after 10 epochs. Without any filtering, the compliance screening approach achieved 98.55% recall but only 54.68% precision. Filtering flags to only those where the model was more than 90% confident raised precision to 90.16%, at the cost of recall dropping to 62.89%.',
        image: {
          src: '/projects/eurosat_precision_recall.png',
          alt: 'Precision vs recall comparison for two flagging strategies',
          caption: 'Precision/recall trade-off: no confidence filter vs. filtering flags above 90% model confidence.',
        },
      },
      {
        heading: 'Key Insight',
        body: "There is no single 'correct' threshold — it depends on whether the priority is catching every possible violation (favor recall) or minimizing wasted inspector time on false alarms (favor precision). This threshold could be exposed as a tunable policy parameter in a real deployment.",
      },
    ],
  },
]