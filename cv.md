**Youngbin Kim** youngbin.kim@columbia.edu \| github.com/youngbinkim0

**Professional Summary**

Senior Data Scientist with a Ph.D. in Biomedical Engineering (Columbia)
and 9 peer-reviewed publications. Founding LLM hire at a major academic
medical center, where I architected HIPAA-compliant inference
infrastructure and deployed production NLP/LLM pipelines processing
380M+ clinical notes. Creator of BeatProfiler, an open-source ML
platform with 521 downloads and adoption at Harvard, MIT, Cornell, and
Columbia. Expert in clinical NLP, multimodal deep learning, tissue
engineering, and translating complex biological signals into actionable
insights.

**Experience**

**New York Presbyterian** New York, NY

*Senior Data Scientist: Clinical NLP/LLM (First Dedicated LLM Hire)*
*Oct 2024 - Present*

-   Architected end-to-end LLM infrastructure from scratch: stood up
    sandboxed vLLM deployment on Azure Databricks and Snowflake,
    enabling secure inference over 380M+ patient notes for an
    institution with zero prior LLM capability.

-   Deployed clinical NLP and LLM pipelines using MedSpaCy, SciSpaCy,
    and LangGraph-based agentic workflows to extract phenotypic and
    outcomes data, automating previously 100% manual clinical
    abstraction processes.

-   Implemented HIPAA-compliant LLM endpoints for secure, large-scale
    clinical text summarization and classification.

**TNM Staging & Biomarker Identification**

-   Developed LLM-based extraction system for breast cancer TNM staging
    and biomarker identification from 240,000 documents across 2,000
    patients.

-   Achieved significant improvements over rule-based NLP (MedSpaCy): T
    staging F1 0.833 vs 0.715, N staging F1 0.862 vs 0.856, M staging F1
    0.951 vs 0.913, HER2 F1 0.942 vs 0.774, ER F1 0.974 vs 0.931, PR F1
    0.952 vs 0.840.

-   Developed Oncotype score prediction model achieving R²=0.857,
    MAE=0.31.

-   Pioneered automated prompt optimization using DSPy with GEPA on
    partially labeled data.

**Sensitive Exam Classification**

-   Built compliance-focused classification system using open-source
    LLMs in sandboxed cloud environment.

-   Improved accuracy from 85% (expert-curated zero-shot prompting) to
    90% using DSPy GEPA automated optimization without additional manual
    labeling.

**Post-Operative Adverse Event Detection (MI/Stroke from CEA/CAS)**

-   Developed LLM-based detection system achieving 95% sensitivity for
    MI and 83% for stroke with zero false negatives in preliminary
    validation (n=25).

-   System captures non-coded events missed by structured data queries
    alone, deployed for registry reporting.

**Sepsis Abstraction**

-   Built automated sepsis abstraction pipeline for CMS reporting
    requirements.

-   Architecting real-time infrastructure to enable point-of-care
    clinical decision support, ensuring appropriate interventions within
    critical time windows.

**Gordana Vunjak-Novakovic Laboratory of Stem Cells and Tissue
Engineering** New York, NY

*Ph.D. Candidate, Columbia University* *Aug 2019 - Oct 2024*

-   Developed CNN- and ViT-based deep learning models for cardiac drug
    screening and disease modeling using high-throughput iPSC imaging
    and phenotypic data.

-   Built scalable ML pipelines processing 1000+ hours of high-speed
    video (100fps) across thousands of recordings, performing inference
    over terabytes of microscopy data.

-   Led team of 4 (developers, biologists, engineers) to develop
    BeatProfiler, an ML-driven cardiac functional analysis platform.
    Achieved 521 downloads with adoption at Harvard, MIT, Cornell, and
    Columbia research labs.

-   Applied deep learning-driven high-throughput phenotypic drug screens
    to identify therapeutic candidates for diseased cardiac fibroblasts
    using iPSC model of genetic cardiac disease (BAG3 deficiency)
    generated through CRISPR knockout. Compounds currently under
    investigation.

-   Modeled effects of cosmic radiation on human iPSC organ-on-chip
    models of bone marrow, heart, and liver for NASA-funded space health
    research.

-   Performed single-cell transcriptomic analyses in Python and R
    (Scanpy, Seurat) to characterize molecular mechanisms underlying
    disease phenotypes.

-   Co-authored 9 peer-reviewed publications with 2 additional
    manuscripts in preparation through technical collaborations.

**InVivo Analytics** New York, NY

*Machine Learning Engineering Consultant* *Jan 2024 - May 2024*

-   Developed DeepBLI, a deep learning image restoration and denoising
    model for small-animal bioluminescence imaging using U-Nets and a
    custom Poisson-Gaussian noise synthesis pipeline.

-   Achieved 30x signal enhancement, accelerating preclinical imaging
    workflows.

-   Delivered prototype MVP from concept to deployment, demonstrating
    end-to-end ML product development.

**Genentech/Roche** South San Francisco, CA

*Machine Learning / Early Clinical Development Intern* *Jun 2022 - Sep
2022*

-   Developed transformer and LSTM-based deep learning models for
    biomarker discovery in Alzheimer\'s disease using post-hoc clinical
    trial data.

-   Built multimodal models integrating patient imaging, speech signals,
    and clinical scores, identifying novel speech-based biomarkers with
    stronger predictive power than traditional clinical assessments
    alone.

**Selected Projects**

**BeatProfiler: ML-Driven Cardiac Functional Analysis Platform**

-   Open-source platform (beatprofiler.github.io) combining CNNs,
    optical flow, and digital signal processing for automated cardiac
    tissue analysis.

-   Extracts contractility waveforms, beat rate, and calcium transients
    from raw video, reducing analysis time by 95% while eliminating
    manual bias.

-   521 downloads; adopted by research labs at Harvard, MIT, Cornell,
    Columbia, and other institutions.

-   User-friendly GUI democratizing high-throughput functional analysis
    for non-programming scientists.

**DeepBLI: Bioluminescence Image Restoration and Denoising**

-   U-Net model with custom Poisson-Gaussian noise synthesis achieving
    30x signal enhancement for low-light bioluminescence imaging.

-   Engineered generative algorithm to synthesize high-fidelity
    pseudo-experimental datasets for model training and validation.

**Education**

**Columbia University** New York, NY

*Ph.D. in Biomedical Engineering* *Aug 2019 - May 2024*

-   Thesis: Deep learning pipelines for high-throughput phenotypic
    screening and cardiac disease modeling

-   NSF Graduate Research Fellowship Program (GRFP) Honorable Mention

-   Relevant Courses: Deep Learning in Biological Signals, Statistical
    Machine Learning for Genomics, Computational Modeling of
    Physiological Systems, Mathematics for Data Science, Biostatistics

-   Teaching Assistant: Biomedical Microelectromechanical Systems
    (BioMEMS), Stem Cells & Genetic Engineering

**University of California, Berkeley** Berkeley, CA

*B.S. Bioengineering, Minor: Electrical Engineering and Computer
Science* *Aug 2015 - May 2019*

-   Relevant Courses: Data Structures & Algorithms, Artificial
    Intelligence, Signals and Systems, Designing Information Devices and
    Systems, Structure and Interpretation of Programming, Medical
    Imaging Signals and Systems, Linear Algebra

-   Kraft Award for academic excellence

**Technical Skills**

Programming: Python, R, SQL, JavaScript, MATLAB\
ML/DL Frameworks: PyTorch, TensorFlow, fastai, scikit-learn, OpenCV\
LLM & NLP: LangGraph, LangChain, DSPy, vLLM, MedSpaCy, SciSpaCy, Hugging
Face Transformers, prompt engineering, agentic workflows\
Cloud & Infrastructure: Azure Databricks, Snowflake, PySpark, Delta
Lake, HIPAA-compliant model serving, MLOps\
Deep Learning Architectures: CNNs, ViTs, U-Nets, Transformers, LSTMs,
BERT\
Biomedical: Clinical NLP, cardiac signal processing, single-cell
transcriptomics (Scanpy, Seurat), tissue engineering, iPSC culture,
organ-on-chip

**Honors and Activities**

-   NSF Graduate Research Fellowship Program (GRFP) Honorable Mention

-   IEEE EMBS, Vice President of Graduate Activities Elect (Jan 2023 -
    May 2024), Columbia University

-   Bioengineering Honor Society, Member (Aug 2016 - May 2019), UC
    Berkeley

-   Tau Beta Pi, Member (Aug 2016 - May 2019), UC Berkeley

-   Kraft Award for academic excellence, UC Berkeley

**Publications**

1\. Kim, Y., et al. BeatProfiler: Multimodal In Vitro Analysis of
Cardiac Function Enables Machine Learning Classification of Diseases and
Drugs. IEEE Open J. Eng. Med. Biol. 5, 238-249 (2024).

2\. Kim, Y.\*, Morsink, M.\*, Luo, L.\*, et al. Deep phenotypic drug
screen identifies compound to restore function in BAG3 deficient cardiac
fibroblasts. Manuscript in Preparation. (\*co-first authors)

3\. Lock, R.I., Graney P., Tavakol D.N., Nash T.R., Kim, Y., et al.
Macrophages enhance contractile force in iPSC-derived human engineered
cardiac tissue. Cell Reports, 43(6), 114302 (2024).

4\. Fleischer, S., Nash, T.R., Tamargo, M.A., Lock, R.I., Venturini, G.,
Morsink, M., Lamberti, M.J., Graney, P.L., Liberman, M., Kim, Y., et al.
An engineered human cardiac tissue model reveals contributions of
systemic lupus erythematosus autoantibodies to myocardial injury.
Accepted at Nature Cardiovascular Research.

5\. Wang, B.Z., Morsink, M., Kim, S., Luo, L., Zhang, X., Soni, R.,
Lock, R.I., Rao, J., Zhuang, R., Nash, T.R., Kim, Y., et al.
iPSC-derived cardiac fibroblasts reveal cell-type specific role of BAG3
in TGFBR2 signaling and engineered human cardiac tissue function. In
review at Journal of Clinical Investigation.

6\. Tavakol, D.N., Nash, T.R., Kim, Y., et al. Modeling the effects of
cosmic radiation in an integrated human organ-on-chip platform. Adv.
Sci. 2401415 (2024).

7\. Tavakol, D.N., Nash, T.R., Kim, Y., et al. Modeling and countering
the effects of cosmic radiation using bioengineered human tissues.
Biomaterials, 301, 122267 (2023).

8\. Wang, B.Z., Nash, T.R., Zhang, X., Rao, J., Abriola, L., Kim, Y., et
al. Engineered cardiac tissue model of restrictive cardiomyopathy for
drug discovery. Cell Rep. Med. 4, (2023).

9\. Tamargo, M.A., Nash, T.R., Fleischer, S., Kim, Y., et al.
Millipillar: A platform for the generation and real-time assessment of
human engineered cardiac tissues. ACS Biomaterials Science &
Engineering, 7(11), 5215-5229 (2021).

10\. Teles, D., Kim, Y., et al. Machine learning techniques to classify
healthy and diseased cardiomyocytes by contractility profile. ACS
Biomaterials Science & Engineering, 7(7), 3043-3052 (2021).

11\. Kim, J., Li, B., Scheideler, O.J., Kim, Y., & Sohn, L.L.
Visco-node-pore sensing: A microfluidic rheology platform to
characterize viscoelastic properties of epithelial cells. iScience, 13,
214-228 (2019).