from BusinessObject import BusinessObject

class Property(BusinessObject):
    def __init__(self, info):
        super().__init__("Property", [6001, 7000])
        self.info = info

    def set_info(self, info):
        self.info = info

    def get_info(self):
        return self.info

    def __str__(self):
        return "Property: {}, {}".format(self._id, self.info)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Property()
        obj.set_id(dictionary["id"])
        obj.set_info(dictionary["info"])
        return obj