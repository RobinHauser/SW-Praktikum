from BusinessObject import BusinessObject
from Property import Property
from TextProperty import TextProperty
from SelectionProperty import SelectionProperty
from Information import Information

class Profile(BusinessObject):
    def __init__(self):
        super().__init__("Profile", [4001, 5000])
        self.user_id = 0
        self.is_personal = True
        #todo private setzen?
        #self.assigned_infos = []

    def get_user_id(self):
        return self.user_id

    def set_user_id(self, user_id):
        self.user_id = user_id

    def get_is_personal(self):
        return self.is_personal

    def set_is_personal(self, is_personal):
        self.is_personal = is_personal

