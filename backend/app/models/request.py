from pydantic import BaseModel
from typing import Optional

class DetectRequest(BaseModel):
    text: Optional[str] = None
    url: Optional[str] = None
