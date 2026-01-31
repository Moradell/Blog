from datetime import datetime, timezone

import markdown
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.auth import verify_api_key
from app.database import get_session
from app.models import Post, PostCreate, PostList, PostRead, PostUpdate

router = APIRouter(prefix="/api/posts", tags=["posts"])

md = markdown.Markdown(extensions=["fenced_code", "codehilite", "tables", "toc"])


@router.get("", response_model=list[PostList])
def list_posts(session: Session = Depends(get_session)):
    posts = session.exec(
        select(Post).where(Post.published == True).order_by(Post.created_at.desc())  # noqa: E712
    ).all()
    return posts


@router.get("/all", response_model=list[PostList])
def list_all_posts(
    _: str = Depends(verify_api_key),
    session: Session = Depends(get_session),
):
    posts = session.exec(select(Post).order_by(Post.created_at.desc())).all()
    return posts


@router.get("/{slug}")
def get_post(slug: str, session: Session = Depends(get_session)):
    post = session.exec(select(Post).where(Post.slug == slug)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    md.reset()
    html_content = md.convert(post.content)
    data = PostRead.model_validate(post).model_dump()
    data["html_content"] = html_content
    return data


@router.post("", response_model=PostRead, status_code=201)
def create_post(
    post_in: PostCreate,
    _: str = Depends(verify_api_key),
    session: Session = Depends(get_session),
):
    existing = session.exec(select(Post).where(Post.slug == post_in.slug)).first()
    if existing:
        raise HTTPException(status_code=409, detail="Slug already exists")
    post = Post.model_validate(post_in)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@router.put("/{slug}", response_model=PostRead)
def update_post(
    slug: str,
    post_in: PostUpdate,
    _: str = Depends(verify_api_key),
    session: Session = Depends(get_session),
):
    post = session.exec(select(Post).where(Post.slug == slug)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    update_data = post_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(post, key, value)
    post.updated_at = datetime.now(timezone.utc)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


@router.delete("/{slug}", status_code=204)
def delete_post(
    slug: str,
    _: str = Depends(verify_api_key),
    session: Session = Depends(get_session),
):
    post = session.exec(select(Post).where(Post.slug == slug)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    session.delete(post)
    session.commit()
