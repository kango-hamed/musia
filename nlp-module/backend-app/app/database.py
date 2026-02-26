from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from .config import settings
import logging

logger = logging.getLogger(__name__)

# Fix common schema issue with some providers (Neon/Render often use postgres://)
db_url = settings.database_url
if db_url:
    # 1. Standardize scheme to postgresql+asyncpg://
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

    # 2. Remove 'schema', 'sslmode', 'channel_binding' query params if present
    if "schema=" in db_url or "sslmode=" in db_url or "channel_binding=" in db_url:
        from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
        u = urlparse(db_url)
        query = parse_qs(u.query)
        for param in ['schema', 'sslmode', 'channel_binding']:
            if param in query:
                del query[param]
        
        u = u._replace(query=urlencode(query, doseq=True))
        db_url = urlunparse(u)

engine = None
SessionLocal = None

if db_url:
    try:
        engine = create_async_engine(db_url, echo=settings.debug)
        SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
        logger.info("Database configured.")
    except Exception as e:
        logger.error(f"Error configuring database: {e}")
else:
    logger.warning("DATABASE_URL not set. Database features will be disabled.")

class Base(DeclarativeBase):
    pass

async def get_db():
    if SessionLocal is None:
        return
    async with SessionLocal() as session:
        yield session
