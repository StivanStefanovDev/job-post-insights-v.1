import pandas as pd
import re
import string
import os
from collections import Counter

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, ".", "postings.csv")

if not os.path.exists(CSV_FILE):
    raise FileNotFoundError(f"CSV file not found at: {CSV_FILE}")

df = pd.read_csv(CSV_FILE)


def analyze_skills():
    if "job_skills" in df.columns:
        skills_series = df["job_skills"].dropna()
        all_skills = []
        for skill_str in skills_series:
            skills = re.split(r",\s*", skill_str)
            all_skills.extend(
                [skill.strip().lower() for skill in skills if skill.strip()]
            )
        skill_counts = Counter(all_skills)
        top_skills = skill_counts.most_common(20)
        return [{"skill": skill, "count": count} for skill, count in top_skills]
    return []


def analyze_job_levels():
    if "job level" in df.columns:
        job_levels = df["job level"].dropna().str.strip().str.lower()
        level_counts = Counter(job_levels)
        top_levels = level_counts.most_common()
        return [{"level": level, "count": count} for level, count in top_levels]
    return []


def analyze_job_types():
    if "job_type" in df.columns:
        job_types = df["job_type"].dropna().str.strip().str.lower()
        type_counts = Counter(job_types)
        top_types = type_counts.most_common()
        return [{"job_type": job_type, "count": count} for job_type, count in top_types]
    return []


def analyze_companies():
    if "company" in df.columns:
        companies = df["company"].dropna().str.strip().str.lower()
        company_counts = Counter(companies)
        top_companies = company_counts.most_common(10)
        return [
            {"company": company, "count": count} for company, count in top_companies
        ]
    return []


def analyze_search_cities():
    if "search_city" in df.columns:
        cities = df["search_city"].dropna().str.strip().str.lower()
        city_counts = Counter(cities)
        top_cities = city_counts.most_common(10)
        return [{"city": city, "count": count} for city, count in top_cities]
    return []


def analyze_job_summary():
    if "job_summary" in df.columns:
        summaries = df["job_summary"].dropna().str.lower()
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
            summary_clean = summary.translate(str.maketrans("", "", string.punctuation))
            words = summary_clean.split()
            words = [word for word in words if word not in stop_words and len(word) > 2]
            word_counter.update(words)
        top_words = word_counter.most_common(20)
        return [{"word": word, "count": count} for word, count in top_words]
    return []


def get_analytics():
    return {
        "top_skills": analyze_skills(),
        "job_levels": analyze_job_levels(),
        "job_types": analyze_job_types(),
        "top_companies": analyze_companies(),
        "top_search_cities": analyze_search_cities(),
        "top_summary_words": analyze_job_summary(),
    }
