import json
from pytrends.request import TrendReq

try:
    pytrends = TrendReq()
    trending_df = pytrends.trending_searches(pn='united_states')
    trending_terms = trending_df[0].head(20).tolist()
except Exception as e:
    trending_terms = [
        'denim jacket', 'cargo pants', 'oversized blazer', 'knitted dress',
        'cowboy boots', 'maxi skirt', 'retro sunglasses', 'graphic tee',
        'athleisure set', 'vegan leather bag'
    ]

print(json.dumps(trending_terms, ensure_ascii=False, indent=2))

prompt = (
    "Crea diseños de ropa inspirados en estas tendencias de búsqueda: "
    + ", ".join(trending_terms)
)

print("\nSuggested Prompt for ChatGPT:\n" + prompt)
