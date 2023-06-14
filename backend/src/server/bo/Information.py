from backend.src.server.bo.BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self):
        super().__init__()
        self._profile_id = 0
        self._value_id = 0

    def set_profile_id(self, profile_id):
        self._profile_id = profile_id

    def get_profile_id(self):
        return self._profile_id

    def set_value_id(self, value_id):
        self._value_id = value_id

    def get_value_id(self):
        return self._value_id
