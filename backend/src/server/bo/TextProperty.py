from BusinessObject import BusinessObject
from Property import Property
from Information import Information

class TextProperty(Property):
    def __init__(self, value):
        info = Information(value)
        super().__init__(info)

    #str und from_dict methoden werden von Property vererbt