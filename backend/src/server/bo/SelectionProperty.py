from backend.src.server.bo.Property import Property
from backend.src.server.bo.Information import Information

class SelectionProperty(Property):
    def __init__(self):
        super().__init__()
        self._is_selection = True
        self._selections = []

    def set_selections(self, selections):
        self._selections = selections

    def get_selections(self):
        return self._selections

    #str und from_dict methoden werden von Property vererbt