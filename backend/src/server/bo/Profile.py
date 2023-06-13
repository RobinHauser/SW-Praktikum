from backend.src.server.bo.BusinessObject import BusinessObject
# from Property import Property
# from TextProperty import TextProperty
# from SelectionProperty import SelectionProperty
# from Information import Information

class Profile(BusinessObject):
    def __init__(self):
        super().__init__()
        self._user_id = 0
        self._is_personal = True
        #self.assigned_infos = []

    def get_user_id(self):
        return self._user_id

    def set_user_id(self, user_id):
        self._user_id = user_id

    def get_is_personal(self):
        return self._is_personal

    def set_is_personal(self, is_personal):
        self._is_personal = is_personal


