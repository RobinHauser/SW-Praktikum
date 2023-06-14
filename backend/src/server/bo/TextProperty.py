from backend.src.server.bo.BusinessObject import BusinessObject
from backend.src.server.bo.Property import Property
from backend.src.server.bo.Information import Information

class TextProperty(Property):
    def __init__(self):
        super().__init__()
        self._is_selection = False
        # self._textfield = ""

    # def set_textfield(self, text):
    #     self._textfield = text
    #
    # def get_textfield(self):
    #     return self._textfield

    #str und from_dict methoden werden von Property vererbt