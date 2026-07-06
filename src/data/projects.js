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
    images: [
      {
        src: '/projects/eurosat_sample_tiles.png',
        alt: 'Sample Sentinel-2 satellite tiles from the EuroSAT dataset',
        caption: 'Sample Sentinel-2 satellite tiles from the EuroSAT dataset, one per land cover class.',
      },
      {
        src: '/projects/eurosat_accuracy_loss.png',
        alt: 'Training and validation accuracy/loss curves over 10 epochs',
        caption: 'Model accuracy and loss over 10 training epochs.',
      },
      {
        src: '/projects/eurosat_precision_recall.png',
        alt: 'Precision vs recall comparison for two flagging strategies',
        caption:
          'Precision/recall trade-off: no confidence filter vs. filtering flags above 90% model confidence.',
      },
    ],
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
        heading: 'Method',
        body: 'Convolutional Neural Network (CNN) for image classification, followed by a "declared vs. actual" mismatch analysis to simulate a compliance screening pipeline.',
      },
      {
        heading: 'Results',
        body: 'The model reached 85.7% training accuracy and 85.15% validation accuracy after 10 epochs. Without any filtering, the compliance screening approach achieved 98.55% recall but only 54.68% precision. Filtering flags to only those where the model was more than 90% confident raised precision to 90.16%, at the cost of recall dropping to 62.89%.',
      },
      {
        heading: 'Key Insight',
        body: "There is no single 'correct' threshold — it depends on whether the priority is catching every possible violation (favor recall) or minimizing wasted inspector time on false alarms (favor precision). This threshold could be exposed as a tunable policy parameter in a real deployment.",
      },
    ],
  },
]