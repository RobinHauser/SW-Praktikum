from src.server.bo.Property import Property
from src.server.bo.Information import Information

class SelectionProperty(Property):
    """
    The attributes, setters and getters for name, is_selection and description are inherited from the Property class.
    """
    def __init__(self):
        super().__init__()
        self._is_selection = True


    @staticmethod
    def from_dict(dict = dict()):
        selec = SelectionProperty()
        # the id setter is left out because the id will be set later in the mapper anyway.
        selec.set_name(dict["name"])
        selec.set_is_selection(True)
        selec.set_description(dict["description"])
        return selec
