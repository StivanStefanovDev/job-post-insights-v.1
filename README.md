# 📊 Job Postings Analytics

### This project provides insights into job postings by extracting key data such as:

- required skills
- job levels,
- job types
- companies
- popular search locations

> This is done with the intent to help devs quickly get an insight into the software development market.

<br>


<br>
<hr>

## 🛠 Data Extraction

The extraction logic is inside `model/model.py`, where the script processes job postings to generate insights:

1️⃣ Loading the Dataset

Simply used a ready dataset and loaded it up

<hr>

2️⃣ Extracting and Analyzing Job Skills
Cleans and normalizes skill names (removes spaces, lowercase conversion).
Handles missing values.
Splits comma-separated skills (e.g., `"Python, Java"` → `["python", "java"]`).
Counts occurrences using `Counter`.

```python
from collections import Counter
import re

def analyze_skills():
    if "job_skills" in df.columns:
        skills_series = df["job_skills"].dropna()
        all_skills = []
        for skill_str in skills_series:
            skills = re.split(r",\s*", skill_str)  # Split by commas
            all_skills.extend(skill.strip().lower() for skill in skills if skill.strip())
        skill_counts = Counter(all_skills)
        return [{"skill": skill, "count": count} for skill, count in skill_counts.most_common(20)]
    return []

```

3️⃣ Extracting Job Levels

Normalizes text (removes spaces, converts to lowercase).
Counts occurrences using Counter.

```python
def analyze_job_levels():
    if "job level" in df.columns:
        job_levels = df["job level"].dropna().str.strip().str.lower()
        level_counts = Counter(job_levels)
        return [{"level": level, "count": count} for level, count in level_counts.most_common()]
    return []
```

4️⃣ Extracting Job Types (Onsite, Remote, Hybrid)

Extracts job types by counting unique values in the "job_type" column.

```python
def analyze_job_types():
    if "job_type" in df.columns:
        job_types = df["job_type"].dropna().str.strip().str.lower()
        type_counts = Counter(job_types)
        return [{"job_type": job_type, "count": count} for job_type, count in type_counts.most_common()]
    return []
```

### All extracted data is combined into a single function that returns structured insights

```python
def get_analytics():
    return {
        "top_skills": analyze_skills(),
        "job_levels": analyze_job_levels(),
        "job_types": analyze_job_types(),
        "top_companies": analyze_companies(),
        "top_search_cities": analyze_search_cities(),
        "top_summary_words": analyze_job_summary(),
    }
```

## 📊 API Integration

After all the data is proccessed we simply return it once `/api/analytics` gets called.

API Response:

```json
{
  "top_skills": [{ "skill": "python", "count": 3554 }],
  "job_levels": [{ "level": "mid senior", "count": 8101 }],
  "job_types": [{ "job_type": "onsite", "count": 4316 }],
  "top_companies": [{ "company": "jobs for humanity", "count": 681 }],
  "top_search_cities": [{ "city": "novato", "count": 92 }],
  "top_summary_words": [{ "word": "experience", "count": 56196 }]
}
```

## 📱 Client-Side Implementation

The client-side implementation is in `client/src/app/page.tsx`.

It is a simple implementation of a dashboard that displays the insights in a nice way using tailwind css and chart.js, as well as typescript.

### Key Features:

- 📊 Interactive Charts: The dashboard includes interactive charts that visualize the job market trends.
- 📱 Responsive Design: The dashboard is fully responsive, ensuring accessibility from any device.
- 🔍 Detailed Insights: The dashboard provides detailed insights into the job market, including top skills, job levels, job types, companies, and popular search locations.