from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Field, SQLModel


class PostBase(SQLModel):
    title: str
    slug: str = Field(unique=True, index=True)
    content: str
    excerpt: str
    published: bool = False


class Post(PostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PostCreate(PostBase):
    pass


class PostUpdate(SQLModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    published: Optional[bool] = None


class PostRead(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime


class PostList(SQLModel):
    id: int
    title: str
    slug: str
    excerpt: str
    published: bool
    created_at: datetime
