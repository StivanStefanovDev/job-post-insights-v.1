import pandas as pd
import re
import string
from collections import Counter
import matplotlib.pyplot as plt


df = pd.read_csv("postings.csv")

### 1. Analyze Job Skills ###
# Drop missing skills and split comma-separated skills
skills_series = df["job_skills"].dropna()
all_skills = []
for skill_str in skills_series:
    skills = re.split(r",\s*", skill_str)
    all_skills.extend([skill.strip().lower() for skill in skills if skill.strip()])

skill_counts = Counter(all_skills)
top_skills = skill_counts.most_common(20)
print("Top 20 Most Wanted Skills:")
for skill, count in top_skills:
    print(f"{skill}: {count}")

# Visualize top skills
skills, counts = zip(*top_skills)
plt.figure(figsize=(10, 6))
plt.bar(skills, counts, color="skyblue")
plt.xticks(rotation=45, ha="right")
plt.title("Top 20 Most Wanted Skills")
plt.xlabel("Skill")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

### 2. Analyze Job Levels ###
if "job level" in df.columns:
    job_levels = df["job level"].dropna().str.strip().str.lower()
    level_counts = Counter(job_levels)
    top_levels = level_counts.most_common()
    print("\nJob Levels Distribution:")
    for level, count in top_levels:
        print(f"{level}: {count}")

    # Visualize job levels
    levels, level_values = zip(*top_levels)
    plt.figure(figsize=(8, 6))
    plt.bar(levels, level_values, color="coral")
    plt.xticks(rotation=45, ha="right")
    plt.title("Job Levels Distribution")
    plt.xlabel("Job Level")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()

### 3. Analyze Job Types ###
if "job_type" in df.columns:
    job_types = df["job_type"].dropna().str.strip().str.lower()
    type_counts = Counter(job_types)
    top_types = type_counts.most_common()
    print("\nJob Types Distribution:")
    for job_type, count in top_types:
        print(f"{job_type}: {count}")

    # Visualize job types
    types, type_values = zip(*top_types)
    plt.figure(figsize=(8, 6))
    plt.bar(types, type_values, color="lightgreen")
    plt.xticks(rotation=45, ha="right")
    plt.title("Job Types Distribution")
    plt.xlabel("Job Type")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()

### 4. Analyze Companies ###
if "company" in df.columns:
    companies = df["company"].dropna().str.strip().str.lower()
    company_counts = Counter(companies)
    top_companies = company_counts.most_common(10)
    print("\nTop 10 Companies with Most Job Postings:")
    for company, count in top_companies:
        print(f"{company}: {count}")

    # Visualize top companies
    comp_names, comp_values = zip(*top_companies)
    plt.figure(figsize=(8, 6))
    plt.bar(comp_names, comp_values, color="violet")
    plt.xticks(rotation=45, ha="right")
    plt.title("Top 10 Companies")
    plt.xlabel("Company")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()

### 5. Analyze Search Cities ###
if "search_city" in df.columns:
    cities = df["search_city"].dropna().str.strip().str.lower()
    city_counts = Counter(cities)
    top_cities = city_counts.most_common(10)
    print("\nTop 10 Search Cities:")
    for city, count in top_cities:
        print(f"{city}: {count}")

    # Visualize search cities
    city_names, city_values = zip(*top_cities)
    plt.figure(figsize=(8, 6))
    plt.bar(city_names, city_values, color="gold")
    plt.xticks(rotation=45, ha="right")
    plt.title("Top 10 Search Cities")
    plt.xlabel("City")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()

### 6. Analyze Job Summary Text ###
if "job_summary" in df.columns:
    summaries = df["job_summary"].dropna().str.lower()
    # Define a set of stop words to ignore
    stop_words = set(
        [
            "the",
            "and",
            "to",
            "of",
            "in",
            "for",
            "a",
            "with",
            "on",
            "is",
            "at",
            "by",
            "an",
            "as",
            "or",
            "from",
            "that",
            "are",
            "our",
            "this",
            "be",
            "you",
            "will",
            "job",
            "role",
            "youll",
            "your",
            "we",
            "include",
            "apply",
        ]
    )

    word_counter = Counter()
    for summary in summaries:
        # Remove punctuation
        summary_clean = summary.translate(str.maketrans("", "", string.punctuation))
        words = summary_clean.split()
        # Filter out stop words and very short words
        words = [word for word in words if word not in stop_words and len(word) > 2]
        word_counter.update(words)

    top_words = word_counter.most_common(20)
    print("\nTop 20 Most Common Words in Job Summaries:")
    for word, count in top_words:
        print(f"{word}: {count}")

    # Visualize common summary words
    word_list, word_values = zip(*top_words)
    plt.figure(figsize=(10, 6))
    plt.bar(word_list, word_values, color="lightblue")
    plt.xticks(rotation=45, ha="right")
    plt.title("Top 20 Words in Job Summaries")
    plt.xlabel("Word")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.show()
