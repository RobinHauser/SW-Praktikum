from backend.src.server.bo.BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self):
        super().__init__("Information", [5001, 6000])
        self.__property_id = 0
        self.__value = ""

    def set_property(self, property_id):
        self.__property_id = property_id

    def get_property(self):
        return self.__property_id

    def set_value(self, value):
        self.__value = value

    def get_value(self):
        return self.__value
