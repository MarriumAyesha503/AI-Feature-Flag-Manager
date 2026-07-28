"""add project and feature flag tables

Revision ID: 98d2f7e86e21
Revises: e940ed81186c
Create Date: 2026-07-23 13:19:01.817087

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '98d2f7e86e21'
down_revision: Union[str, Sequence[str], None] = 'e940ed81186c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
