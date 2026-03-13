import sys
import os

# Add the backend directory to Python path so it can find the app module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.main import app

# Vercel needs the app object to be named 'app'
