from server.bo.BusinessObject import BusinessObject
from server.bo.Property import Property
from server.bo.Information import Information

class TextProperty(Property):
    def __init__(self, value):
        info = Information(value)
        super().__init__(info)

    #str und from_dict methoden werden von Property vererbt