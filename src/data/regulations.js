export const regulations = [
  {
    slug: 'eu-ai-act',
    name: 'EU AI Act',
    officialRef: 'Regulation (EU) 2024/1689',
    shortDescription:
      'Directly regulates AI systems: risk classification, technical documentation, and transparency obligations.',
    sections: [
      {
        heading: 'What It Is',
        body: "The EU AI Act is the first comprehensive legal framework for artificial intelligence, adopted in 2024. It regulates AI systems based on the level of risk they pose, rather than regulating a specific technology — the same underlying model can face very different obligations depending on how it's used.",
      },
      {
        heading: 'Who It Applies To',
        body: 'Providers, deployers, importers, and distributors of AI systems placed on the EU market, or whose output is used in the EU — regardless of where the organization is established. This extraterritorial reach means non-EU companies serving EU users are in scope.',
      },
      {
        heading: 'Risk-Based Classification',
        body: 'The Act sorts AI systems into four tiers:',
        list: [
          'Unacceptable risk (prohibited) — social scoring by public authorities, real-time remote biometric identification in public spaces (with narrow law-enforcement exceptions), manipulative or subliminal techniques causing harm, emotion inference in workplaces/schools, untargeted scraping of facial images to build recognition databases, predictive policing based solely on profiling.',
          'High risk — AI used in areas listed in Annex III: biometric identification, critical infrastructure, education, employment, access to essential services (credit, insurance), law enforcement, migration/border control, and the justice system — plus AI that is a safety component of already-regulated products (e.g., medical devices, machinery). Subject to the most extensive obligations.',
          'Limited risk — specific transparency obligations: chatbots must disclose they are AI, AI-generated or manipulated content (deepfakes) must be labeled, emotion-recognition and biometric-categorization systems must inform the people exposed to them.',
          'Minimal risk — everything else (e.g., spam filters, AI-enabled games). No mandatory obligations, though voluntary codes of conduct are encouraged.',
        ],
      },
      {
        heading: 'Key Obligations for High-Risk Systems',
        list: [
          'A risk management system spanning the full lifecycle',
          'Data governance — training/validation/test data quality and bias examination',
          'Technical documentation and automatic logging',
          'Transparency and instructions for deployers',
          'Human oversight built into the system design',
          'Accuracy, robustness, and cybersecurity requirements',
          'Conformity assessment before market placement, plus registration in an EU database',
        ],
      },
      {
        heading: 'General-Purpose AI (GPAI) Models',
        body: 'Foundation-model providers face separate obligations: technical documentation, a training-data summary, and a copyright/IP compliance policy. Models classified as having "systemic risk" (currently defined via a compute threshold of 10^25 FLOPs) face additional obligations — model evaluation, adversarial testing, incident reporting, and cybersecurity protection.',
      },
      {
        heading: 'Timeline',
        body: 'Entered into force 1 August 2024, with phased application:',
        list: [
          '2 Feb 2025 — prohibitions on unacceptable-risk practices, plus AI-literacy obligations',
          '2 Aug 2025 — governance rules, GPAI-model obligations, penalty regime',
          '2 Aug 2026 — the main body of obligations, including most high-risk (Annex III) systems',
          '2 Aug 2027 — high-risk AI that is a safety component under other EU product-safety legislation (Annex I)',
        ],
      },
      {
        heading: 'Penalties',
        body: 'Up to €35M or 7% of global annual turnover (whichever is higher) for violations of prohibited practices; up to €15M or 3% for other obligations; up to €7.5M or 1% for supplying incorrect information.',
      },
      {
        heading: 'Why It Matters for ML Practitioners',
        body: "Classifying a system's risk tier before building it determines which obligations actually apply. Training-data governance and documentation requirements affect how datasets should be curated and recorded from day one, not retrofitted later. Transparency obligations are often the easiest to trigger unintentionally, since they cover chatbots and generative systems broadly.",
      },
    ],
  },
  {
    slug: 'gdpr',
    name: 'GDPR',
    officialRef: 'Regulation (EU) 2016/679',
    shortDescription:
      'Applies whenever training data contains personal data — which is almost always. Covers automated decision-making and data minimization.',
    sections: [
      {
        heading: 'What It Is',
        body: "The General Data Protection Regulation, in force since 25 May 2018, is the EU's core data-protection law. It governs the processing of personal data — any information relating to an identified or identifiable natural person.",
      },
      {
        heading: 'Who It Applies To',
        body: 'Any organization processing personal data of individuals in the EU, regardless of where the organization is based (Article 3) — covering both establishment in the EU and the offering of goods/services to, or monitoring of, people in the EU.',
      },
      {
        heading: 'Core Principles (Article 5)',
        list: [
          'Lawfulness, fairness, and transparency',
          'Purpose limitation',
          'Data minimization',
          'Accuracy',
          'Storage limitation',
          'Integrity and confidentiality',
          'Accountability — the controller must be able to demonstrate compliance',
        ],
      },
      {
        heading: 'Legal Bases for Processing (Article 6)',
        body: 'At least one of the following must apply to any processing activity: consent, contract necessity, legal obligation, vital interests, a public-interest task, or legitimate interests.',
      },
      {
        heading: 'Special Category Data (Article 9)',
        body: 'Health, biometric, genetic, racial/ethnic origin, political opinion, religious belief, trade-union membership, and sex-life/orientation data receive stricter protection and generally require explicit consent or another narrow exception.',
      },
      {
        heading: 'Data Subject Rights',
        list: [
          'Access',
          'Rectification',
          'Erasure ("right to be forgotten")',
          'Restriction of processing',
          'Data portability',
          'Objection to processing',
        ],
      },
      {
        heading: 'Article 22 — Automated Decision-Making',
        body: 'Individuals have the right not to be subject to a decision based solely on automated processing, including profiling, that produces legal or similarly significant effects. This applies directly to any AI system making decisions about people — credit, hiring, insurance pricing — and generally requires a human in the loop, a specific exception, or explicit consent.',
      },
      {
        heading: 'Data Protection Impact Assessment (DPIA)',
        body: 'Required (Article 35) before processing likely to result in high risk to individuals\' rights — commonly triggered by large-scale profiling, systematic monitoring, or processing special-category data, which describes many ML deployments.',
      },
      {
        heading: 'Anonymization vs. Pseudonymization',
        body: 'GDPR does not apply to data that is truly and irreversibly anonymized. Pseudonymized data — where re-identification remains possible, e.g. via a key — still counts as personal data and stays in scope.',
      },
      {
        heading: 'Penalties',
        body: 'Up to €20M or 4% of global annual turnover, whichever is higher.',
      },
      {
        heading: 'Why It Matters for ML Practitioners',
        body: 'Training data almost always contains personal data — even datasets marketed as "anonymized" frequently remain re-identifiable and stay in scope. Data minimization sits in tension with the instinct to collect as much data as possible, so tying data collection to a stated purpose matters from the design stage. Any model whose output drives a decision about a person should be checked against Article 22 early, since adding human oversight after deployment is far more disruptive than designing it in from the start.',
      },
    ],
  },
  {
    slug: 'data-act',
    name: 'Data Act',
    officialRef: 'Regulation (EU) 2023/2854',
    shortDescription:
      'Applies when training data comes from IoT or connected devices — governs data sharing and access rights.',
    sections: [
      {
        heading: 'What It Is',
        body: 'The Data Act entered into force on 11 January 2024 and applies from 12 September 2025. It sets rules on fair access to and use of data generated by connected products (IoT devices) and related services.',
      },
      {
        heading: 'Who It Applies To',
        body: 'Manufacturers of connected products and providers of related services sold or offered in the EU, users of those products and services, and data holders and recipients involved in sharing that data — plus providers of data-processing services (e.g., cloud/edge) operating in the EU.',
      },
      {
        heading: 'Core Rights and Obligations',
        list: [
          "Users of a connected product (a smart appliance, connected vehicle, or industrial sensor) gain a right to access the data their use of the product generates, and to direct that the data holder share it with a third party of the user's choice.",
          'Data holders must make that data available on fair, reasonable, and non-discriminatory (FRAND) terms, and generally cannot use it to develop a product competing with the one that generated it.',
          'Business-to-government (B2G) data-sharing obligations apply in exceptional circumstances, such as public emergencies.',
          'Rules facilitate switching between cloud and data-processing service providers, including phasing out switching charges, to reduce vendor lock-in.',
          'Safeguards apply against unlawful third-country government access to non-personal data held in the EU.',
          'Data holders can withhold or condition access where disclosure would cause serious economic harm through trade-secret exposure, subject to safeguards.',
        ],
      },
      {
        heading: 'Why It Matters for ML Practitioners',
        body: 'If training data is sourced from IoT or connected devices — smart-home data, connected-vehicle telemetry, industrial sensor feeds — the Data Act determines who has the right to access and redirect that data, which shapes what can legally be sourced, licensed, or compelled to be shared. Because a product manufacturer generally cannot exploit user-generated data to build a competing product, data-sourcing agreements for training pipelines built on third-party devices need to be checked against these limits.',
      },
    ],
  },
  {
    slug: 'cyber-resilience-act',
    name: 'Cyber Resilience Act (CRA)',
    officialRef: 'Regulation (EU) 2024/2847',
    shortDescription:
      'Applies once a model or AI system ships as a commercial digital product — sets cybersecurity requirements.',
    sections: [
      {
        heading: 'What It Is',
        body: 'The Cyber Resilience Act, in force since 10 December 2024, is the EU\'s first horizontal cybersecurity law for "products with digital elements" — hardware and software products, including remote data-processing solutions, placed on the EU market.',
      },
      {
        heading: 'Who It Applies To',
        body: 'Manufacturers, importers, and distributors of products with digital elements sold in the EU — a broad category covering most connected hardware and standalone software, including AI-powered software marketed as a commercial product. Custom, one-off software built for a single customer is generally out of scope.',
      },
      {
        heading: 'Core Requirements',
        list: [
          'Security by design and by default across the development lifecycle',
          'No known exploitable vulnerabilities at the time of release',
          'A Software Bill of Materials (SBOM) and vulnerability-handling processes, including timely security updates for a defined support period',
          'Reporting of actively exploited vulnerabilities and severe incidents to ENISA within 24 hours of awareness, with fuller reports to follow',
          'Products are classified by risk (default, important Class I/II, critical), with stricter conformity-assessment procedures for higher classes',
        ],
      },
      {
        heading: 'Timeline',
        list: [
          'Entered into force 10 December 2024',
          'Vulnerability and incident-reporting obligations apply from 11 September 2026',
          'Full application, including conformity assessment and market surveillance, from 11 December 2027',
        ],
      },
      {
        heading: 'Penalties',
        body: 'Up to €15M or 2.5% of global annual turnover for non-compliance with essential requirements; up to €10M or 2% for other obligations.',
      },
      {
        heading: 'Why It Matters for ML Practitioners',
        body: "Once a model or AI-powered application is packaged and sold as a product rather than run purely as an internal tool, it likely falls under the CRA's cybersecurity obligations — vulnerability disclosure, patching commitments, and incident reporting need to be built into the release process, not added after the fact. The CRA's cybersecurity requirements also overlap with the EU AI Act's own cybersecurity obligations for high-risk AI systems (Article 15), so a system that must comply with both benefits from aligning the two efforts rather than treating them separately.",
      },
    ],
  },
]
