from server.bo import BusinessObject as bo
from server.bo.Information import Information


class Property(bo.BusinessObject):

    def __init__(self, name, value):
        super().__init__()
        self.__name = name
        self.__content = Information(value)

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

