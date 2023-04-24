from abc import ABC


class BusinessObject(ABC):
    def __init__(self):
        self.__owner_id = 0

    def get_id(self):
        return self.__owner_id

    def set_id(self, value):
        self.__owner_id = value
