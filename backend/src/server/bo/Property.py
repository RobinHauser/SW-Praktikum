from src.server.bo.BusinessObject import BusinessObject

class Property(BusinessObject):
    def __init__(self):
        super().__init__("Property", [6001, 7000])
        self.value = ""
        self.description = ""

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value

    def set_description(self, description):
        self.description = description

    def get_description(self):
        return self.description