from backend.src.server.bo.BusinessObject import BusinessObject


class Property(BusinessObject):
    def __init__(self):
        super().__init__("Property", [6001, 7000])
        self.__value = ""
        self.__explanation = ""
        self.__is_selection = False

    def set_value(self, value):
        self.__value = value

    def get_value(self):
        return self.__value

    def set_explanation(self, description):
        self.__explanation = description

    def get_explanation(self):
        return self.__explanation

    def set_is_selection(self, is_dropdown):
        self.__is_selection = is_dropdown

    def get_is_selection(self):
        return self.__is_selection