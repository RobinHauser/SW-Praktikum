from src.server.bo.BusinessObject import BusinessObject
from src.server.bo.Property import Property
from src.server.bo.Information import Information

class TextProperty(Property):
    """
    The attributes, setters and getters for name, is_selection and description are inherited from the Property class.
    """
    def __init__(self):
        super().__init__()
        self._is_selection = False


    @staticmethod
    def from_dict(dict = dict()):
        tex = TextProperty()
        # the id setter is left out because the id will be set later in the mapper anyway.
        tex.set_name(dict["name"])
        tex.set_is_selection(False)
        tex.set_description(dict["description"])
        return tex

