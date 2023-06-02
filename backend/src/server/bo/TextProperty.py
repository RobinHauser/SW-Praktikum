from backend.src.server.bo.BusinessObject import BusinessObject
from backend.src.server.bo.Property import Property
from backend.src.server.bo.Information import Information

class TextProperty(Property):
    def __init__(self, value):
        info = Information(value)
        super().__init__(info)

    #str und from_dict methoden werden von Property vererbt