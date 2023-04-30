from server.bo import BusinessObject as bo
from server.bo.Property import Property


class Information(bo.BusinessObject):

    def __init__(self, value):
        super().__init__()
        self.value = value

    def get_value(self):
        return self.value

    def set_value(self, value):
        self.value = value
