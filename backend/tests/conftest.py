import pytest
from pyramid import testing
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.models.meta import Base
import transaction

@pytest.fixture(scope='session')
def db_engine():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    return engine

@pytest.fixture
def dbsession(db_engine):
    connection = db_engine.connect()
    transaction_manager = transaction.TransactionManager(explicit=True)
    session_factory = sessionmaker(bind=connection)
    dbsession = session_factory()
    yield dbsession
    dbsession.close()
    connection.close()

@pytest.fixture
def dummy_request(dbsession):
    request = testing.DummyRequest()
    request.dbsession = dbsession
    return request
