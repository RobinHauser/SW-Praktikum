from src.server.bo.BusinessObject import BusinessObject
from src.server.bo.Property import Property
from src.server.bo.Information import Information

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

    @staticmethod
    def from_dict(dict): #todo default wert setzen
        tex = TextProperty()
        tex.set_name(dict["name"])
        tex.set_is_selection(False)
        tex.set_description(dict["description"])
        return tex

