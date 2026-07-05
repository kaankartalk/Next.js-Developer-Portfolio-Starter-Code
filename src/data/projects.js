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
        body: "Under the EU's Common Agricultural Policy (CAP), farmers receive annual subsidies based on the land use type they declare. Some parcels are later converted to unauthorized uses while still being declared and subsidized as farmland. Manual field inspections to catch this are slow and expensive at scale.",
      },
      {
        heading: 'Approach',
        body: 'A convolutional neural network was trained on the EuroSAT dataset (27,000 labeled Sentinel-2 tiles across 10 land cover classes) to classify the true land use type of a satellite image tile. A compliance screening simulation then compares a simulated "declared" land type against the model\'s prediction, flagging mismatches for review.',
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