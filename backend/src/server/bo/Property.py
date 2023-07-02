from src.server.bo.BusinessObject import BusinessObject
from abc import ABC

class Property(BusinessObject, ABC):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__is_selection = False
        self.__description = ""


    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return self.__name

    def set_is_selection(self, is_dropdown):
        self.__is_selection = is_dropdown

    def get_is_selection(self):
        return self.__is_selection

    def set_description(self, description):
        self.__description = description

    def get_description(self):
        return self.__description

