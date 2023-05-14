from BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self):
        super().__init__("Information", [5001, 6000])
        self.property_id = 0
        self.value = ""

    def set_property(self, property_id):
        self.property_id = property_id

    def get_property(self):
        return self.property_id

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value
