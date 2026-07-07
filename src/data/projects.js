export const categories = [
  {
    id: 'space',
    label: 'Space',
    blurb: 'Using satellite imagery and deep learning to catch land-use compliance issues before they become a problem.',
  },
  {
    id: 'finance',
    label: 'Finance',
    blurb: 'Exploring how Banking-as-a-Service and open banking are reshaping financial infrastructure.',
  },
  {
    id: 'customer-experience',
    label: 'Customer Experience',
    blurb: 'Looking at how data-driven personalization and friction reduction shape customer loyalty.',
  },
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
  {
    slug: 'satellite-collision-risk',
    category: 'space',
    title: 'Satellite Collision Risk Analysis',
    shortDescription:
      'A simplified conjunction-assessment pipeline: live TLE data, SGP4 orbit propagation, and pairwise close-approach screening to flag which satellites are about to pass dangerously close to each other.',
    tech: 'Python, Skyfield (SGP4), NumPy, pandas, SciPy, Matplotlib, live CelesTrak API',
    githubLink: 'https://github.com/kaankartalk/Space',
    images: [],
    sections: [
      {
        heading: 'Problem',
        body: "On February 11, 2009, two intact satellites — Kosmos-2251 and Iridium 33 — collided in orbit for the first time in history, creating over 2,000 pieces of trackable debris. With 10,000+ active satellites now in orbit, a large share of them packed into megaconstellations, figuring out which satellite pairs are about to come dangerously close is a continuous operational problem for satellite operators: every maneuver costs fuel and shortens a satellite's service life, but not maneuvering risks the satellite — and, in the worst case, a debris cascade (the 'Kessler Syndrome') that threatens every other satellite sharing that orbital shell.",
      },
      {
        heading: 'Solution',
        body: "A simplified but real-data-driven 'conjunction assessment' pipeline — the same category of process the U.S. Space Force's 18th Space Defense Squadron runs at scale. It pulls live orbital data for a LEO megaconstellation, propagates every satellite's position 24 hours forward, screens all pairs for close approaches, and scores/ranks the results by how urgent each one is. Scope is stated explicitly: satellites are treated as point masses and the risk score is a ranking heuristic, not a calibrated collision probability — real systems require object size and position-uncertainty data that isn't publicly available.",
      },
      {
        heading: 'Data',
        body: "Source: live Two-Line Element (TLE) sets from CelesTrak, fetched directly from their per-constellation endpoint. TLEs are the standard format for describing a satellite's orbit — published by the U.S. Space Force and refreshed roughly every 2 hours. Because CelesTrak explicitly rate-limits repeat downloads of the same group within that window, the fetch function caches each group to disk and falls back to the cached copy if a fresh request is declined — a small but real piece of data-engineering hygiene that mattered the moment this pipeline hit that live rate limit while being built.",
      },
      {
        heading: 'Step 1 — Fetching Live Orbital Data',
        body: "Rather than downloading the entire ~10,000+ satellite active catalog and filtering client-side, the pipeline queries CelesTrak's dedicated constellation endpoint directly — faster, and better-scoped. (The pipeline actually pivoted from Starlink to OneWeb mid-build after hitting CelesTrak's real 2-hour rate limit on the Starlink group — the caching logic below is what makes that kind of hiccup a non-event on any future run.)",
        code: `def fetch_tle_group(group, ts):
    """Download a named TLE group from CelesTrak, caching to disk
    to respect their 2-hour update cadence."""
    cache_path = os.path.join(CACHE_DIR, f"{group}.tle")
    is_fresh = (
        os.path.exists(cache_path)
        and (time.time() - os.path.getmtime(cache_path)) / 3600 < CACHE_TTL_HOURS
    )
    if not is_fresh:
        url = f"https://celestrak.org/NORAD/elements/gp.php?GROUP={group}&FORMAT=tle"
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            with open(cache_path, "w") as f:
                f.write(response.text)
        except requests.exceptions.HTTPError:
            if os.path.exists(cache_path):
                print(f"CelesTrak declined a fresh '{group}' download — using cache.")
            else:
                raise
    # ...parse cached TLE lines into Skyfield EarthSatellite objects
    return satellites

constellation_sats = fetch_tle_group("oneweb", ts)
print(f"Satellites loaded: {len(constellation_sats)}")`,
        output: `Oneweb satellites loaded: 651
First 5: ['ONEWEB-0012', 'ONEWEB-0010', 'ONEWEB-0008', 'ONEWEB-0007', 'ONEWEB-0006']`,
      },
      {
        heading: 'Step 2 — Why Altitude Is Everything',
        body: "Satellites cluster into altitude 'shells': LEO (~300–2,000 km) is where megaconstellations and almost all satellite collisions happen; MEO (~2,000–35,000 km) hosts GPS/GNSS constellations; GEO (~35,786 km) hosts broadcast satellites spread around one large ring, naturally far apart. Altitude is estimated directly from a TLE's mean motion via Kepler's Third Law, then the sample is narrowed to one constellation — satellites flying in tightly coordinated, nearby shells by design, where close approaches are actually likely — and capped at 300 satellites, since pairwise comparison cost grows with the square of the sample size (300 → ~45,000 pairs; 3,000 → ~4.5 million).",
        code: `def altitude_km(sat):
    """Estimate circular-orbit altitude from mean motion (Kepler's 3rd Law)."""
    mean_motion_rad_s = sat.model.no_kozai / 60.0
    semi_major_axis_km = (MU_EARTH / mean_motion_rad_s ** 2) ** (1 / 3)
    return semi_major_axis_km - EARTH_RADIUS_KM

sample_idx = rng.choice(len(constellation_sats), size=300, replace=False)
sample_sats = [constellation_sats[i] for i in sample_idx]`,
        output: `Sample altitudes (km) for first 10: [1205, 1205, 1205, 1209, 1209, 1209, 1232, 1229, 1229, 1229]
Working sample: 300 Oneweb satellites`,
      },
      {
        heading: 'Step 3 — Orbit Propagation with SGP4',
        body: "A TLE only describes a satellite's orbit at one instant. Predicting where it'll be in 24 hours requires accounting for atmospheric drag, Earth's equatorial bulge (J2 perturbation), and other effects a plain two-body model ignores. SGP4 (Simplified General Perturbations 4) is the industry-standard analytical model built specifically for this, used via the Skyfield library. Every satellite in the sample is propagated across a 24-hour window in 5-minute steps, collecting both position and velocity — velocity is needed later to judge how fast two satellites are closing on each other.",
        code: `n_steps = (24 * 60) // 5 + 1  # 289 steps
now = ts.now()
times = ts.tt_jd(now.tt + np.arange(n_steps) * 5 / 1440.0)

positions_km = np.empty((len(sample_sats), 3, n_steps))
velocities_km_s = np.empty((len(sample_sats), 3, n_steps))
for i, sat in enumerate(sample_sats):
    geocentric = sat.at(times)
    positions_km[i] = geocentric.position.km
    velocities_km_s[i] = geocentric.velocity.km_per_s`,
        output: `Propagating 300 satellites across 289 time steps (24h window, every 5 min)...
positions_km shape: (300, 3, 289)  (satellites, xyz, time_steps)`,
      },
      {
        heading: 'Step 4 — Conjunction Detection',
        body: "With 300 satellites, there are ~45,000 unique pairs to screen — the full ~10,000-satellite catalog would be ~50 million, which is exactly why real systems use spatial filtering before expensive precise geometry (this pipeline's constellation-level filtering is a coarse version of that same idea). For every pair, the algorithm steps through all 289 time samples tracking the smallest distance seen — the Time of Closest Approach (TCA), the same term used operationally — and keeps only pairs whose miss distance falls under a 25 km screening threshold (real systems use a directional 3D box; a sphere is a defensible simplification here).",
        code: `pair_indices = list(itertools.combinations(range(n_sats), 2))
min_distance_km = np.full(len(pair_indices), np.inf)
min_distance_time_idx = np.zeros(len(pair_indices), dtype=int)

for t in range(n_steps):
    dists_at_t = pdist(positions_km[:, :, t])  # condensed pairwise distances
    improved = dists_at_t < min_distance_km
    min_distance_km[improved] = dists_at_t[improved]
    min_distance_time_idx[np.where(improved)[0]] = t

close_calls = conjunctions[conjunctions["miss_distance_km"] < 25.0]`,
        output: `Pairs screened: 44,850
Pairs under the 25 km screening threshold: 13`,
      },
      {
        heading: 'Step 5 — Risk Scoring',
        body: "Miss distance alone doesn't capture urgency: two satellites drifting past at 25 km with little relative motion is very different from two satellites passing at a similar distance but several km/s of relative speed — far less reaction time, and more energy released if a collision did happen. The two signals are combined into a heuristic — relative speed divided by miss distance — explicitly framed as a ranking tool, not a calibrated probability, since that would require object size and position-uncertainty data no TLE provides. Each close call is also bucketed into a severity band (critical / serious / warning / monitor) based on physical miss distance.",
        code: `def relative_speed_km_s(row):
    i, j, t = int(row["idx_a"]), int(row["idx_b"]), int(row["tca_step"])
    v_rel = velocities_km_s[i, :, t] - velocities_km_s[j, :, t]
    return np.linalg.norm(v_rel)

close_calls["relative_speed_km_s"] = close_calls.apply(relative_speed_km_s, axis=1)
close_calls["risk_score"] = close_calls["relative_speed_km_s"] / close_calls["miss_distance_km"]`,
        output: `   sat_a        sat_b        miss_distance_km  relative_speed_km_s  risk_score  severity
0  ONEWEB-0304  ONEWEB-0387  12.58             10.36                 0.824      warning
1  ONEWEB-0711  ONEWEB-0230  21.32             12.67                 0.594      monitor
2  ONEWEB-0701  ONEWEB-0063   8.39              1.91                 0.228      serious`,
      },
      {
        heading: 'Step 6 — Visualizing the Result',
        body: "The ranked view surfaces the 10 riskiest pairs, colored by severity band with direct labels so no reader has to decode color alone. A second chart tracks separation distance over the full 24-hour window for the top 3 pairs — plotted on a log scale, since two satellites in similar orbits swing thousands of km apart every orbit (opposite sides of Earth) which would otherwise swamp the tens-of-km detail that actually matters. Each pair's Time of Closest Approach is marked directly on its curve.",
        image: {
          src: '/projects/satellite_collision_top10_risk.png',
          alt: 'Bar chart ranking the top 10 closest satellite approaches by risk score, colored by severity band',
          caption: 'Top 10 closest approaches in the next 24 hours, colored by severity band (critical/serious/warning/monitor).',
        },
      },
      {
        heading: 'Results',
        body: "Screening 44,850 candidate pairs across a 300-satellite OneWeb sample over a 24-hour window surfaced 13 pairs closing to within the 25 km threshold — the closest at 8.4 km. The log-scale distance chart makes the underlying orbital rhythm visible (satellites in similar orbits sweep thousands of km apart every pass) while still clearly resolving the moment each risky pair dips toward its Time of Closest Approach.",
        image: {
          src: '/projects/satellite_collision_distance_over_time.png',
          alt: 'Log-scale line chart of separation distance over 24 hours for the three closest satellite pairs, with each Time of Closest Approach marked',
          caption: 'Separation distance over the next 24 hours for the 3 closest pairs (log scale) — dots mark each Time of Closest Approach.',
        },
      },
      {
        heading: 'Key Insight',
        body: "The single most useful modeling decision here wasn't the risk formula — it was being explicit about what the model can't do. A TLE has no size or uncertainty data, so the 'risk score' is a ranking heuristic, not a real Pc (collision probability); stating that table of simplifications up front, rather than overselling the model, is what makes the result defensible. The same discipline showed up operationally too: hitting CelesTrak's real rate limit mid-build wasn't a bug to hide, it was a forcing function for the caching logic — the kind of production-grade handling that's easy to skip in a one-off script but matters the moment a pipeline runs on a schedule.",
      },
    ],
  },
]