from logging.config import fileConfig

from sqlalchemy.ext.asyncio import async_engine_from_config
from sqlalchemy import pool

from alembic import context



# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
from dotenv import load_dotenv
import os

load_dotenv()

from app.database import Base
from app.models import user

database_url = os.getenv("DATABASE_URL")

config.set_main_option("sqlalchemy.url",database_url)

target_metadata = Base.metadata

async def run_async_migrations():
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(run_migrations)

    await connectable.dispose()


def run_migrations():
    context.configure(connection=connection,target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()
