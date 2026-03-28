import pandas as pd
import csv
from memory_profiler import profile


@profile
def get_top_video(path):
    interactions = pd.read_csv(path)
    avg_ratio = interactions.mean(axis=0, skipna=True)
    return avg_ratio.idxmax()


print("top video: ", get_top_video('interactions_100.csv'))

@profile
def best_video(path):
    video_stats = {}  # video_id -> [total_sum, total_count]

    with open(path, 'r') as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            video_id = row[0]

            for val in row[1:]:
                if val:
                    v = float(val)
                    if video_id not in video_stats:
                        video_stats[video_id] = [0.0, 0]
                    video_stats[video_id][0] += v
                    video_stats[video_id][1] += 1

    best_video_id = None
    best_avg = -1

    for vid, (total, cnt) in video_stats.items():
        if cnt == 0:
            continue
        avg = total / cnt
        if avg > best_avg:
            best_avg = avg
            best_video_id = vid

    return best_video_id

# Profiling memory consumption across multiple runs
paths = [
    'interactions_100.csv',
    #    'interactions_1000.csv',
    #    'interactions_10_000.csv'
]

for p in paths:
    print("Top video: ", get_top_video(p))
    print("Best video:", best_video(p))
