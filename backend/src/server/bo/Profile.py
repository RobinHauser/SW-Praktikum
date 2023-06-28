from src.server.bo.BusinessObject import BusinessObject
# from Property import Property
# from TextProperty import TextProperty
# from SelectionProperty import SelectionProperty
# from Information import Information

class Profile(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__user_id = 0
        self.__is_personal = True

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, user_id):
        self.__user_id = user_id

    def get_is_personal(self):
        return self.__is_personal

    def set_is_personal(self, is_personal):
        self.__is_personal = is_personal


    def __str__(self):
        return "Profile: {}, owned by {}, is a personal profile: {}".format(self.get_id(), self.get_user_id(), self.get_is_personal())

    @staticmethod
    def from_dict(dict = dict() ):
        pro = Profile()
        pro.set_id(dict["id"])
        # pro.set_user_id(dict["UserID"])
        # pro.set_is_personal(dict["isPersonal"])
        return pro
        # We did not use the setters of user_id and is_personal for a convenient payload handling in the POST information interface
