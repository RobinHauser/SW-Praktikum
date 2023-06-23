from src.server.bo.Property import Property
from src.server.bo.Information import Information

class SelectionProperty(Property):
    def __init__(self):
        super().__init__()
        # self._is_selection = True
        # self.__selections = []

    def set_selections(self, selections):
        self.__selections = selections

    def get_selections(self):
        return self.__selections

    # def __str__(self):
    #     return "SelectionProperty: {}, owned by {}, is a personal profile: {}".format(self.get_id(), self.get_user_id(),
    #                                                                         self.get_is_personal())

    @staticmethod
    def from_dict(dict):  # todo default wert setzen
        selec = SelectionProperty()
        #selec.set_id(dict["id"])
        selec.set_name(dict["name"])
        selec.set_is_selection(True)
        selec.set_description(dict["description"])
        # selec.set_selections(dict["selections"])
        return selec
