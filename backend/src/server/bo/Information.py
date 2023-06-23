from src.server.bo.BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__profile_id = 0
        self.__value_id = 0

    def set_profile_id(self, profile_id):
        self.__profile_id = profile_id

    def get_profile_id(self):
        return self.__profile_id

    def set_value_id(self, value_id):
        self.__value_id = value_id

    def get_value_id(self):
        return self.__value_id
