import requests
from bs4 import BeautifulSoup

class ScraperService:
    @staticmethod
    def scrape_text_from_url(url: str) -> str:
        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, "html.parser")
            
            # Extract text from paragraphs
            paragraphs = soup.find_all('p')
            text = ' '.join([p.get_text() for p in paragraphs])
            return text.strip()
        except Exception as e:
            raise ValueError(f"Failed to scrape URL: {str(e)}")
