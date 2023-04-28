from server.bo import BusinessObject as bo


class Property(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__type = ""

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_type(self):
        return self.__type

    def set_type(self, type):
        self.__type = type
