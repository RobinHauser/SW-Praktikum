from backend.src.server.bo.BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        super().__init__("User", [1001, 2000])
        self._user_id = ""
        self._email = ""
        self._displayname = ""
        self._avatarurl = ""

    def get_user_id(self):
        return self.__user_id

    def set_user_id(self, user_id):
        self.__user_id = user_id

    def get_displayname(self):
        return self.__displayname

    def set_displayname(self, displayname):
        self.__displayname = displayname

    def get_email(self):
        return self.__email

    def set_email(self, email):
        self.__email = email

    def get_avatarurl(self):
        return self.__avatarurl

    def set_avatarurl(self, avatarurl):
        self.__avatarurl = avatarurl