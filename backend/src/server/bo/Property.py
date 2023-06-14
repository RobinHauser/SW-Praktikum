from server.bo.BusinessObject import BusinessObject

class Property(BusinessObject): #todo abstrakt
    def __init__(self):
        super().__init__()
        self._name = ""
        self._is_selection = False
        self._description = ""


    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name

    def set_is_selection(self, is_dropdown):
        self._is_selection = is_dropdown

    def get_is_selection(self):
        return self._is_selection

    def set_description(self, description):
        self._description = description

    def get_description(self):
        return self._description

