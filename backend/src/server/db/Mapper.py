import os
from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

import mysql.connector as connector


class Mapper(AbstractContextManager, ABC):
    def __init__(self):
        self._cnx = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):

            self._cnx = connector.connect(user='root', password='SoPra_2023') #todo ergänzen aus der vorlesung

        else:
            self._cnx = connector.connect(user='root', password='sopra', host='127.0.0.1:3306',
                                          database='SoPraDatabase')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_id(self, id):
        pass

    @abstractmethod
    def find_by_name(self, name):
        pass

    @abstractmethod
    def find_by_email(self, email):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass
