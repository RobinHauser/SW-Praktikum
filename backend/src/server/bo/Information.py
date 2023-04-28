from server.bo import BusinessObject as bo
from server.bo.Property import Property


class Information(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.value = Property

    def get_value(self):
        return self.value

    def set_value(self, value):
        self.value = value
