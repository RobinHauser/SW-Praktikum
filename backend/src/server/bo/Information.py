from backend.src.server.bo.BusinessObject import BusinessObject

class Information(BusinessObject):
    def __init__(self):
        super().__init__()
        self._profile_id = 0
        self._value = 0

    def set_profile_id(self, profile_id):
        self._profile_id = profile_id

    def get_profile_id(self):
        return self._profile_id

    def set_value(self, value_id):
        self._value = value_id

    def get_value(self):
        return self._value
