from BusinessObject import BusinessObject
import datetime

class User (BusinessObject):
    def __init__(self):
        super().__init__("User", [1001, 2000])
        self.__firstname = ""
        self.__lastname = ""
        self.__email = ""
        self.__birthdate = datetime.date(1111, 11, 11) #yyyy mm dd
        self.__google_id = 0

    def get_firstname(self):
        return self.__firstname

    def set_firstname(self, firstname):
        self.__firstname = firstname

    def get_lastname(self):
        return self.__lastname

    def set_lastname(self, lastname):
        self.__lastname = lastname

    def get_email(self):
        return self.__email

    def set_email(self, email):
        self.__email = email

    def get_birthdate(self):
        return self.__birthdate

    def set_birthdate(self, y, m, d):
        self.__birthdate = datetime.date(y, m, d)

    def get_google_id(self):
        return self.__google_id

    def set_google_id(self, g_id):
        self.__google_id = g_id

    def __str__(self):
        return "User: {}, {}, {}, {}, {}, {}".format(self._id, self.__firstname, self.__lastname, self.__email, self.__birthdate, self.__google_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])
        obj.set_firstname(dictionary["firstname"])
        obj.set_lastname(dictionary["lastname"])
        obj.set_email(dictionary["email"])
        obj.set_birthdate(dictionary["birthdate"])
        obj.set_google_id(dictionary["google_id"])
        return obj

