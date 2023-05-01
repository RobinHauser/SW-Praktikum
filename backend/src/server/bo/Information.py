from BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self, value):
        super().__init__("Information", [5001, 6000])
        self.value = value

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value

    def __str__(self):
        return "Information: {}, {}".format(self._id, self.value)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Information()
        obj.set_id(dictionary["id"])
        obj.set_value(dictionary["value"])
        return obj