from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

import mysql.connector


class Mapper(AbstractContextManager, ABC):
    def __init__(self):
        self._cnx = mysql.connector.connect(user='root', password='SoPra_2023', host='127.0.0.1', database='sopra_robn')

    def __enter__(self):
        self._cnx = mysql.connector.connect(user='root', password='SoPra_2023', host='127.0.0.1', database='sopra_robn')

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
