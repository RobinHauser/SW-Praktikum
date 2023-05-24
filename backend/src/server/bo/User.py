from BusinessObject import BusinessObject
import datetime

class User (BusinessObject):
    def __init__(self):
        super().__init__("User", [1001, 2000])
        self.__email = ""
        self.displayname = ""
        self.avatarurl = ""
        #self.__birthdate = datetime.date(1111, 11, 11) #yyyy mm dd
        #self.__google_id = 0

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

    # def get_birthdate(self):
    #     return self.__birthdate
    #
    # def set_birthdate(self, y, m, d):
    #     self.__birthdate = datetime.date(y, m, d)

    # def get_google_id(self):
    #     return self.__google_id
    #
    # def set_google_id(self, google_id):
    #     self.__google_id = google_id

    # def __str__(self):
    #     return "User: {}, {}, {}, {}, {}, {}".format(self._id, self.__firstname, self.__lastname, self.__email, self.__birthdate, self.__google_id)
    #
    # @staticmethod
    # def from_dict(dictionary=dict()):
    #     obj = User()
    #     obj.set_id(dictionary["id"])
    #     obj.set_firstname(dictionary["firstname"])
    #     obj.set_lastname(dictionary["lastname"])
    #     obj.set_email(dictionary["email"])
    #     obj.set_birthdate(dictionary["birthdate"])
    #     obj.set_google_id(dictionary["google_id"])
    #     return obj
    #
